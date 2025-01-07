export interface Language {
  id: string;
  name: string;
  flag: string;
}

export const languages: Language[] = [
  {
    id: "pt-BR",
    flag: "🇧🇷",
    name: "Português",
  },
  {
    id: "en",
    flag: "🇺🇸",
    name: "English",
  },
  {
    id: "es",
    flag: "🇪🇸",
    name: "Español",
  },
];
