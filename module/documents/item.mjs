/**
 * Extend the basic Item with some very simple modifications.
 * @extends {Item}
 */
export class EryndorItem extends Item {
  /**
   * Augment the basic Item data model with additional dynamic data.
   */
  prepareData() {
    // As with the actor class, items are documents that can have their data
    // preparation methods overridden (such as prepareBaseData()).
    super.prepareData();
  }

  /**
   * Prepare derived data for the item
   */
  prepareDerivedData() {
    super.prepareDerivedData();
    
    const systemData = this.system;
    const labels = {};

    // Prepare type-specific derived data
    switch (this.type) {
      case "weapon":
        labels.damage = systemData.damage || "—";
        labels.damageType = CONFIG.ERYNDOR.damageTypes[systemData.damageType] || systemData.damageType;
        labels.range = CONFIG.ERYNDOR.weaponRanges[systemData.range] || systemData.range;
        break;
      case "armor":
        labels.armorType = CONFIG.ERYNDOR.armorTypes[systemData.type] || systemData.type;
        labels.armorValue = systemData.armorValue || 0;
        break;
      case "spell":
        labels.spellLevel = `Circle ${systemData.spellLevel}`;
        labels.school = CONFIG.ERYNDOR.spellSchools[systemData.school] || systemData.school;
        labels.manaCost = `${systemData.manaCost} Vigor`;
        break;
      case "equipment":
        labels.quantity = systemData.quantity || 1;
        labels.weight = `${systemData.weight} lbs`;
        break;
    }

    this.labels = labels;
  }

  /**
   * Prepare a data object which is passed to any Roll formulas which are created related to this Item
   * @private
   */
   getRollData() {
    // If present, return the actor's roll data.
    if ( !this.actor ) return null;
    const rollData = this.actor.getRollData();
    // Grab the item's system data as well.
    rollData.item = foundry.utils.deepClone(this.system);

    return rollData;
  }

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  async roll() {
    const item = this;

    // Initialize chat data.
    const speaker = ChatMessage.getSpeaker({ actor: this.actor });
    const rollMode = game.settings.get('core', 'rollMode');
    const label = `[${item.type}] ${item.name}`;

    // If there's no roll data, send a chat message.
    if (!this.system.formula) {
      ChatMessage.create({
        speaker: speaker,
        rollMode: rollMode,
        flavor: label,
        content: item.system.description ?? ''
      });
    }
    // Otherwise, create a roll and send a chat message from it.
    else {
      // Retrieve roll data.
      const rollData = this.getRollData();

      // Invoke the roll and submit it to chat.
      const roll = new Roll(rollData.item.formula, rollData);
      // If you need to store the value first, uncomment the next line.
      // let result = await roll.roll({async: true});
      roll.toMessage({
        speaker: speaker,
        rollMode: rollMode,
        flavor: label,
      });
      return roll;
    }
  }

  /**
   * Roll a weapon attack
   * @param {object} options - Roll options
   * @returns {Promise<Roll>}
   */
  async rollAttack(options = {}) {
    if (this.type !== "weapon") return null;

    const actor = this.actor;
    if (!actor) return null;

    const rollData = this.getRollData();
    const formula = this.system.formula || "1d20";

    const roll = new Roll(formula, rollData);
    await roll.evaluate();

    await roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: actor }),
      flavor: `${this.name} - Attack Roll`,
      rollMode: options.rollMode ?? game.settings.get('core', 'rollMode')
    });

    return roll;
  }

  /**
   * Roll weapon damage
   * @param {object} options - Roll options
   * @returns {Promise<Roll>}
   */
  async rollDamage(options = {}) {
    if (this.type !== "weapon") return null;

    const actor = this.actor;
    if (!actor) return null;

    const rollData = this.getRollData();
    const formula = this.system.damage || "1d6";

    const roll = new Roll(formula, rollData);
    await roll.evaluate();

    const damageType = CONFIG.ERYNDOR.damageTypes[this.system.damageType] || this.system.damageType;

    await roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: actor }),
      flavor: `${this.name} - Damage (${damageType})`,
      rollMode: options.rollMode ?? game.settings.get('core', 'rollMode')
    });

    return roll;
  }

  /**
   * Cast a spell
   * @param {object} options - Cast options
   * @returns {Promise<Roll>}
   */
  async castSpell(options = {}) {
    if (this.type !== "spell") return null;

    const actor = this.actor;
    if (!actor) return null;

    // Check if actor has enough vigor to cast
    const vigorCost = this.system.manaCost || 1;
    const currentVigor = actor.system.vigor.value;

    if (currentVigor < vigorCost) {
      ui.notifications.warn(`Not enough Vigor to cast ${this.name}. Requires ${vigorCost}, have ${currentVigor}.`);
      return null;
    }

    // Deduct vigor cost
    await actor.update({
      "system.vigor.value": currentVigor - vigorCost
    });

    const rollData = this.getRollData();
    const formula = this.system.formula || "1d6";

    const roll = new Roll(formula, rollData);
    await roll.evaluate();

    await roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: actor }),
      flavor: `${this.name} - Spell Effect (${vigorCost} Vigor)`,
      rollMode: options.rollMode ?? game.settings.get('core', 'rollMode')
    });

    return roll;
  }

  /**
   * Toggle equipped state for armor/weapon
   * @returns {Promise<Item>}
   */
  async toggleEquipped() {
    if (!["weapon", "armor"].includes(this.type)) return this;

    const equipped = this.system.equipped ?? false;
    return this.update({ "system.equipped": !equipped });
  }
}

