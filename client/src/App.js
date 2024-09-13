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
import SearchAppBar from "./components/SearchBar";

function App() {
  const [customers, setCustomers] = useState([]);
  const [progress, setProgress] = useState(0);
  const [searchState, setSearchState] = useState('');

  const handleSearchValueChange = (e) => {
    setSearchState(e.target.value);
  }

  const stateRefresh = () => {
    setCustomers([]);
    setSearchState('');
    callApi()
      .then((res) => setCustomers(res))
      .catch((err) => console.log(err));
  };

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

  const cellList = [
    "번호",
    "이미지",
    "이름",
    "생년월일",
    "성별",
    "직업",
    "설정",
  ];

  const filteredComponents = (data) => {
    data = data.filter((c) => {
      return c.name.indexOf(searchState) > -1;
    })
    return data.map((c) => {
      return <Customer stateRefresh={stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}/>
    })
  }

  return (
    <>
      <SearchAppBar handleSearchValueChange={handleSearchValueChange} searchState={searchState}/>
      <div className="menu">
        <CustomerAdd stateRefresh={stateRefresh} />
      </div>

      <Paper className="paper">
        <Table className="table">
          <TableHead>
            <TableRow>
              {cellList.map((c, index) => {
                return <TableCell key={index} className="tableHead">{c}</TableCell>
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.length !== 0 ? filteredComponents(customers) : (
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
    </>
  );
}

export default App;
