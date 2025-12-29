import * as googleTTS from "google-tts-api";
import { kanji2number } from "@geolonia/japanese-numeral";
import fs from "fs";

import type { Request, Response } from "express";

const apiExceptions = ["十一", "二兆"];

export default async function getAudio(req: Request<string>, res: Response) {
  const serverPath = "downloads/ja/" + req.body.text + ".b64";

  if (fs.existsSync(serverPath)) {
    console.log("file found, sending local file");
    fs.readFile(serverPath, "base64", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      res.send({ type: "data", audioData: data });
    });

    return;
  }

  console.log("file not found, requesting new file");

  const t = req.body.text;
  const num = !apiExceptions.includes(t) ? kanji2number(t) : t;

  const audioData = await googleTTS.getAudioBase64(num.toString(), {
    lang: "ja",
    slow: false,
    host: "https://translate.google.com",
  });

  res.send({ type: "data", audioData: audioData });

  fs.writeFile(serverPath, audioData, "base64", (err) => {
    if (err) console.error(err);
  });
}
