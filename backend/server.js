const app = require("./app");
const path = require("path");
const express=require("express");

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "dist")));

app.get("/form", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
