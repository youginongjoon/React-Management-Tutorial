import React, { useEffect, useState } from "react";
import "./App.css";
import CustomerAdd from "./components/CustomerAdd";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Customer from "./components/Customer";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";

function App() {
  const [customers, setCustomers] = useState([]);
  const [progress, setProgress] = React.useState(0);

  useEffect(() => {
    callApi()
      .then((res) => setCustomers(res))
      .catch((err) => console.log(err));
  }, []);

  const callApi = async () => {
    const response = await fetch("/api/customers");
    const body = await response.json();
    return body;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
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
            {customers.length !== 0 ? (
              customers.map((c) => (
                <Customer
                  key={c.id}
                  id={c.id}
                  image={c.image}
                  name={c.name}
                  birthday={c.birthday}
                  gender={c.gender}
                  job={c.job}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress
                    className="progress"
                    variant="determinate"
                    value={progress}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
      <CustomerAdd/>
    </>
  );
}

export default App;
