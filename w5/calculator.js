import express from "express";

const app = express();

app.get("/add/:firstNum/:secondNum", (req, res) => {
  const a = parseInt(req.params.firstNum);
  const b = parseInt(req.params.secondNum);
  res.json({
    answer: a + b,
  });
});
app.get("/subtract/:firstNum/:secondNum", (req, res) => {
  const a = parseInt(req.params.firstNum);
  const b = parseInt(req.params.secondNum);
  res.json({
    answer: a - b,
  });
});
app.get("/multiply/:firstNum/:secondNum", (req, res) => {
  const a = parseInt(req.params.firstNum);
  const b = parseInt(req.params.secondNum);
  res.json({
    answer: a * b,
  });
});
app.get("/divide/:firstNum/:secondNum", (req, res) => {
  const a = parseInt(req.params.firstNum);
  const b = parseInt(req.params.secondNum);
  res.json({
    answer: a / b,
  });
});
app.get("/add", (req, res) => {
  const a = parseInt(req.query.firstNum);
  const b = parseInt(req.query.secondNum);
  res.json({
    answer: a + b,
  });
});

app.listen(3000, () => {
  console.log("app is listening on port 3000");
});
