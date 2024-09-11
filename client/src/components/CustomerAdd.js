import React, { useState } from "react";
import axios from "axios";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogActions, TextField } from "@mui/material";

export default function CustomerAdd({ stateRefresh }) {
  const [customerState, setCustomerState] = useState({
    file: null,
    userName: "",
    birthday: "",
    gender: "",
    job: "",
    fileName: "",
    open: false,
  });

  const handleClickOpen = () => {
    setCustomerState((prevState) => ({
      ...prevState,
      open: true,
    }));
  };

  const handleClose = () => {
    setCustomerState({
      file: null,
      userName: "",
      birthday: "",
      gender: "",
      job: "",
      fileName: "",
      open: false,
    });
  };

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setCustomerState((prevState) => ({
        ...prevState,
        file: event.target.files[0],
        fileName: event.target.files[0].name, // Update fileName based on selected file
      }));
    }
  };

  const handleValueChange = (event) => {
    setCustomerState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const addCustomer = () => {
    const url = "/api/customers";
    const formData = new FormData();
    formData.append("image", customerState.file);
    formData.append("name", customerState.userName);
    formData.append("birthday", customerState.birthday);
    formData.append("gender", customerState.gender);
    formData.append("job", customerState.job);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return axios.post(url, formData, config);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    // 필수 필드 유효성 검사
    if (!customerState.file || !customerState.userName || !customerState.birthday || !customerState.gender || !customerState.job) {
      alert("모든 필드를 채워주세요."); // 사용자에게 오류 메시지 표시
      return; // 폼 제출을 중단합니다
    }

    addCustomer().then((response) => {
      console.log(response.data);
      stateRefresh(); // 새로고침
    });
    setCustomerState({
      file: null,
      userName: "",
      birthday: "",
      gender: "",
      job: "",
      fileName: "",
      open: false,
    });
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        고객 추가하기
      </Button>
      <Dialog open={customerState.open} onClose={handleClose}>
        <DialogTitle>고객 추가</DialogTitle>
        <DialogContent>
          <input
            style={{ display: 'none' }}
            accept="image/*"
            id="raised-button-file"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="raised-button-file">
            <Button variant="contained" color="primary" component="span"> 
              {customerState.fileName === "" ? "프로필 이미지 선택" : customerState.fileName}
            </Button>
          </label>
          <br />
          <TextField
            label="이름"
            type="text"
            name="userName"
            value={customerState.userName}
            onChange={handleValueChange}
          />
          <br />
          <TextField
            label="생년월일"
            type="text"
            name="birthday"
            value={customerState.birthday}
            onChange={handleValueChange}
          />
          <br />
          <TextField
            label="성별"
            type="text"
            name="gender"
            value={customerState.gender}
            onChange={handleValueChange}
          />
          <br />
          <TextField
            label="직업"
            type="text"
            name="job"
            value={customerState.job}
            onChange={handleValueChange}
          />
          <br />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleFormSubmit}>추가</Button>
          <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
