import React, { useEffect, useState } from "react";
import { Table } from "antd";
import "./Roles.scss";
import Button from "react-bootstrap/Button";
import UsersUp from "./UsersUp";
import { Link } from "react-router-dom";
import { userservice } from "../APIs/Services/UserServices";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userservice.getAllUsers().then(({ data: usersData }) => {
      setUsers(usersData.data);
    });
  }, []);

  const getUser = (id) => {
    userservice.getUser(id).then(({ data: user }) => {
      if(!localStorage.getItem("Item")){
        localStorage.setItem("item", JSON.stringify(user.data));
      }
      
    });
  };

  const deleteUser = (id) => {
    userservice.deleteUser(id).then((data) => {
      console.log(data);
    });
  };

  const columns = [
    {
      title: "UserName",
      dataIndex: "surName",
      key: "surName",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record) => (
        <div className="d-flex ">
          <Button
            id={record.id}
            onClick={() => {
              deleteUser(record.id);
            }}
            className="margin "
            variant="danger"
          >
            Delete
          </Button>
          <Link to="/edituser">
            <Button
              id={record.id}
              onClick={() => {
                getUser(record.id);
              }}
              variant="primary"
            >
              {" "}
              Edit{" "}
            </Button>
          </Link>
          <Link to="/userinfo">
            <Button
              id={record.id}
              onClick={() => {
                getUser(record.id);
              }}
              variant="info"
            >
              View
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <>
      <UsersUp />
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={users}
      />
    </>
  );
};
export default Users;
