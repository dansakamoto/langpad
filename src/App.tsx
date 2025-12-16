import { useState } from "react";
import { characters } from "./data/characters";

import type { Character } from "./data/characters";
type KanjiGroup = { key: string; kanjiGroup: string; translation: string };

// const numFormatter = new Intl.NumberFormat("en-US");

const loadedAudio: Record<string, AudioBuffer> = {};
const audioContext = new AudioContext();
let currentlyPlaying = "";

async function setupAudio() {
  for (const char of characters) {
    const data = await fetch(char.file);
    const arrayBuffer = await data.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    loadedAudio[char.kanji] = audioBuffer;
  }
}
setupAudio();

let keyItr = 0;

export default function App() {
  const [chunks, setChunks] = useState<KanjiGroup[]>([]);
  const [translation, setTranslation] = useState("");

  function handleCharTap(char: Character) {
    if (currentlyPlaying !== "") return;

    setChunks([
      ...chunks,
      {
        key: "phrase-" + keyItr++,
        kanjiGroup: char.kanji,
        translation: char.translation,
      },
    ]);
    setTranslation(char.translation);

    if (loadedAudio[char.kanji]) {
      const source = audioContext.createBufferSource();
      source.buffer = loadedAudio[char.kanji];
      source.connect(audioContext.destination);
      source.start();
    }
  }

  function handlePlayTap() {
    if (currentlyPlaying === "") playQueue(chunks);
  }

  const buttons = characters.map((char) => (
    <button
      key={char.kanji}
      className="p-1"
      onPointerDown={() => handleCharTap(char)}
      style={{ touchAction: "manipulation" }}
    >
      {char.kanji}
    </button>
  ));

  const phraseList =
    chunks.length > 0 ? (
      chunks.map((s) => (
        <li
          key={s.key}
          className={
            "p-2 m-1 text-6xl " +
            (s.key === currentlyPlaying ? "text-amber-300" : "")
          }
        >
          {s.kanjiGroup}
        </li>
      ))
    ) : (
      <div className="p-2 m-1 text-3xl">&nbsp;</div>
    );

  function playQueue(queue: KanjiGroup[]) {
    if (queue.length > 0 && loadedAudio[queue[0].kanjiGroup]) {
      currentlyPlaying = queue[0].key;
      setTranslation(queue[0].translation);
      const source = audioContext.createBufferSource();
      source.buffer = loadedAudio[queue[0].kanjiGroup];
      source.connect(audioContext.destination);
      source.onended = () => {
        setChunks(queue.slice(1));
        playQueue(queue.slice(1));
      };
      source.start();
    } else {
      currentlyPlaying = "";
      setTranslation("");
    }
  }

  return (
    <main className="flex h-screen w-screen flex-col">
      <div className="h-1/5 flex flex-col justify-evenly">
        <ul id="viewer" className="flex">
          {phraseList}
        </ul>
        <div className="flex justify-center text-3xl">{translation}</div>
      </div>
      <div className="flex flex-col">
        <div className="text-6xl flex justify-center">{buttons}</div>
        <button
          className="text-3xl"
          onPointerDown={handlePlayTap}
          style={{ touchAction: "manipulation" }}
        >
          Play
        </button>
      </div>
    </main>
  );
}
