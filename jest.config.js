module.exports = {
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue'
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest'
  },
  snapshotSerializers: [
    'jest-serializer-vue'
  ],
  testMatch: [
    // '**/tests/unit/**/*.test.(js|jsx|ts|tsx)',
    '**/tests/unit/**/*.test.(js|jsx|ts|tsx)'
  ],
  collectCoverage: false,
  collectCoverageFrom: [
    '**/src/**/utils/(util|table).js'
    // '**/src/views/**/*.vue'
    // '**/src/**/*.vue',
  ],
  'moduleNameMapper': {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testURL: ' http://localhost:8000/manage/'
}
