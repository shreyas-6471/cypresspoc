const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "kd3hrw",
  defaultCommandTimeout:6000,
  scripts:{
    test:"npx cypress run",
    testDashboard:"npx cypress run --record --key 805cbb9f-1cd4-43fa-b7fa-6d23951257c6",
    
  },
  env:{
    url:"https://rahulshettyacademy.com"
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

    },
    specPattern:'cypress/integration/examples/*.js'
  },
});
