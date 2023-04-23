// jest.config.js
// module.exports = {
//   transformIgnorePatterns: [
//    '/node_modules/(?!(axios)/).*'
//   ],
// }
// In tsconfig.json
module.exports = {
    //   transformIgnorePatterns: [
    //    '/node_modules/(?!(axios)/).*'
    //   ],
    "setupFilesAfterEnv": ["<rootDir>/src/setupTests.ts"],  
    "include": [
    ...
    "./src/setupTests.ts"
    ],
}

