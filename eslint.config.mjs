import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-plugin-prettier';

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs}'],
        plugins: { js },
        extends: ['js/recommended'],
    },
    {
        files: ['**/*.{js,mjs,cjs}'],
        languageOptions: { globals: globals.node },
    },
    {
        plugins: {
            prettier,
        },
    },
    {
        rules: {
            'prettier/prettier': 'error',
            'class-methods-use-this': 'off',
            'no-param-reassign': 'off',
            camelcase: 'off',
            'no-underscore-dangle': 'off',
            'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
        },
    },
]);
