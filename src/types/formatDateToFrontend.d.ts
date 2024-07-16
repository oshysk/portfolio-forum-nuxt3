import { NuxtApp } from 'nuxt/app';

declare module 'nuxt/app' {
    interface NuxtApp {
        $formatDateToFrontend: (value: string) => string;
    }
}