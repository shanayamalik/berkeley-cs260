import express from "express";
import path from "node:path";
import fs from "node:fs/promises";

const app = express();
const PORT = process.env.PORT || 6160;
const HOST = process.env.HOST || "127.0.0.1";

app.use("/specification", express.static("specification"));
app.use("/code", express.static("code"));

app.get("/", (req, res) => {
  res.redirect("/specification/index.html");
});

const savePath = path.join(import.meta.dirname, "../code/part2/save-data.json");

const saveData = async (data) => {
  await fs.writeFile(savePath, JSON.stringify(data, null, 2));
};

const getSaveData = async () => {
  if (
    await fs
      .access(savePath)
      .then(() => true)
      .catch(() => false)
  ) {
    const data = await fs.readFile(savePath, "utf-8");
    return data;
  }
  return "null";
};

app.get("/save", async (req, res) => {
  const data = await getSaveData();
  res.send(data);
});

app.get("/save.jsonp.js", async (req, res) => {
  res.setHeader("Content-Type", "application/javascript");
  const progressData = await getSaveData();
  if (progressData === "null") {
    res.send("");
    return;
  }
  res.send(
    `localStorage.setItem('cssdiner-progress', ${JSON.stringify(progressData)});`
  );
});

app.post("/save", express.json(), async (req, res) => {
  const data = req.body;
  await saveData(data);
  res.json({
    success: true,
  });
});

app.use("/css-diner", express.static("css-diner"));

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
