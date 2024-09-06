import React, { Component } from "react";
import "./App.css";
import Customer from "./components/Customer";

const customers = [
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
];

class App extends Component {
  render() {
    return (
      <>
        {customers.map((c) => {
          return (
            <Customer
              key={c.id}
              id={c.id}
              image={c.image}
              name={c.name}
              birthday={c.birthday}
              gender={c.gender}
              job={c.job}
            />
          );
        })}
      </>
    );
  }
}

export default App;
