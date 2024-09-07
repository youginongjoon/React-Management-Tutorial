const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/customers", (req, res) => {
  res.send([
    {
      id: 1,
      image: "https://picsum.photos/id/1/64/64",
      name: "홍길동",
      birthday: "990909",
      gender: "여자",
      job: "대학생",
    },
    {
      id: 2,
      image: "https://picsum.photos/id/2/64/64",
      name: "김학수",
      birthday: "971203",
      gender: "남자",
      job: "교사",
    },
    {
      id: 3,
      image: "https://picsum.photos/id/3/64/64",
      name: "이순신",
      birthday: "930921",
      gender: "여자",
      job: "군인",
    },
  ])
});

app.listen(port, () => console.log(`Listening on port ${port}`));
