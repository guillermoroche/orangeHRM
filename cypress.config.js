const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-terminal-report/src/installLogsPrinter')(on);
    },

    env: {
      URL_base: "https://opensource-demo.orangehrmlive.com",
      AdminUsername: "Admin",
      AdminPassword: "admin123",
      NewUserPassword: "password1",
    },
    watchForFileChanges: false,
    viewportWidth: 1900,
    viewportHeight: 1080,
  },
});