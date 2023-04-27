import { defineConfig } from 'cypress';

export default defineConfig({
  env: {
    NEXT_PUBLIC_API_URL: 'http://localhost:8888',
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      this.baseUrl = 'http://localhost:8888';
    },
  },

  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
});
