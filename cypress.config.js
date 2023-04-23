module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://sandbox311.moodledemo.net",
    retries: {
      runMode: 1,
      openMode: 0,
    },
    viewportHeight: 1080,
    viewportWidth: 1920,
  },
};
