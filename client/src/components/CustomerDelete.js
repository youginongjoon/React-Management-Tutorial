import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogActions } from "@mui/material";


export default function CustomerDelete({ id, stateRefresh }) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleClickOpen = () => {
    setOpenDeleteModal(true);
  };

  const handleClose = () => {
    setOpenDeleteModal(false);
  };

  const deleteCustomer = async (id) => {
    const url = "/api/customers/" + id;
    await fetch(url, {
      method: "DELETE",
    });
    stateRefresh(); // DELETE 요청이 완료된 후 상태 갱신
  };

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        삭제
      </Button>
      <Dialog open={openDeleteModal}>
        <DialogTitle>
          삭제 경고
        </DialogTitle>
        <DialogContent>
          <p>선택한 고객 정보가 삭제됩니다.</p>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={(e) => {deleteCustomer(id)}}>삭제</Button>
          <Button variant="contained" color="primary" onClick={handleClose}>닫기</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
