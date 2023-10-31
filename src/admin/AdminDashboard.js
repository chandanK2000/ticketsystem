import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [allticket, setallticket] = useState("");
  const [totalopen, settotalopen] = useState("");
  const [totalclose, settotalclose] = useState("");
  const [totalassign, settotalassign] = useState("");
  const [totalaccount, settotalaccount] = useState("");
  const [loading, setLoading] = useState(true);

  const getadmindashboard = () => {
    setLoading(true);

    let url = "https://cybotrix.com/webapi/api/dashboard";
    let userdata = { tokenno: localStorage.getItem("tokenno") };
    let postdata = {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(userdata)
    }

    fetch(url, postdata)
      .then(response => response.json())
      .then(alldata => {
        console.log(alldata);

        setallticket(alldata.allticket);
        settotalopen(alldata.totalopen);
        settotalclose(alldata.totalclose);
        settotalassign(alldata.totalassign);
        settotalaccount(alldata.allaccount);
      })
      .catch(error => console.error('Error fetching admin dashboard:', error))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    getadmindashboard();
  }, []);

  return (
    <div className='container my-5'>
      <div className='row'>
        <div className='col-lg-3 col-md-4 col-sm-4 col-12'>
          <div className='card my-2 cards'>
            <div className='card-body text-center'>
              <i class="fas fa-ticket fa-2x "></i>

              <h4>All Tickets</h4>
              {loading ?<div className="loading-text">Loading...</div>  :  <span className="badges">{allticket}</span>}
            </div>
          </div>
        </div>
        <div className='col-lg-3 col-md-4 col-sm-4 col-12'>
          <div className='card cards my-2'>
            <div className='card-body text-center'>
              <i class="bi bi-folder2-open fa-2x "></i>
              <h4>Total Open</h4>
              {loading ?<div className="loading-text">Loading...</div>  :  <span className="badges">{totalopen}</span>}
            </div>
          </div>
        </div>
        <div className='col-lg-3 col-md-4 col-sm-4 col-12'>
          <div className='card cards my-2'>
            <div className='card-body text-center'>
              <i className="bi bi-x-circle-fill fa-2x "></i>

              <h4>Total close</h4>
              {loading ? <div className="loading-text">Loading...</div> : <span className="badges">{totalclose}</span>}
            </div>
          </div>
        </div>
        <div className='col-lg-3 col-md-4 col-sm-4 col-12'>
          <div className='card cards my-2'>
            <div className='card-body text-center'>
              <i class="fas fa-user-plus fa-2x "></i>
              <h4>Total Assign</h4>
              {loading ? <div className="loading-text">Loading...</div> : <span className="badges">{totalassign}</span>}
            </div>
          </div>
        </div>
        <div className='col-lg-3 col-md-4 col-sm-4 col-12'>
          <div className='card cards my-2'>
            <div className='card-body text-center'>
              <i class="fas fa-users fa-2x "></i>
              <h4>Total Account</h4>
              {loading ? <div className="loading-text">Loading...</div> : <span className="badges">{totalaccount}</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard;
