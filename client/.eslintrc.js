module.exports = {
  root: true,
  plugins: ['@typescript-eslint'],
  extends: [
    'react-app',
    'react-app/jest',
    'airbnb-typescript',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'prettier/react',
  ],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['.eslintrc.js', '**/*.config.js'],
};
