module.exports = {
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.js$": "babel-jest",
    },
    moduleNameMapper: {
        '\\.html\\?raw$': '<rootDir>/tests/__mocks__/htmlMock.js',
    },
}
