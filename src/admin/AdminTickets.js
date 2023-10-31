import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../LoadingSpinner';
// import ReactTooltip from 'react-tooltip/dist/index.js';
const AdminTickets = () => {
  const [alltickets, setAllTickets] = useState([]);
  const [allaccounts, setaccount] = useState([]);
  const [status, setstatus] = useState("");
  const [support, setsupport] = useState("");
  const [mystatus, setMystatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setloading] = useState(true);

  const getalltickets = async () => {
    setloading(true);
    let url = "https://cybotrix.com/webapi/api/allticket";
    let userdata = { tokenno: localStorage.getItem("tokenno"), status: mystatus };
    let postdata = {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(userdata)
    };
    await fetch(url, postdata)
      .then(response => response.json())
      .then(ticketArray => {
        setAllTickets(ticketArray);

      });
    setloading(false);
  };

  const updatestatus = (a) => {
    setMystatus(a);
    getalltickets();
  }

  const handleShowAll = () => {
    setMystatus("");
    getalltickets();
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  }

  useEffect(() => {
    getalltickets();
    allAccount();

  }, [mystatus]);

  const ticketstatus = (ticketid) => {
    let url = "https://cybotrix.com/webapi/api/changestatus";
    let userdata = {
      tokenno: localStorage.getItem("tokenno"),
      ticketid: ticketid,
      supportid: support,
      statustype: status
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

  const filteredTickets = alltickets.filter(ticketinfo => {
    return (
      (ticketinfo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticketinfo.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticketinfo.mobile.includes(searchQuery) ||
        ticketinfo.problemtype.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (mystatus === "" || ticketinfo.status === mystatus)
    );
  });

  const allAccount = () => {
    let url = "https://cybotrix.com/webapi/api/allaccount";
    let userdata = { tokenno: localStorage.getItem("tokenno") };
    let postdata = {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(userdata)
    }
    fetch(url, postdata)
      .then(response => response.json())
      .then(accountArray => {
        setaccount(accountArray);
      })
  }

  return (
    <div className='container my-5'>
      <h3 className='text-center'>All Tickets</h3>
      <div className='row'>
        <div className='row my-3'>
          <h3>Filter by Status</h3>
          <div className='col-lg-6'>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name='s1' defaultChecked onClick={handleShowAll} />
              <label className="form-check-label">Show All</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name='s1' onClick={updatestatus.bind(this, "OPEN")} />
              <label className="form-check-label">Open</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name='s1' onClick={updatestatus.bind(this, "ASSIGN")} />
              <label className="form-check-label">Assign</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name='s1' onClick={updatestatus.bind(this, "CLOSE")} />
              <label className="form-check-label">Close</label>
            </div>
          </div>
          <div className='col-lg-6'>

            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Search by Name, Email, or Mobile"
                aria-label="Recipient's username" aria-describedby="button-addon2" value={searchQuery}
                onChange={handleSearch} />
              <button class="btn btn-outline-primary" type="button" id="button-addon2"><i className='fa fa-search'></i></button>
            </div>

          </div>
          <div className='col-lg-12 mt-4'>
            {
              loading && loading ? <LoadingSpinner />:(
                <table className='table text-center bg-info table-bordered'>
                  <thead className='table-dark'>
                    <tr>
                      {/* <th>id</th> */}
                      <th>Name</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>Problem Type</th>
                      <th>Support</th>
                      <th>Status</th>
                      <th className='abc'>Current Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className='table-info'>
                    {filteredTickets.map((ticketinfo, index) => (
                      <tr key={index}>
                        {/* <td>{index}</td> */}
                        <td className='abc'>{ticketinfo.name}</td>
                        <td>{ticketinfo.email}</td>
                        <td>{ticketinfo.mobile}</td>
                        <td className='abc'>
                          <span title={ticketinfo.problemtype}>{ticketinfo.problemtype}</span>

                        </td>

                        <td>
                          <select onChange={(e) => setsupport(e.target.value)}>
                            <option>choose</option>
                            {allaccounts.map((abc, index) => (
                              <option value={abc.userid} key={index}>{abc.fullname}</option>
                            ))}
                          </select>
                        </td>
                        <td>

                          <select onChange={(e) => setstatus(e.target.value)}>
                            <option>choose</option>
                            <option value="OPEN">OPEN</option>
                            <option value="ASSIGN">ASSIGN</option>
                            <option value="CLOSE">CLOSE</option>
                          </select>
                        </td>
                        <td> {ticketinfo.status}</td>
                        <td><button className='btn btn-primary' onClick={() => ticketstatus(ticketinfo.id)}>Update</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )
            }
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTickets;
