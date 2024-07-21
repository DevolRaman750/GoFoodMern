import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';

export default function Login() {
  const [first, setFirst] = useState({
   
    email: "",
    password: ""
    
  });
  let navigate = useNavigate()

  const onChange = (event) => {
    setFirst({ ...first, [event.target.name]: event.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault(); //Synthetic Event
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        
        email: first.email,
        password: first.password,
        
      }),
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter Valid Credentials");
    }
    if (json.success) {
      localStorage.setItem('UserEmail',first.email);
      localStorage.setItem('authToken',json.authToken);
      console.log(localStorage.getItem('authToken'));
      navigate('/');
    }
  };
  return (
    <>
    <div className="container">
        <form onSubmit={handlesubmit}>
          

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
          

          <button type="submit" className="m-3 btn btn-primary">
            Submit
          </button>
          <Link to="/createuser" className="m-3 btn btn-danger">
            I m a new User
          </Link>
        </form>
      </div></>
  )
}
//Now For Hashing of Password Install bcrypt.js and jsonwebtoken
//npm i bcrypt jsonwebtoken