import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import BottomNavbar from "./BottomNavbar";
import UsersList from "./UsersList";
import appConfig from "../config";
import { fetchUsers, searchSingleUsers } from "../TableData";
import { getCustomRecordIndex } from "../PageData";

function AdminPage() {
  const [customUserList, setCustomUserList] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ref = useRef(0);

  useEffect(() => {
    fetchUsers(setCustomUserList);
  }, []);

  const searchCustomUser = (e) => {
    setCurrentPage(1);
    setCustomUserList(searchSingleUsers(e.target.value, customUserList));
  };

  const deleteCustomUser = (id) => {
    let updatedCustomUserList = customUserList.filter((user) => user.id !== id);
    setCustomUserList(updatedCustomUserList);
    setShouldUpdate((prevState) => !prevState);
  };

  const deleteSelectedCustom = () => {
    if (window.confirm("Selected users will be deleted")) {
      setCustomUserList((prevState) =>
        prevState.filter((user) => !user.selected)
      );
      ref.current.checked = false;
    }
  };

  const editCustomUser = (id) => {
    let updatedCustomUserList = customUserList;
    const index = updatedCustomUserList.findIndex((user) => user.id === id);
    updatedCustomUserList[index].edit = true;
    setCustomUserList(updatedCustomUserList);
    setShouldUpdate((prevState) => !prevState);
  };

  const saveCustomUser = (id, nameRef, emailRef, roleRef) => {
    let updatedCustomUserList = customUserList;
    const index = updatedCustomUserList.findIndex((user) => user.id === id);
    updatedCustomUserList[index].name = nameRef.current.value;
    updatedCustomUserList[index].email = emailRef.current.value;
    updatedCustomUserList[index].role = roleRef.current.value;
    updatedCustomUserList[index].edit = false;
    setCustomUserList(updatedCustomUserList);
    setShouldUpdate((prevState) => !prevState);
  };

  const selectOneCustom = (id) => {
    let updatedCustomUserList = customUserList;
    const index = updatedCustomUserList.findIndex((user) => user.id === id);
    updatedCustomUserList[index].selected = !updatedCustomUserList[index]
      .selected;
    setCustomUserList(updatedCustomUserList);
    setShouldUpdate((prevState) => !prevState);
  };

  const selectAllCustom = (e) => {
    const listedUserIds = customUserList
      .filter((user) => user.show)
      .slice(customIndex, customIndex + appConfig.PAGE_SIZE)
      .map((user) => user.id);

    let updatedCustomUserList = customUserList.map((user) => {
      if (listedUserIds.includes(user.id)) {
        user.selected = e.target.checked;
        return user;
      }
      return user;
    });

    setCustomUserList(updatedCustomUserList);
    setShouldUpdate(!shouldUpdate);
  };

  const customIndex = getCustomRecordIndex(currentPage);

  return (
    <div className="App">
      <input
        className="search"
        type="text"
        placeholder="Search by any name, email or role"
        onChange={searchCustomUser}
      />
      <UsersList
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        selectAll={selectAllCustom}
        ref={ref}
        selectOne={selectOneCustom}
        saveUser={saveCustomUser}
        editUser={editCustomUser}
        deleteUser={deleteCustomUser}
        users={customUserList
          .filter((user) => user.show)
          .slice(customIndex, customIndex + appConfig.PAGE_SIZE)}
      />
      <BottomNavbar
        usersLength={customUserList.filter((user) => user.show).length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        deleteSelected={deleteSelectedCustom}
      />
    </div>
  );
}

export default AdminPage;
