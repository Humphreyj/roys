import { defineConfig } from 'cypress'

export default defineConfig({
    e2e: {
        chromeWebSecurity: false,
        specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
        baseUrl: 'http://localhost:3030/',
        viewportHeight: 932,
        viewportWidth: 1440,
    },
    component: {
        specPattern: 'src/**/__tests__/*.{cy,spec}.{js,jsx,tsx}',
        devServer: {
            framework: 'vue',
            bundler: 'vite',
        },
        viewportHeight: 500,
        viewportWidth: 800,
    },
})
