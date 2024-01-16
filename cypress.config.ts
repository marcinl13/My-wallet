import { defineConfig } from "cypress";
import vitePreprocessor from 'cypress-vite'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000/',
    viewportHeight: 884,
    viewportWidth: 390,
    setupNodeEvents(on) {
      on('file:preprocessor', vitePreprocessor())
    },
    retries: {
      runMode: 2,
    }
  },
});
