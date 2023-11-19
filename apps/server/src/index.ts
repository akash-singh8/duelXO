import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(3053, () => {
  console.log("app listening on port 3053");
});
