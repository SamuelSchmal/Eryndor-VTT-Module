/**
 * A registry for tracking system-specific data and relationships
 */
class EryndorRegistry {
  constructor() {
    this._spells = new Map();
    this._items = new Map();
    this._masteries = new Map();
  }

  /**
   * Register a spell in the registry
   * @param {string} id - Unique spell identifier
   * @param {object} data - Spell data
   */
  registerSpell(id, data) {
    this._spells.set(id, data);
  }

  /**
   * Get a spell from the registry
   * @param {string} id - Spell identifier
   * @returns {object|null} The spell data or null
   */
  getSpell(id) {
    return this._spells.get(id) || null;
  }

  /**
   * Register an item in the registry
   * @param {string} id - Unique item identifier
   * @param {object} data - Item data
   */
  registerItem(id, data) {
    this._items.set(id, data);
  }

  /**
   * Get an item from the registry
   * @param {string} id - Item identifier
   * @returns {object|null} The item data or null
   */
  getItem(id) {
    return this._items.get(id) || null;
  }

  /**
   * Register a mastery definition
   * @param {string} id - Mastery identifier (domain or form)
   * @param {object} data - Mastery data
   */
  registerMastery(id, data) {
    this._masteries.set(id, data);
  }

  /**
   * Get a mastery definition
   * @param {string} id - Mastery identifier
   * @returns {object|null} The mastery data or null
   */
  getMastery(id) {
    return this._masteries.get(id) || null;
  }

  /**
   * Calculate spell DC for a domain/form combination
   * @param {object} actor - The actor casting
   * @param {string} domain - The domain
   * @param {string} form - The form
   * @returns {number} The spell DC
   */
  calculateSpellDC(actor, domain, form) {
    const systemData = actor.system;
    const domainMastery = systemData.masteries?.[domain]?.value || 0;
    const formMastery = systemData.masteries?.[form]?.value || 0;
    const proficiency = systemData.attributes?.proficiency?.value || 2;
    
    // Get the relevant ability modifier based on chronosilver weapon
    const weaponAttr = systemData.chronosilverWeapon?.attribute || "int";
    const abilityMod = systemData.abilities?.[weaponAttr]?.mod || 0;
    
    // DC = 8 + prof + ability mod + higher of the two masteries
    return 8 + proficiency + abilityMod + Math.max(domainMastery, formMastery);
  }

  /**
   * Get spell circle based on domain and form masteries
   * @param {number} domainMastery - Domain mastery value
   * @param {number} formMastery - Form mastery value
   * @returns {number} The spell circle (1-5)
   */
  getSpellCircle(domainMastery, formMastery) {
    const totalMastery = domainMastery + formMastery;
    
    if (totalMastery >= 18) return 5;
    if (totalMastery >= 14) return 4;
    if (totalMastery >= 10) return 3;
    if (totalMastery >= 6) return 2;
    return 1;
  }

  /**
   * Clear all registry data
   */
  clear() {
    this._spells.clear();
    this._items.clear();
    this._masteries.clear();
  }
}

// Create singleton instance
const registry = new EryndorRegistry();

export default registry;
