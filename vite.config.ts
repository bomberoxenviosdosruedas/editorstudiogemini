import path from 'path';
import { defineConfig, loadEnv } from 'vite';

/**
 * Vite configuration file.
 * This file configures the Vite development server and build process.
 *
 * @see https://vitejs.dev/config/
 */
export default defineConfig(({ mode }) => {
    // Load environment variables from .env files based on the current mode (development, production, etc.)
    const env = loadEnv(mode, '.', '');

    return {
      /**
       * Defines global constants that will be replaced at build time.
       * This is used to expose environment variables to the client-side code.
       * It's important to use `process.env` to mimic the Node.js environment
       * that some libraries might expect.
       */
      define: {
        'process.env.API_KEY': JSON.stringify(env.API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      /**
       * Configuration for module resolution.
       * This sets up aliases for easier imports.
       */
      resolve: {
        alias: {
          // Sets up an alias '@' to point to the root directory of the project.
          // This allows for cleaner import paths, e.g., `import Component from '@/components/Component.tsx'`
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
