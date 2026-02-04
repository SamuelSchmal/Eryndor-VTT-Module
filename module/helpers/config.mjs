export const ERYNDOR = {};

// ASCII Art
ERYNDOR.ASCII = `_________________________________
___________               _______
___  ____/_________  ________  /___________________
__  __/  __  ___/_  / /_  __  /_  __ \\  ___/_  ___/
_  /___  _  /   _  /_/ /  /_/ / / /_/ / /   _  /    
/_____/  /_/    _\\__, / /\\__,_/  \\____/_/    /_/     
               /____/                                
_________________________________`;

/**
 * The set of Ability Scores used within the system.
 * @type {Object}
 */
ERYNDOR.abilities = {
  "str": "ERYNDOR.AbilityStr",
  "dex": "ERYNDOR.AbilityDex",
  "con": "ERYNDOR.AbilityCon",
  "int": "ERYNDOR.AbilityInt",
  "wis": "ERYNDOR.AbilityWis",
  "cha": "ERYNDOR.AbilityCha"
};

ERYNDOR.abilityAbbreviations = {
  "str": "ERYNDOR.AbilityStrAbbr",
  "dex": "ERYNDOR.AbilityDexAbbr",
  "con": "ERYNDOR.AbilityConAbbr",
  "int": "ERYNDOR.AbilityIntAbbr",
  "wis": "ERYNDOR.AbilityWisAbbr",
  "cha": "ERYNDOR.AbilityChaAbbr"
};

/**
 * The set of Magic Domains in Eryndor
 * @type {Object}
 */
ERYNDOR.domains = {
  "creation": "ERYNDOR.DomainCreation",
  "destruction": "ERYNDOR.DomainDestruction",
  "perception": "ERYNDOR.DomainPerception",
  "transformation": "ERYNDOR.DomainTransformation",
  "control": "ERYNDOR.DomainControl"
};

/**
 * The set of Magic Forms in Eryndor
 * @type {Object}
 */
ERYNDOR.forms = {
  "animal": "ERYNDOR.FormAnimal",
  "aquatic": "ERYNDOR.FormAquatic",
  "auric": "ERYNDOR.FormAuric",
  "corporal": "ERYNDOR.FormCorporal",
  "floral": "ERYNDOR.FormFloral",
  "igneous": "ERYNDOR.FormIgneous",
  "illusory": "ERYNDOR.FormIllusory",
  "mental": "ERYNDOR.FormMental",
  "terrestrial": "ERYNDOR.FormTerrestrial",
  "chronoetheric": "ERYNDOR.FormChronoetheric"
};

/**
 * Chronosilver weapon types
 * @type {Object}
 */
ERYNDOR.chronosilverWeapons = {
  "wand": "ERYNDOR.WeaponWand",
  "staff": "ERYNDOR.WeaponStaff",
  "sword": "ERYNDOR.WeaponSword",
  "orb": "ERYNDOR.WeaponOrb",
  "crystal": "ERYNDOR.WeaponCrystal"
};

/**
 * Weapon range types
 * @type {Object}
 */
ERYNDOR.weaponRanges = {
  "melee": "ERYNDOR.WeaponRangeMelee",
  "ranged": "ERYNDOR.WeaponRangeRanged",
  "reach": "ERYNDOR.WeaponRangeReach"
};

/**
 * Damage types
 * @type {Object}
 */
ERYNDOR.damageTypes = {
  "physical": "ERYNDOR.DamagePhysical",
  "piercing": "ERYNDOR.DamagePiercing",
  "slashing": "ERYNDOR.DamageSlashing",
  "bludgeoning": "ERYNDOR.DamageBludgeoning",
  "fire": "ERYNDOR.DamageFire",
  "cold": "ERYNDOR.DamageCold",
  "lightning": "ERYNDOR.DamageLightning",
  "poison": "ERYNDOR.DamagePoison",
  "psychic": "ERYNDOR.DamagePsychic",
  "force": "ERYNDOR.DamageForce",
  "necrotic": "ERYNDOR.DamageNecrotic",
  "radiant": "ERYNDOR.DamageRadiant"
};

/**
 * Armor types
 * @type {Object}
 */
ERYNDOR.armorTypes = {
  "light": "ERYNDOR.ArmorLight",
  "medium": "ERYNDOR.ArmorMedium",
  "heavy": "ERYNDOR.ArmorHeavy",
  "shield": "ERYNDOR.ArmorShield"
};

/**
 * Spell schools (for compatibility)
 * @type {Object}
 */
ERYNDOR.spellSchools = {
  "evocation": "ERYNDOR.SchoolEvocation",
  "conjuration": "ERYNDOR.SchoolConjuration",
  "abjuration": "ERYNDOR.SchoolAbjuration",
  "transmutation": "ERYNDOR.SchoolTransmutation",
  "enchantment": "ERYNDOR.SchoolEnchantment",
  "illusion": "ERYNDOR.SchoolIllusion",
  "divination": "ERYNDOR.SchoolDivination",
  "necromancy": "ERYNDOR.SchoolNecromancy"
};

/**
 * Status conditions
 * @type {Object}
 */
ERYNDOR.statusConditions = {
  "blinded": "ERYNDOR.ConditionBlinded",
  "charmed": "ERYNDOR.ConditionCharmed",
  "deafened": "ERYNDOR.ConditionDeafened",
  "exhausted": "ERYNDOR.ConditionExhausted",
  "frightened": "ERYNDOR.ConditionFrightened",
  "grappled": "ERYNDOR.ConditionGrappled",
  "incapacitated": "ERYNDOR.ConditionIncapacitated",
  "invisible": "ERYNDOR.ConditionInvisible",
  "paralyzed": "ERYNDOR.ConditionParalyzed",
  "petrified": "ERYNDOR.ConditionPetrified",
  "poisoned": "ERYNDOR.ConditionPoisoned",
  "prone": "ERYNDOR.ConditionProne",
  "restrained": "ERYNDOR.ConditionRestrained",
  "stunned": "ERYNDOR.ConditionStunned",
  "unconscious": "ERYNDOR.ConditionUnconscious"
};

/**
 * Skills (basic d20-style skills)
 * @type {Object}
 */
ERYNDOR.skills = {
  "acrobatics": { label: "ERYNDOR.SkillAcrobatics", ability: "dex" },
  "animal_handling": { label: "ERYNDOR.SkillAnimalHandling", ability: "wis" },
  "arcana": { label: "ERYNDOR.SkillArcana", ability: "int" },
  "athletics": { label: "ERYNDOR.SkillAthletics", ability: "str" },
  "deception": { label: "ERYNDOR.SkillDeception", ability: "cha" },
  "history": { label: "ERYNDOR.SkillHistory", ability: "int" },
  "insight": { label: "ERYNDOR.SkillInsight", ability: "wis" },
  "intimidation": { label: "ERYNDOR.SkillIntimidation", ability: "cha" },
  "investigation": { label: "ERYNDOR.SkillInvestigation", ability: "int" },
  "medicine": { label: "ERYNDOR.SkillMedicine", ability: "wis" },
  "nature": { label: "ERYNDOR.SkillNature", ability: "int" },
  "perception": { label: "ERYNDOR.SkillPerception", ability: "wis" },
  "performance": { label: "ERYNDOR.SkillPerformance", ability: "cha" },
  "persuasion": { label: "ERYNDOR.SkillPersuasion", ability: "cha" },
  "religion": { label: "ERYNDOR.SkillReligion", ability: "int" },
  "sleight_of_hand": { label: "ERYNDOR.SkillSleightOfHand", ability: "dex" },
  "stealth": { label: "ERYNDOR.SkillStealth", ability: "dex" },
  "survival": { label: "ERYNDOR.SkillSurvival", ability: "wis" }
};

/**
 * Character origins from Eryndor rulebook
 * @type {Object}
 */
ERYNDOR.origins = {
  "drachen": "ERYNDOR.OriginDrachen",
  "arturias": "ERYNDOR.OriginArturias",
  "ilhas": "ERYNDOR.OriginIlhas",
  "abbassid": "ERYNDOR.OriginAbbassid",
  "sjowie": "ERYNDOR.OriginSjowie"
};

/**
 * Consumable types
 * @type {Object}
 */
ERYNDOR.consumableTypes = {
  "potion": "ERYNDOR.ConsumablePotion",
  "scroll": "ERYNDOR.ConsumableScroll",
  "food": "ERYNDOR.ConsumableFood",
  "ammunition": "ERYNDOR.ConsumableAmmunition"
};
