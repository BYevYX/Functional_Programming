import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginPrettier from 'eslint-plugin-prettier/recommended'

export default [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    ...tseslint.configs.stylistic,
    {
        ignores: [
            '**/*.config*',
            '**/*.json',
            'dist/**',
            '.github/**',
            '.vscode/**',
            'node_modules/**',
        ],
    },

    pluginPrettier,
]
