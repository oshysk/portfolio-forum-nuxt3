import { NuxtApp } from 'nuxt/app';

declare module 'nuxt/app' {
    interface NuxtApp {
        $apiClient: () => string;
    }
}