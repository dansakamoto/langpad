export type Character = { kanji: string; translation: string; file: string };
export const characters: Character[] = [
  { kanji: "一", translation: "1", file: "audio/1.mp3" },
  { kanji: "二", translation: "2", file: "audio/2.mp3" },
  { kanji: "三", translation: "3", file: "audio/3.mp3" },
  { kanji: "四", translation: "4", file: "audio/4.mp3" },
  { kanji: "五", translation: "5", file: "audio/5.mp3" },
  { kanji: "六", translation: "6", file: "audio/6.mp3" },
  { kanji: "七", translation: "7", file: "audio/7.mp3" },
  { kanji: "八", translation: "8", file: "audio/8.mp3" },
  { kanji: "九", translation: "9", file: "audio/9.mp3" },
  { kanji: "十", translation: "10", file: "audio/10.mp3" },
  { kanji: "百", translation: "100", file: "audio/100.mp3" },
  { kanji: "千", translation: "1,000", file: "audio/1000.mp3" },
  { kanji: "万", translation: "10,000", file: "audio/10000.mp3" },
  { kanji: "億", translation: "100,000,000", file: "audio/100000000.mp3" },
  {
    kanji: "兆",
    translation: "1,000,000,000,000",
    file: "audio/1000000000000.mp3",
  },
];
