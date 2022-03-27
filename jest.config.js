module.exports = {
  moduleFileExtensions: [
    'js',
    'vue'
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.vue$': "@vue/vue3-jest"
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1'
  },
  testMatch: ['**/*.test.js'],
  transformIgnorePatterns: ['<rootDir>/node_modules/']
};