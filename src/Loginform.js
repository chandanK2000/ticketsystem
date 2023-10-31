import React, { useState } from 'react';
import swal from 'sweetalert';
import "./LoginForm.css"

const Loginform = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false); 

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  }

  const LoginUser = () => {
    if (email === "" || password === "") {
      swal("Please fill in both email and password.");
      return; 
    }

    setLoggingIn(true);

    let url = "https://cybotrix.com/webapi/login/auth";
    let userdata = { email: email, password: password };
    let postdata = {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(userdata)
    }

    fetch(url, postdata)
      .then(response => response.json())
      .then(userinfo => {
        if (userinfo.status === "SUCCESS") {
          localStorage.setItem("tokenno", userinfo.tokenno);
          localStorage.setItem("fullname", userinfo.name);
          localStorage.setItem("type", userinfo.type);
          window.location.reload();
        } else {
          swal("Invalid or not exists !");
        }
      })
      .finally(() => {
        setLoggingIn(false);
      });
  }

  return (
    <div className='container mt-5 main-element'>
      <div className='row'>
        <div className='col-lg-4'></div>
        <div className='col-lg-4'>
          <div className='card shadow-sm rounded '>
            <div className='card-header'>
              <h3 className='text-center py-2'><i className="bi bi-person-plus"></i> Login Form</h3>
            </div>
            <div className='card-body'>
              <form>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1"><i className="bi bi-envelope"></i></span>
                  </div>
                  <input type="text" className="form-control" placeholder="Email please" aria-label="Username" aria-describedby="basic-addon1" value={email} onChange={abc => setEmail(abc.target.value)} />
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="bi bi-person-lock"></i>
                    </span>
                  </div>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    className="form-control"
                    placeholder="password"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    value={password} onChange={abc => setPassword(abc.target.value)}
                  />
                  <div className="input-group-append">
                    <span className="input-group-text" onClick={togglePasswordVisibility}>
                      <i className={passwordVisible ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                    </span>
                  </div>
                </div>
              </form>
            </div>
            <div className='card-footer'>
              <div className='text-center d-grid  my-4'>
                <button
                  type="submit"
                  className="buttons"
                  onClick={LoginUser}
                  disabled={loggingIn} // Disable button when loggingIn is true
                >
                  {loggingIn ? "Processing ...." : "Login"} <i className="bi bi-box-arrow-in-right"></i>
                </button>
                <p className='my-1'>
                  <a href="/register"> register here</a>
                  <a href="/register">  forgot password ?</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-4'></div>
      </div>
    </div>
  )
}

export default Loginform;
