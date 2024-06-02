module.exports = {
    transform: {
      "^.+\.[t|j]sx?$": "babel-jest"
    },
    testEnvironment: "jsdom",
    moduleFileExtensions: ["js", "jsx"],
    moduleDirectories: ["node_modules", "src"],
    testMatch: ["/tests//.test.js", "**/?(.)+(test).js"],
  };