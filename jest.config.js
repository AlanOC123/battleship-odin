module.exports = {
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.js$": "babel-jest",
    },
    moduleNameMapper: {
        '\\.html\\?raw$': '<rootDir>/tests/__mocks__/mock.html.js',
        '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/tests/__mocks__/mock.image.js',
    },
}
