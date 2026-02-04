# Eryndor-VTT-Module

A Foundry VTT game system module for **Eryndor**, a custom tabletop RPG system with modular magic and dynamic spellcasting.

## About Eryndor

Eryndor is a medieval fantasy world where magic was recently discovered through **Cronoether** (a magical mineral) and **Chronosilver** (the alloy that channels it). The system features:

- **Modular Magic System**: Build spells dynamically using 5 Domains and 10 Forms
- **Three-Action Combat**: Tactical action economy system
- **Masteries**: 15 magical arts to specialize in
- **Chronosilver Weapons**: Magical focuses that determine your spellcasting style

## Features

### Core System (v1.1.0)

#### Character & Actor System
- ✅ Character and NPC actors with full Eryndor attributes
- ✅ Six core attributes (Strength, Dexterity, Constitution, Intelligence, Wisdom, Charisma)
- ✅ Automatic ability modifier calculation
- ✅ Automatic proficiency bonus calculation based on level
- ✅ Health and Vigor resource tracking
- ✅ 15 Magic Masteries (5 Domains + 10 Forms)
- ✅ Chronosilver weapon system with 5 weapon types
- ✅ Ability check rolls with chat integration
- ✅ Mastery check rolls
- ✅ Rest system with configurable recovery

#### Item System
- ✅ **Weapons**: Attack rolls, damage rolls, equipped state
- ✅ **Armor**: AC contribution, equipped state
- ✅ **Equipment**: Quantity and weight tracking
- ✅ **Spells**: Vigor cost, spell casting with automatic deduction
- ✅ **Skills**: Ability associations, proficiency tracking
- ✅ **Talents**: Prerequisite system

#### Settings & Configuration
- ✅ **9 Configurable Settings**:
  - Diagonal movement rules (Euclidean, Alternating, Exact)
  - Custom initiative formula
  - Mastery progression type (Linear, Exponential)
  - Automatic AC calculation toggle
  - Health recovery on rest (Full, Half, Custom)
  - Vigor recovery on rest (Full, Half, Custom)
  - Compact sheet layout preference
  - Advanced magic features toggle
  - Auto-collapse chat cards

#### Enhanced Features
- ✅ **25+ Utility Functions**: Formatting, calculations, roll helpers
- ✅ **Registry System**: Spell/item tracking, DC calculations
- ✅ **Keybindings**:
  - `Shift+M`: Roll mastery check for selected token
  - `Shift+I`: Roll initiative for selected tokens
- ✅ **Extended Game Constants**:
  - 12 damage types
  - 15 status conditions
  - 18 skills with ability associations
  - 5 character origins

#### UI & Localization
- ✅ Custom character and item sheets with tabbed interface
- ✅ Bilingual support (English and Portuguese)
- ✅ Active effects system integration
- ✅ Rich text editor support for biographies and descriptions
- ✅ Custom Eryndor-themed styling

## Installation

### Method 1: Manifest URL (Recommended)
1. In Foundry VTT, go to **Configuration and Setup**
2. Click **Game Systems**
3. Click **Install System**
4. Paste the manifest URL: `https://github.com/SamuelSchmal/Eryndor-VTT-Module/releases/latest/download/system.json`
5. Click **Install**

### Method 2: Manual Installation
1. Download the latest release from the [Releases page](https://github.com/SamuelSchmal/Eryndor-VTT-Module/releases)
2. Extract the zip file into your Foundry VTT `Data/systems` folder
3. Restart Foundry VTT
4. Create a new world and select "Eryndor Game System"

## Compatibility

- **Foundry VTT Version**: V13.350
- **Minimum**: V13
- **Verified**: V13.350
- **Maximum**: V13

## Usage

### Creating a Character
1. Create a new Actor and select "Character" type
2. Set your ability scores (Strength, Dexterity, Constitution, Intelligence, Wisdom, Charisma)
3. Distribute 6 Mastery points among the 15 Arts (5 Domains + 10 Forms)
4. Choose your Chronosilver weapon (Wand, Staff, Sword, Orb, or Crystal)
5. Add items, spells, skills, and talents as needed

### The Magic System

**Domains (How you affect):**
- Creation
- Destruction
- Perception
- Transformation
- Control

**Forms (What you affect):**
- Animal
- Aquatic (water)
- Auric (air/gas)
- Corporal (body/flesh)
- Floral (plants)
- Igneous (fire)
- Illusory (illusions)
- Mental (mind)
- Terrestrial (earth/stone)
- Chronoetheric (raw magic)

### Chronosilver Weapons

Each weapon determines your casting attribute and power die:
- **Wand**: Int/Wis, 1d6, fast and versatile
- **Staff**: Int/Wis, 1d8, control and area effects
- **Sword**: Str/Dex, 1d8, hybrid combat caster
- **Orb**: Int, 1d6, subtle connection magic
- **Crystal**: Wis, 1d6, spiritual magic

## Development

### Project Structure
```
Eryndor-VTT-Module/
├── lang/               # Localization files
├── module/             # JavaScript modules
│   ├── documents/      # Actor and Item classes
│   ├── helpers/        # Helper functions
│   └── sheets/         # Sheet classes
├── styles/             # CSS stylesheets
├── templates/          # Handlebars templates
│   ├── actor/          # Actor sheet templates
│   └── item/           # Item sheet templates
├── system.json         # System manifest
└── template.json       # Data model definitions
```

### Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Credits

- **System Design**: Samuel B. C. Schmal
- **Foundry VTT Module**: Built with Foundry VTT system template

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

This game system is designed for use with Foundry Virtual Tabletop and follows the Foundry VTT licensing guidelines.

## Links

- [GitHub Repository](https://github.com/SamuelSchmal/Eryndor-VTT-Module)
- [Eryndor Rulebook (Homebrewery)](https://homebrewery.naturalcrit.com/share/e_KPFOualgXK)

## Support

For issues, questions, or feature requests, please use the [GitHub Issues](https://github.com/SamuelSchmal/Eryndor-VTT-Module/issues) page.

