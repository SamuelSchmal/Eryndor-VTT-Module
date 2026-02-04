/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class EryndorActor extends Actor {

  /** @override */
  prepareData() {
    // Prepare data for the actor. Calling the super version of this executes
    // the following, in order: data reset (to clear active effects),
    // prepareBaseData(), prepareEmbeddedDocuments() (including active effects),
    // prepareDerivedData().
    super.prepareData();
  }

  /** @override */
  prepareBaseData() {
    // Data modifications in this step occur before processing embedded
    // documents or derived data.
  }

  /**
   * @override
   * Augment the basic actor data with additional dynamic data. Typically,
   * you'll want to handle most of your calculated/derived data in this step.
   * Data calculated in this step should generally not exist in template.json
   * (such as ability modifiers rather than ability scores) and should be
   * available both inside and outside of character sheets (such as if an actor
   * is queried and has a roll executed directly from it).
   */
  prepareDerivedData() {
    const actorData = this;
    const systemData = actorData.system;
    const flags = actorData.flags.eryndor || {};

    // Make separate methods for each Actor type (character, npc, etc.) to keep
    // things organized.
    this._prepareCharacterData(actorData);
    this._prepareNpcData(actorData);
  }

  /**
   * Prepare Character type specific data
   */
  _prepareCharacterData(actorData) {
    if (actorData.type !== 'character') return;

    // Make modifications to data here. For example:
    const systemData = actorData.system;

    // Loop through ability scores, and add their modifiers to our sheet output.
    for (let [key, ability] of Object.entries(systemData.abilities)) {
      // Calculate the modifier using d20 rules.
      ability.mod = Math.floor((ability.value - 10) / 2);
      ability.label = game.i18n.localize(CONFIG.ERYNDOR.abilities[key]) ?? key;
    }

    // Calculate proficiency bonus based on level
    if (systemData.attributes?.level) {
      systemData.attributes.proficiency.value = Math.floor((systemData.attributes.level.value - 1) / 4) + 2;
    }

    // Auto-calculate AC if setting is enabled
    if (game.settings.get("eryndor", "acAutomation")) {
      systemData.attributes.ca.value = this._calculateAC();
    }
  }

  /**
   * Prepare NPC type specific data.
   */
  _prepareNpcData(actorData) {
    if (actorData.type !== 'npc') return;

    // Make modifications to data here. For example:
    const systemData = actorData.system;

    // Loop through ability scores, and add their modifiers to our sheet output.
    for (let [key, ability] of Object.entries(systemData.abilities)) {
      // Calculate the modifier using d20 rules.
      ability.mod = Math.floor((ability.value - 10) / 2);
      ability.label = game.i18n.localize(CONFIG.ERYNDOR.abilities[key]) ?? key;
    }
  }

  /**
   * Calculate armor class from equipped armor and dexterity
   * @returns {number} The calculated AC
   * @private
   */
  _calculateAC() {
    const systemData = this.system;
    const dexMod = systemData.abilities?.dex?.mod || 0;
    
    // Base AC is 10 + DEX modifier
    let ac = 10 + dexMod;
    
    // Add armor bonuses from equipped armor items
    for (let item of this.items) {
      if (item.type === "armor" && item.system.equipped) {
        ac += Number(item.system.armorValue) || 0;
      }
    }
    
    return ac;
  }

  /**
   * Override getRollData() that's supplied to rolls.
   */
  getRollData() {
    const data = super.getRollData();

    // Prepare character roll data.
    this._getCharacterRollData(data);
    this._getNpcRollData(data);

    return data;
  }

  /**
   * Prepare character roll data.
   */
  _getCharacterRollData(data) {
    if (this.type !== 'character') return;

    // Copy the ability scores to the top level, so that rolls can use
    // formulas like `@str.mod + 4`.
    if (data.abilities) {
      for (let [k, v] of Object.entries(data.abilities)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }

    // Add level for easier access, or fall back to 0.
    if (data.attributes?.level) {
      data.lvl = data.attributes.level.value ?? 0;
    }

    // Add proficiency bonus for easier access
    if (data.attributes?.proficiency) {
      data.prof = data.attributes.proficiency.value ?? 2;
    }
  }

  /**
   * Prepare NPC roll data.
   */
  _getNpcRollData(data) {
    if (this.type !== 'npc') return;

    // Process additional NPC data here.
    if (data.abilities) {
      for (let [k, v] of Object.entries(data.abilities)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }
  }

  /**
   * Roll an ability check
   * @param {string} abilityId - The ability to roll (str, dex, etc.)
   * @param {object} options - Roll options
   * @returns {Promise<Roll>}
   */
  async rollAbilityCheck(abilityId, options = {}) {
    const ability = this.system.abilities[abilityId];
    if (!ability) return null;

    const rollData = this.getRollData();
    const formula = `1d20 + @${abilityId}.mod`;
    const label = game.i18n.localize(CONFIG.ERYNDOR.abilities[abilityId]);

    const roll = new Roll(formula, rollData);
    await roll.evaluate();

    await roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: `${label} Check`,
      rollMode: options.rollMode ?? game.settings.get('core', 'rollMode')
    });

    return roll;
  }

  /**
   * Roll a mastery check for a domain or form
   * @param {string} masteryId - The mastery to roll
   * @param {object} options - Roll options
   * @returns {Promise<Roll>}
   */
  async rollMastery(masteryId = null, options = {}) {
    if (!masteryId) {
      // If no mastery specified, prompt user to choose
      // For now, just return
      return null;
    }

    const masteryValue = this.system.masteries[masteryId];
    if (masteryValue === undefined) return null;

    const rollData = this.getRollData();
    const formula = `1d20 + ${masteryValue.value}`;
    const label = masteryId.charAt(0).toUpperCase() + masteryId.slice(1);

    const roll = new Roll(formula, rollData);
    await roll.evaluate();

    await roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this }),
      flavor: `${label} Mastery Check`,
      rollMode: options.rollMode ?? game.settings.get('core', 'rollMode')
    });

    return roll;
  }

  /**
   * Take a short or long rest
   * @param {boolean} longRest - Whether this is a long rest
   * @returns {Promise<object>} - Rest results
   */
  async rest(longRest = false) {
    const systemData = this.system;
    const updates = {};

    // Get recovery settings
    const healthRecovery = game.settings.get("eryndor", "healthRecovery");
    const vigorRecovery = game.settings.get("eryndor", "vigorRecovery");

    // Calculate health recovery
    if (healthRecovery === "full" || longRest) {
      updates["system.health.value"] = systemData.health.max;
    } else if (healthRecovery === "half") {
      updates["system.health.value"] = Math.min(
        systemData.health.value + Math.floor(systemData.health.max / 2),
        systemData.health.max
      );
    }

    // Calculate vigor recovery
    if (vigorRecovery === "full" || longRest) {
      updates["system.vigor.value"] = systemData.vigor.max;
    } else if (vigorRecovery === "half") {
      updates["system.vigor.value"] = Math.min(
        systemData.vigor.value + Math.floor(systemData.vigor.max / 2),
        systemData.vigor.max
      );
    }

    // Apply updates
    await this.update(updates);

    // Create chat message
    const restType = longRest ? "Long Rest" : "Short Rest";
    await ChatMessage.create({
      user: game.user.id,
      speaker: ChatMessage.getSpeaker({ actor: this }),
      content: `<p>${this.name} takes a ${restType}.</p>`
    });

    return updates;
  }

}
