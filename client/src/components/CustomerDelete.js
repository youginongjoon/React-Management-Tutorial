import React from "react";

export default function CustomerDelete({ id, stateRefresh }) {

  const deleteCustomer = async (id) => {
    const url = '/api/customers/' + id;
    await fetch(url, {
      method: 'DELETE',
    });
    stateRefresh(); // DELETE 요청이 완료된 후 상태 갱신
  };

  return (
    <button onClick={() => deleteCustomer(id)}>삭제</button>
  );
}
