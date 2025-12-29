import { characters } from "../_data/characters";

type TapHandler = (s: string) => void;

export default function ButtonBoard({ handleTap }: { handleTap: TapHandler }) {
  const buttons = characters.map((char) => (
    <button
      key={"kanjigrid-" + char.kanji}
      className="p-3 h-1/5"
      onPointerDown={() => handleTap(char.kanji)}
      style={{ touchAction: "manipulation" }}
    >
      {char.kanji}
    </button>
  ));

  return (
    <div className="flex flex-col h-1/2 m-10">
      <div className="text-6xl flex flex-col flex-wrap-reverse content-center h-full">
        {buttons}
      </div>
      <button
        className="text-6xl"
        onPointerDown={() => handleTap("play")}
        style={{ touchAction: "manipulation" }}
      >
        ▶
      </button>
    </div>
  );
}
