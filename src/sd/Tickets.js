import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Tickets.css';
import LoadingSpinner from '../LoadingSpinner';

const Tickets = () => {
  const [tickets, setticket] = useState([]);
  const [ticketinfo, setticketinfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [status, setstatus] = useState("");
  const [comment, setcomment] = useState("");


  // console.log(status);
  // console.log(comment);


  const ticket = () => {
    setLoading(true);
    let url = "https://cybotrix.com/webapi/supportapi/myallticket";
    let userdata = { tokenno: localStorage.getItem("tokenno") };
    let postdata = {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(userdata)
    }
    fetch(url, postdata)
      .then(response => response.json())
      .then(alldata => {
        setticket(alldata);
        // setticketinfo(alldata);
        setticketinfo(alldata[0]);
        setLoading(false);
      });
  }

  const ticketDetails = (index) => {
    setticketinfo(tickets[index]);
  }

  /*   const [comment, setComment] = useState('');
  
    const handleInputChange = (event) => {
      const inputValue = event.target.value;
      const words = inputValue.split(/\s/).filter(Boolean);
  
      if (words.length <= 100) {
        setComment(inputValue);
      }
    } */



  const updateStatus = async (ticketid, comment, status) => {
    // alert("ok");
    console.log(ticketid);
    let url = " https://cybotrix.com/webapi/supportapi/changestatus";
    let userdata =
    {
      tokenno: localStorage.getItem("tokenno"),
      ticketid: ticketid,
      statustype: status,
      comment: comment
    }
    console.log(userdata);
    let postdata = {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(userdata)
    }
    await fetch(url, postdata)
      .then(response => response.text())
      .then(msg => {
        alert(msg + "successfully");
        ticket();


      });
  }
  useEffect(() => {
    ticket();
  }, [

  ]);
  return (
    <div className='container  my-5'>
      <div className='row'>
        <div className='col-lg-6'>
          <h3 className='text-center text-info'>Available Tickets:- {tickets.length}</h3>

          <div className='card shadow-sm'>
            <div className='card-body custom-scrollbar'>
              {loading && <div className="d-flex justify-content-center">
                {/*  <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div> */}
                <LoadingSpinner />
              </div>}
              {!loading && <div>
                <table className='table table-bordered'>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Mobile</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map((ticketinfo, index) => (
                      <tr key={index} onClick={ticketDetails.bind(this, index)}>
                        <td>{ticketinfo.name.charAt(0).toUpperCase() + ticketinfo.name.slice(1).toLowerCase()}</td>
                        <td>{ticketinfo.mobile}</td>
                        <td>{ticketinfo.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>}
            </div>
          </div>
        </div>
        <div className='col-lg-6 '>
          <div>
            <h3 className='text-center text-light'>{ticketinfo.name}  Details</h3>

            <div className='row border py-3 bg-info '>
              <div className='col-lg-12 text-center '><img className="profileDetails img-fluid shadow" src="./profile.png" alt="details" title={ticketinfo.name} />
              </div>
              <table className='table table-bordered p-2'>
                <tbody >
                  <tr>
                    <th>Name :</th>
                    <td>{ticketinfo.name}</td>
                  </tr>
                  <tr>
                    <th>Email:</th>
                    <td>{ticketinfo.email}</td>
                  </tr>
                  <tr>
                    <th>Mobile:</th>
                    <td>{ticketinfo.mobile}</td>
                  </tr>
                  <tr>
                    <th>Message:</th>
                    <td>{ticketinfo.message}</td>
                  </tr>

                  <tr>
                    <th>Problem Type:</th>
                    <td>{ticketinfo.problemtype}</td>
                  </tr>
                  <tr>
                    <th>Update Date :</th>
                    <td>{ticketinfo.updatedate}</td>
                  </tr>
                  <tr>
                    <th>Create Date :</th>
                    <td>{ticketinfo.createdon}</td>
                  </tr>
                  <tr>
                    <th>Assign Date :</th>
                    <td>{ticketinfo.assigndate}</td>
                  </tr>
                </tbody>
              </table>

              {/*   <div className='col-lg-12'>
                <div className="form-group my-3 position-relative">
                  <label htmlFor="textarea" className='mb-2'>Comment:</label>
                  <textarea
                    className="form-control"
                    id="textarea"
                    rows="3"
                    value={comment}
                    onChange={handleInputChange}
                    style={{ resize: "none" }}
                  />
                  <small className="text-muted position-absolute bottom-1 end-0 my-2">{comment.split(/\s/).filter(Boolean).length}/100 words</small>
                </div>

              </div> */}
              <div className='row my-2'>
                <div className='col-lg-12'>
                  <table className='table table-bordered'>
                    <tbody>
                      <tr>
                        <th>status</th>
                        <td>
                          <select className='form-select' onChange={(e) => setstatus(e.target.value)}>
                            <option>Choose</option>
                            <option value="OPEN">OPEN</option>
                            <option value="CLOSE">CLOSE</option>
                            <option value="ASSIGN">ASSIGN</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <th>comment</th>
                        <td>
                          <textarea className='form-control' onChange={(e) => setcomment(e.target.value)}></textarea>
                        </td>
                      </tr>
                    </tbody>

                  </table>
                  <div className=' text-center'>
                    <button className='btn btn-primary'
                      onClick={updateStatus.bind(this, ticketinfo.id, comment, status)}>Update</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Tickets;
