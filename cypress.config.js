const { defineConfig } = require("cypress");
// Import the preprocessor and the browserify function correctly
const cucumberPreprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");

async function setupNodeEvents(on, config) {
  // Use the addCucumberPreprocessorPlugin function correctly
  await cucumberPreprocessor.addCucumberPreprocessorPlugin(on, config);

  // Configure file preprocessor
  on("file:preprocessor", browserify.default(config));

  return config;
}

module.exports = defineConfig({
  projectId: "kd3hrw",
  defaultCommandTimeout: 6000,
  env: {
    url: "https://rahulshettyacademy.com"
  },
  e2e: {
    setupNodeEvents,
    specPattern: 'cypress/integration/examples/BDD/*.feature'
  },
});
