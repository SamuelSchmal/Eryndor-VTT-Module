/**
 * Utility functions for the Eryndor game system
 */

/**
 * Localize a string with optional formatting data
 * @param {string} key - The localization key
 * @param {object} data - Optional formatting data
 * @returns {string} The localized string
 */
export function localize(key, data = {}) {
  return game.i18n.format(key, data);
}

/**
 * Format a modifier value with + or - sign
 * @param {number} modifier - The modifier value
 * @returns {string} The formatted modifier (e.g., "+3", "-1")
 */
export function formatModifier(modifier) {
  const value = Number(modifier);
  if (isNaN(value)) return "+0";
  return value >= 0 ? `+${value}` : `${value}`;
}

/**
 * Format a number with thousands separators
 * @param {number} value - The number to format
 * @param {object} options - Formatting options
 * @returns {string} The formatted number
 */
export function formatNumber(value, { decimals = 0, sign = false } = {}) {
  const num = Number(value);
  if (isNaN(num)) return "0";
  
  const formatted = num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
  
  return sign && num > 0 ? `+${formatted}` : formatted;
}

/**
 * Convert a string to a valid identifier (lowercase, no spaces, alphanumeric)
 * @param {string} input - The input string
 * @returns {string} The formatted identifier
 */
export function formatIdentifier(input) {
  if (typeof input !== "string") return "";
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Calculate ability modifier from ability score
 * @param {number} score - The ability score
 * @returns {number} The modifier value
 */
export function calculateModifier(score) {
  return Math.floor((Number(score) - 10) / 2);
}

/**
 * Calculate proficiency bonus from level
 * @param {number} level - Character level
 * @returns {number} The proficiency bonus
 */
export function calculateProficiency(level) {
  return Math.floor((Number(level) - 1) / 4) + 2;
}

/**
 * Calculate mastery DC for a spell or ability
 * @param {number} masteryValue - The mastery value (0-20+)
 * @param {number} abilityModifier - The relevant ability modifier
 * @param {number} proficiency - The proficiency bonus
 * @returns {number} The mastery DC
 */
export function calculateMasteryDC(masteryValue, abilityModifier, proficiency) {
  return 8 + Number(masteryValue) + Number(abilityModifier) + Number(proficiency);
}

/**
 * Calculate armor class based on armor and dexterity
 * @param {object} actor - The actor document
 * @returns {number} The calculated armor class
 */
export function calculateArmorClass(actor) {
  const systemData = actor.system;
  const dexMod = systemData.abilities?.dex?.mod || 0;
  
  // Base AC is 10 + DEX modifier
  let ac = 10 + dexMod;
  
  // Add armor bonuses from equipped armor
  for (let item of actor.items) {
    if (item.type === "armor" && item.system.equipped) {
      ac += Number(item.system.armorValue) || 0;
    }
  }
  
  return ac;
}

/**
 * Create a roll formula from components
 * @param {string} base - The base formula (e.g., "1d20")
 * @param {array} modifiers - Array of modifiers to add
 * @returns {string} The complete roll formula
 */
export function createRollFormula(base, modifiers = []) {
  let formula = base;
  
  for (let mod of modifiers) {
    if (typeof mod === "number") {
      formula += mod >= 0 ? ` + ${mod}` : ` - ${Math.abs(mod)}`;
    } else if (typeof mod === "string") {
      formula += ` + ${mod}`;
    }
  }
  
  return formula;
}

/**
 * Enrich HTML content with links and formatting
 * @param {string} content - The HTML content to enrich
 * @param {object} options - Enrichment options
 * @returns {Promise<string>} The enriched HTML
 */
export async function enrichHTML(content, options = {}) {
  return TextEditor.enrichHTML(content, {
    secrets: options.secrets ?? false,
    documents: options.documents ?? true,
    links: options.links ?? true,
    rolls: options.rolls ?? true,
    rollData: options.rollData ?? {}
  });
}

/**
 * Get collection document options for select dropdowns
 * @param {Collection} collection - The document collection
 * @param {object} options - Filter options
 * @returns {object} Object mapping IDs to labels
 */
export function getCollectionOptions(collection, { types = null, sort = true } = {}) {
  let documents = collection.contents;
  
  // Filter by types if specified
  if (types) {
    documents = documents.filter(doc => types.includes(doc.type));
  }
  
  // Sort alphabetically if requested
  if (sort) {
    documents = documents.sort((a, b) => a.name.localeCompare(b.name));
  }
  
  // Create options object
  return documents.reduce((obj, doc) => {
    obj[doc.id] = doc.name;
    return obj;
  }, {});
}

/**
 * Roll a dice formula and return the result
 * @param {string} formula - The dice formula
 * @param {object} data - Roll data for substitution
 * @param {object} options - Roll options
 * @returns {Promise<Roll>} The roll result
 */
export async function rollDice(formula, data = {}, options = {}) {
  const roll = new Roll(formula, data);
  await roll.evaluate();
  
  if (options.toChat) {
    await roll.toMessage({
      speaker: options.speaker,
      flavor: options.flavor,
      rollMode: options.rollMode ?? game.settings.get('core', 'rollMode')
    });
  }
  
  return roll;
}

/**
 * Log a message to the console with system prefix
 * @param {string} message - The message to log
 * @param {string} level - Log level: "log", "warn", "error"
 */
export function log(message, level = "log") {
  const prefix = "Eryndor |";
  console[level](`${prefix} ${message}`);
}

/**
 * Get a nested property value from an object using dot notation
 * @param {object} object - The object to query
 * @param {string} path - The property path (e.g., "system.attributes.level")
 * @returns {*} The property value or undefined
 */
export function getProperty(object, path) {
  return foundry.utils.getProperty(object, path);
}

/**
 * Set a nested property value on an object using dot notation
 * @param {object} object - The object to modify
 * @param {string} path - The property path
 * @param {*} value - The value to set
 * @returns {boolean} Whether the property was set successfully
 */
export function setProperty(object, path, value) {
  return foundry.utils.setProperty(object, path, value);
}

/**
 * Deep clone an object
 * @param {*} original - The object to clone
 * @returns {*} The cloned object
 */
export function deepClone(original) {
  return foundry.utils.deepClone(original);
}

/**
 * Merge two objects
 * @param {object} original - The original object
 * @param {object} other - The object to merge in
 * @param {object} options - Merge options
 * @returns {object} The merged object
 */
export function mergeObject(original, other, options = {}) {
  return foundry.utils.mergeObject(original, other, options);
}

/**
 * Determine if a string is a valid UUID
 * @param {string} uuid - The string to test
 * @returns {boolean} Whether it's a valid UUID
 */
export function isUUID(uuid) {
  return /^[A-Za-z]+\.[A-Za-z0-9]+/.test(uuid);
}

/**
 * Retrieve a document by UUID
 * @param {string} uuid - The document UUID
 * @returns {Promise<Document|null>} The document or null
 */
export async function fromUuid(uuid) {
  return fromUuidSync(uuid) ?? await globalThis.fromUuid(uuid);
}

/**
 * Calculate experience needed for next level
 * @param {number} level - Current level
 * @returns {number} Experience needed for next level
 */
export function experienceForLevel(level) {
  // Simple exponential progression: level^2 * 100
  return Math.floor(Math.pow(level, 2) * 100);
}

/**
 * Calculate level from experience points
 * @param {number} xp - Current experience points
 * @returns {number} The character level
 */
export function levelFromExperience(xp) {
  // Inverse of experienceForLevel formula
  let level = 1;
  while (experienceForLevel(level) <= xp && level < 20) {
    level++;
  }
  return level;
}
