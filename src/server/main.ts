import express from "express";
import ViteExpress from "vite-express";
import getAudio from "./routes/getAudio";

const port = 3000;
const app = express();

if (process.env.NODE_ENV == "production") {
  app.use("/", express.static("dist"));

  app.listen(port, () => {
    console.log(`Soundboard running in production mode on port ${port}`);
  });
} else {
  ViteExpress.listen(app, port, () => {
    console.log(`Soundboard running in development mode on port ${port}`);
  });
}

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.post("/getAudio", getAudio);
