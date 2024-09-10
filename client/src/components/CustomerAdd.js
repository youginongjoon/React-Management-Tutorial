import React, { useState } from "react";
import axios from "axios";

export default function CustomerAdd( { stateRefresh }) {
  const [customerState, setCustomerState] = useState({
    file: null,
    userName: "",
    birthday: "",
    gender: "",
    job: "",
    fileName: "",
  });


  const handleFileChange = (event) => {
    setCustomerState((prevState) => ({
      ...prevState,
      file: event.target.files[0],
      fileName: event.target.value,
    }));
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
        "content-type": "multipart/form-data", // 전달하고자 하는 내용에 파일이 포함되어 있을 때 설정
      },
    };
    return axios.post(url, formData, config);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    addCustomer()
      .then((response) => {
        console.log(response.data);
        stateRefresh(); // 새로고침 
      });
      setCustomerState({
        file: null,
        userName: '',
        birthday: '',
        gender: '',
        job: '',
        fileName: ''
      })
      
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h1>고객추가</h1>
      프로필 이미지:
      <input
        type="file"
        name="file"
        file={customerState.file}
        value={customerState.fileName}
        onChange={handleFileChange}
      />
      <br />
      이름:
      <input
        type="text"
        name="userName"
        value={customerState.userName}
        onChange={handleValueChange}
      />
      <br />
      생년월일:
      <input
        type="text"
        name="birthday"
        value={customerState.birthday}
        onChange={handleValueChange}
      />
      <br />
      성별:
      <input
        type="text"
        name="gender"
        value={customerState.gender}
        onChange={handleValueChange}
      />
      <br />
      직업:
      <input
        type="text"
        name="job"
        value={customerState.job}
        onChange={handleValueChange}
      />
      <br />
      <button type="submit">추가하기</button>
    </form>
  );
}
