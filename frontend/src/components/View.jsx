import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import Layout from "../Layout/Layout";

const View = () => {
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState("")
  const nav = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:7000/api/get-data");
    setData(res?.data?.result);
  };

  const handleDelete = async (_id) => {
    const isValid = confirm("Are you sure you want to delete!");
    if (isValid) {
      const res = await axios.delete(
        `http://localhost:7000/api/del-data/${_id}`,
      );
      Swal.fire({
        title: "Delete",
        text: res?.data?.message,
        icon: "success",
        timer: 2000,
      });
      fetchData();
    }
  };

  const handleEdit = async(item) => {
    nav("/edit/:id", { state: item });
  };

  const handleSearch = async(value)=>{
    setKeyword(value)

    if (!value.trim()) {
    fetchData();
    return;
  }

  const res = await axios.get(`http://localhost:7000/api/search?keyword=${value}`)
  setData(res?.data?.result);
  }

  return (
    <>
      <Layout>
        <div className="row">
          <div className="col-sm-12 col-12 mx-auto ">
            <div className="row">
              <div className="col-sm-12 col-12 mx-auto mb-5 mt-4 bg-warning">
                <span className="fs-5 fw-bold ps-2 text-success">Welcome to the Lead Management System...</span>
                <input type="search" value={keyword} onChange={(e) => handleSearch(e.target.value)} className="rounded w-25 p-2 srch" placeholder="Search by Name, Email or Company" />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-12 mx-auto">
                <table className="table">
                  <thead className="table-dark">
                    <tr>
                      <th>Sr.No</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Company</th>
                      <th>Statys</th>
                      <th>Notes</th>
                      <th>createdAt</th>
                      {/* <th>updatedAt</th> */}
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item?.name}</td>
                          <td>{item?.email}</td>
                          <td>{item?.phone}</td>
                          <td>{item?.company}</td>
                          <td>{item?.status}</td>
                          <td>{item?.notes}</td>
                          <td>{new Date(item?.createdAt).toLocaleString()}</td>
                          {/* <td>{new Date(item?.updatedAt).toLocaleString()}</td> */}
                          <td>
                            <span
                              className="btn btn-warning text-light"
                              onClick={() => handleEdit(item)}
                            >
                              <FaEdit className="fs-4" />
                            </span>
                          </td>
                          <td>
                            <span
                              className="btn btn-danger"
                              onClick={() => handleDelete(item?._id)}
                            >
                              <FaTrashAlt className="fs-5" />
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default View;
