import express from "express";

const app = express();
const PORT = process.env.PORT || 6160;
const HOST = process.env.HOST || "127.0.0.1";

app.use("/specification", express.static("specification"));
app.use("/code", express.static("code"));

app.get("/", (req, res) => {
  res.redirect("/specification/index.html");
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
