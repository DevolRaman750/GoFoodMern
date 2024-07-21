import React, { useState } from "react";
import { Link } from "react-router-dom";
// import {useState} from 'react'

export default function Signup() {
  const [first, setFirst] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: ""
  });

  const onChange = (event) => {
    setFirst({ ...first, [event.target.name]: event.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault(); //Synthetic Event
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: first.name,
        email: first.email,
        password: first.password,
        location: first.geolocation
      }),
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter Valid Credentials");
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handlesubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={first.name}
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>

            <input
              type="email"
              className="form-control"
              value={first.email}
              onChange={onChange}
              id="exampleInputEmail1"
              
              placeholder="Enter email"
              name="email"
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              value={first.password}
              onChange={onChange}
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Location</label>
            <input
              type="text"
              className="form-control"
              name="geolocation"
              value={first.geolocation}
              onChange={onChange}
              id="exampleInputlocation1"
              placeholder="Address"
            />
          </div>

          <button type="submit" className="m-3 btn btn-primary">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger">
            Already a User
          </Link>
        </form>
      </div>
    </>
  );
}
