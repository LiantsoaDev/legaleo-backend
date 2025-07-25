// eslint.config.js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [
      'app/generated/**', // ⛔ ignore tous les fichiers générés
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      // tes règles personnalisées ici
    },
  },
];
