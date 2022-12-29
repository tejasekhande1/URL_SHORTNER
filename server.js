const express = require("express");
const ShortUrl = require("./models/shortUrl");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
require("./config/mongoDB");

app.get("/", async (req, res) => {
  const shortUrls = await ShortUrl.find();
  res.render("index", { shortUrls: shortUrls });
});

app.post("/shortUrls", async (req, res) => {
  await ShortUrl.create({ full: req.body.fullUrl });

  res.redirect("/");
});

app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
  if (shortUrl == null) return res.sendStatus(404);

  shortUrl.clicks++;
  shortUrl.save();

  res.redirect(shortUrl.full);
});

app.post("/delete/:shortUrl", async (req, res) => {
  const shortUrl = await ShortUrl.deleteOne({ short: req.params.shortUrl });
  if (shortUrl == null) return res.sendStatus(404);

  res.redirect("/");
});

app.listen(8081, () => {
  console.log("Server is up and running");
});
