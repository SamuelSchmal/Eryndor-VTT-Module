# Changelog

All notable changes to the Eryndor VTT Module will be documented in this file.

## [1.1.0] - 2026-02-04

### Added - System Rebuild
- **Settings System**: Comprehensive system settings with UI configuration
  - Diagonal movement rules (Euclidean, Alternating, Exact)
  - Initiative formula customization
  - Mastery progression type (Linear, Exponential)
  - Automatic armor class calculation
  - Health and vigor recovery on rest (Full, Half, Custom)
  - Compact sheet layout preference
  - Advanced magic features toggle
  - Auto-collapse item cards in chat
- **Utility Module** (`module/utils.mjs`): 25+ helper functions
  - Localization helpers
  - Number and modifier formatting
  - Identifier generation
  - Ability modifier calculation
  - Proficiency bonus calculation
  - Mastery DC calculation
  - Armor class calculation
  - Roll formula creation
  - HTML enrichment
  - Collection options generation
  - Dice rolling utilities
  - Experience and level calculations
- **Enhanced Configuration** (`module/helpers/config.mjs`):
  - ASCII art banner
  - Weapon range types
  - Extended damage types (12 types)
  - Armor types with shields
  - Spell schools for compatibility
  - Status conditions (15 conditions)
  - Skills system (18 skills with ability associations)
  - Character origins (5 origins from rulebook)
  - Consumable types
- **Registry System** (`module/registry.mjs`):
  - Spell registration and retrieval
  - Item registration and retrieval
  - Mastery definition tracking
  - Spell DC calculation for domain/form combinations
  - Spell circle calculation from masteries
- **System Keybindings**:
  - Shift+M: Roll mastery check for selected token
  - Shift+I: Roll initiative for selected tokens
- **Enhanced Actor Class**:
  - Automatic ability label localization
  - Automatic proficiency bonus calculation
  - Optional automatic AC calculation from equipped armor
  - `rollAbilityCheck()`: Roll ability checks with chat output
  - `rollMastery()`: Roll mastery checks
  - `rest()`: Short/long rest with configurable recovery
- **Enhanced Item Class**:
  - Type-specific derived data preparation
  - Label generation for display
  - `rollAttack()`: Roll weapon attack with formula
  - `rollDamage()`: Roll weapon damage with type
  - `castSpell()`: Cast spell with vigor cost deduction
  - `toggleEquipped()`: Toggle equipped state for weapons/armor

### Changed
- Updated system version from 1.0.1 to 1.1.0
- Main initialization now includes settings and keybindings registration
- Actor preparation now includes proficiency and AC calculation
- Item data model now includes `equipped` field for weapons and armor
- Global `game.eryndor` object now includes `utils` and `registry`

### Enhanced
- English localization with 100+ new keys for settings, conditions, skills, and UI
- Actor data preparation with more robust calculations
- Item rolling system with type-specific methods
- Better separation of concerns following dnd5e patterns

### Technical Improvements
- Modular architecture following dnd5e best practices
- Centralized utility functions reduce code duplication
- Settings system enables GM customization without code changes
- Registry system prepares for advanced spell mechanics
- Keybindings improve user experience

## [1.0.1] - 2026-02-04

### Fixed
- Removed non-existent compendium pack reference from system.json that was causing "No system manifest found" error
- The example-spells compendium pack will be added in a future release

## [1.0.0] - 2026-02-04

### Added
- Initial release of Eryndor game system for Foundry VTT V13.350
- Complete system manifest (system.json) with proper Foundry VTT compatibility
- Data model (template.json) implementing Eryndor rulebook mechanics:
  - 6 core attributes: Strength, Dexterity, Constitution, Intelligence, Wisdom, Charisma
  - Health and Vigor resource tracking
  - 15 Magic Masteries (5 Domains + 10 Forms)
  - Chronosilver weapon system with 5 weapon types
  - Character attributes: level, experience, proficiency, armor class
- Actor types:
  - Character actors with full Eryndor character sheet
  - NPC actors with simplified stat blocks
- Item types:
  - Weapons with damage, type, range, and formula
  - Armor with armor value and type
  - Equipment with quantity and weight
  - Spells with circle level, school, mana cost, and formula
  - Skills with ability association and proficiency tracking
  - Talents with prerequisite system
- Document classes:
  - EryndorActor with ability modifier calculation and roll data preparation
  - EryndorItem with roll functionality and chat integration
- Sheet classes:
  - EryndorActorSheet with tabbed interface (Abilities, Items, Magic, Description, Effects)
  - EryndorItemSheet with item-specific templates for each item type
- UI Templates:
  - Character sheet with resource tracking, ability scores, and inventory management
  - NPC sheet with simplified interface
  - Item sheets for all 6 item types
  - Partial templates for abilities, items, spells/skills/talents, and effects
- Styling:
  - Custom CSS theme for Eryndor aesthetic
  - Responsive grid layouts
  - Tab navigation styling
  - Rollable element hover effects
- Active Effects system integration
- Localization:
  - English (en) translation
  - Portuguese (pt-BR) translation for Brazilian users
- Helper modules:
  - Configuration constants for abilities, domains, forms, and weapons
  - Template preloading for performance
  - Active effects management utilities
- Documentation:
  - Comprehensive README with installation and usage instructions
  - System feature list and compatibility information
  - Magic system documentation
  - Contributing guidelines
- Development infrastructure:
  - .gitignore for clean repository
  - Modular code structure for maintainability

### Technical Details
- Compatible with Foundry VTT V13.350
- ES Module architecture for modern JavaScript
- Handlebars templating system
- Bilingual support infrastructure
- Extensible data model for future enhancements

### Game System Features
- Three-action combat system ready for implementation
- Modular magic system with Domain + Form combinations
- Chronosilver weapon casting focus system
- Character progression tracking (XP and levels)
- Proficiency bonus system
- Token attribute support for health and vigor bars

## [Unreleased]

### Planned Features
- Compendium packs with example spells
- Automated spell circle calculation
- Magic mastery bonus application
- Combat action tracking (3-action system)
- Fatigue system implementation
- Ritual magic support
- Character origin/background system
- Pre-generated character templates
