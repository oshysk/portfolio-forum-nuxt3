import dayjs from "dayjs"
import { defineNuxtPlugin } from "#app"

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide("formatDateToFrontend", (value: string) => {
        const date = dayjs(value)
        return date.format("YYYY/MM/DD HH:mm:ss")
    })
})