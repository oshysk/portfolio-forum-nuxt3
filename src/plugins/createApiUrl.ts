export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();

    nuxtApp.provide('apiClient', () => {
        if (process.server) {
            return config.private.apiUrlServer;
        } else {
            return config.public.apiUrlClient;
        }
    });
});