const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const port = 4000;
dotenv.config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("연결 완료");
  })
  .catch((err) => {
    console.error(err);
  });

app.get("/", (req, res, next) => {
  //비동기로 인한 에러 처리 이렇게 처리하면 X, next를 이용해야 함!
  setImmediate(() => {
    next(new Error("it is an error"));
  });
  // throw new Error("it is an error"); // 에러처리
  // res.send("안녕하세요!!!!!!");
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

app.use("/users", require("./routes/users"));

app.use("/products", require("./routes/products"));

app.use((error, req, res, next) => {
  res.status(err.status || 500);
  res.send(error.message || '서버에서 에러가 났습니다.');
});

// app.use(express.static("uploads")); // 상대경로
app.use(express.static(path.join(__dirname, "../uploads"))); // 절대경로

app.listen(port, () => {
  console.log(`${port}번에서 실행이 되었습니다.`);
});