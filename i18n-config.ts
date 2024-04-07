export const i18n = {
  defaultLocale: "zh",
  locales: ["en", "zh"],
}

export type Locale = (typeof i18n)["locales"][number];
