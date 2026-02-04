/**
 * Register all of the system's settings.
 */
export function registerSystemSettings() {
  
  /**
   * Track the system version upon which point a migration was last applied
   */
  game.settings.register("eryndor", "systemMigrationVersion", {
    name: "System Migration Version",
    scope: "world",
    config: false,
    type: String,
    default: ""
  });

  /**
   * Register diagonal movement rule setting
   */
  game.settings.register("eryndor", "diagonalMovement", {
    name: "SETTINGS.ERYNDOR.DiagN",
    hint: "SETTINGS.ERYNDOR.DiagL",
    scope: "world",
    config: true,
    default: "555",
    type: String,
    choices: {
      "555": "SETTINGS.ERYNDOR.Diag555",
      "5105": "SETTINGS.ERYNDOR.Diag5105",
      "EUCL": "SETTINGS.ERYNDOR.DiagEucl"
    },
    onChange: rule => canvas.grid.diagonalRule = rule
  });

  /**
   * Register Initiative formula setting
   */
  game.settings.register("eryndor", "initiativeFormula", {
    name: "SETTINGS.ERYNDOR.InitiativeFormulaName",
    hint: "SETTINGS.ERYNDOR.InitiativeFormulaHint",
    scope: "world",
    config: true,
    default: "1d20 + @abilities.dex.mod",
    type: String,
    requiresReload: true
  });

  /**
   * Register mastery progression type
   */
  game.settings.register("eryndor", "masteryProgression", {
    name: "SETTINGS.ERYNDOR.MasteryProgressionName",
    hint: "SETTINGS.ERYNDOR.MasteryProgressionHint",
    scope: "world",
    config: true,
    default: "linear",
    type: String,
    choices: {
      "linear": "SETTINGS.ERYNDOR.MasteryLinear",
      "exponential": "SETTINGS.ERYNDOR.MasteryExponential"
    }
  });

  /**
   * Armor Class automation
   */
  game.settings.register("eryndor", "acAutomation", {
    name: "SETTINGS.ERYNDOR.ACAutomationName",
    hint: "SETTINGS.ERYNDOR.ACAutomationHint",
    scope: "world",
    config: true,
    default: true,
    type: Boolean,
    onChange: () => {
      // Recalculate AC for all actors when this changes
      for (let actor of game.actors) {
        if (actor.type === "character") {
          actor.prepareData();
        }
      }
    }
  });

  /**
   * Health recovery type after rest
   */
  game.settings.register("eryndor", "healthRecovery", {
    name: "SETTINGS.ERYNDOR.HealthRecoveryName",
    hint: "SETTINGS.ERYNDOR.HealthRecoveryHint",
    scope: "world",
    config: true,
    default: "full",
    type: String,
    choices: {
      "full": "SETTINGS.ERYNDOR.HealthRecoveryFull",
      "half": "SETTINGS.ERYNDOR.HealthRecoveryHalf",
      "custom": "SETTINGS.ERYNDOR.HealthRecoveryCustom"
    }
  });

  /**
   * Vigor recovery type after rest
   */
  game.settings.register("eryndor", "vigorRecovery", {
    name: "SETTINGS.ERYNDOR.VigorRecoveryName",
    hint: "SETTINGS.ERYNDOR.VigorRecoveryHint",
    scope: "world",
    config: true,
    default: "full",
    type: String,
    choices: {
      "full": "SETTINGS.ERYNDOR.VigorRecoveryFull",
      "half": "SETTINGS.ERYNDOR.VigorRecoveryHalf",
      "custom": "SETTINGS.ERYNDOR.VigorRecoveryCustom"
    }
  });

  /**
   * Compact sheet layout preference
   */
  game.settings.register("eryndor", "compactSheets", {
    name: "SETTINGS.ERYNDOR.CompactSheetsName",
    hint: "SETTINGS.ERYNDOR.CompactSheetsHint",
    scope: "client",
    config: true,
    default: false,
    type: Boolean,
    onChange: () => {
      // Re-render all open sheets when this changes
      Object.values(ui.windows).forEach(w => {
        if (w.rendered) w.render(false);
      });
    }
  });

  /**
   * Enable advanced magic features
   */
  game.settings.register("eryndor", "enableAdvancedMagic", {
    name: "SETTINGS.ERYNDOR.AdvancedMagicName",
    hint: "SETTINGS.ERYNDOR.AdvancedMagicHint",
    scope: "world",
    config: true,
    default: true,
    type: Boolean
  });

  /**
   * Auto-collapse item cards in chat
   */
  game.settings.register("eryndor", "autoCollapseCards", {
    name: "SETTINGS.ERYNDOR.AutoCollapseCardsName",
    hint: "SETTINGS.ERYNDOR.AutoCollapseCardsHint",
    scope: "client",
    config: true,
    default: false,
    type: Boolean
  });
}

/**
 * Register keybindings for the system
 */
export function registerSystemKeybindings() {
  
  /**
   * Roll mastery check with modifier key
   */
  game.keybindings.register("eryndor", "rollMastery", {
    name: "KEYBINDINGS.ERYNDOR.RollMastery",
    hint: "KEYBINDINGS.ERYNDOR.RollMasteryHint",
    editable: [
      { key: "KeyM", modifiers: [KeyboardManager.MODIFIER_KEYS.SHIFT] }
    ],
    onDown: () => {
      // Get selected tokens and trigger mastery roll
      const tokens = canvas.tokens.controlled;
      if (tokens.length > 0) {
        const actor = tokens[0].actor;
        if (actor) {
          // This will be implemented in the actor class
          if (typeof actor.rollMastery === "function") {
            actor.rollMastery();
          }
        }
      }
      return true;
    },
    precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL
  });

  /**
   * Roll initiative for selected tokens
   */
  game.keybindings.register("eryndor", "rollInitiative", {
    name: "KEYBINDINGS.ERYNDOR.RollInitiative",
    hint: "KEYBINDINGS.ERYNDOR.RollInitiativeHint",
    editable: [
      { key: "KeyI", modifiers: [KeyboardManager.MODIFIER_KEYS.SHIFT] }
    ],
    onDown: () => {
      const tokens = canvas.tokens.controlled;
      if (tokens.length > 0 && game.combat) {
        const combatantIds = tokens.map(t => game.combat.getCombatantByToken(t.id)?.id).filter(id => id);
        if (combatantIds.length > 0) {
          game.combat.rollInitiative(combatantIds);
        }
      }
      return true;
    },
    precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL
  });
}
