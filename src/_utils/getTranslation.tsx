import { characters } from "../_data/characters";

const translations: Record<string, string> = {};

for (const c of characters) {
  translations[c.kanji] = c.translation;
}

export default function getTranslation(s: string) {
  return s in translations ? translations[s] : "?";
}
