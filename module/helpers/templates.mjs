/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function() {
  return loadTemplates([

    // Actor partials.
    "templates/actor/parts/actor-abilities.hbs",
    "templates/actor/parts/actor-items.hbs",
    "templates/actor/parts/actor-spells.hbs",
    "templates/actor/parts/actor-effects.hbs",
  ]);
};
