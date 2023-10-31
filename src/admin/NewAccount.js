import React, { useState } from 'react'

const NewAccount = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setmobile] = useState("");
  const [city, setcity] = useState("");


  const save = () => {
    if (!name || !email || !password || !mobile || !city) {
      alert("Please fill in all fields.");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!isValidMobile(mobile)) {
      alert("Please enter a valid mobile number.");
      return;
    }

    let url = "https://cybotrix.com/webapi/api/createaccount";
    let userdata = {
      tokenno: localStorage.getItem("tokenno"),
      name: name ,
      email: email,
      password: password,
      mobile: mobile,
      city: city
    };
    let postdata = {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(userdata)
    }
    fetch(url, postdata)
      .then(response => response.text())
      .then(msg => {
        alert(msg);
      })


  }

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const isValidMobile = (mobile) => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(mobile);
  }


  return (
    <div className='container my-5'>
      <div className='row'>
        <div className='col-lg-4'></div>
        <div className='col-lg-4 border shadow py-4 rounded'>

          <div className="form-group mb-2">
            <label for="name">Name</label>
            <input type="text" className="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter name" onChange={(e) => setname(e.target.value)} value={name} />
          </div>
          <div className="form-group mb-2">
            <label for="exampleInputEmail1">Email </label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e) => setemail(e.target.value)} value={email} />
          </div>
          <div className="form-group mb-2">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
          </div>
          <div className="form-group mb-2">
            <label for="Mobile">Mobile</label>
            <input type="number" className="form-control" id="Mobile" maxLength="10" placeholder="mobile" onChange={(e) => setmobile(e.target.value)} value={mobile} />
          </div>

          <div className="form-group mb-2">
            <label for="city">City</label>
            <input type="text" className="form-control" id="city" placeholder="city" onChange={(e) => setcity(e.target.value)} value={city} />
          </div>

          <div className='d-grid text-center'>
            <button type="submit" className="btn btn-primary" onClick={save}>Register</button>

          </div>

        </div>
        <div className='col-lg-4'></div>
      </div>

    </div>
  )
}

export default NewAccount;