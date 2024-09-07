import React from "react";
import "./App.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Customer from "./components/Customer";
import Paper from "@mui/material/Paper";

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

function App() {
  return (
    <Paper className="root">
      <Table className="table">
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생년월일</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((c) => (
            <Customer
              key={c.id}
              id={c.id}
              image={c.image}
              name={c.name}
              birthday={c.birthday}
              gender={c.gender}
              job={c.job}
            />
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default App;
