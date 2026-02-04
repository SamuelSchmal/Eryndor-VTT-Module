/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function() {
  return loadTemplates([

    // Actor partials.
    "systems/eryndor/templates/actor/parts/actor-abilities.hbs",
    "systems/eryndor/templates/actor/parts/actor-description.hbs",
    "systems/eryndor/templates/actor/parts/actor-masteries.hbs",
    "systems/eryndor/templates/actor/parts/actor-items.hbs",
    "systems/eryndor/templates/actor/parts/actor-spells.hbs",
    "systems/eryndor/templates/actor/parts/actor-effects.hbs",
  ]);
};
