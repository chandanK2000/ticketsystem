import React, { useState, useEffect } from 'react';
import LoadingSpinner from './../LoadingSpinner';

const SupportDashBoard = () => {
  const [supportdata, setsupportdata] = useState({});
  const [loading, setLoading] = useState(true);

  const getsupportdashshboard = () => {
    let url = "https://cybotrix.com/webapi/supportapi/mydashboard";
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
        setsupportdata(alldata);
        setLoading(false);
      })
  }

  useEffect(() => {
    getsupportdashshboard();
  }, []);

  return (
    <div className='container my-5'>
      {loading ? (
        /*  <div className="text-center">
           <div className="spinner-border text-primary" role="status">
             <span className="visually-hidden">Loading...</span>
           </div>
           <p>Loading...</p>
         </div> */
        <LoadingSpinner />
      ) : (
        <div className='row'>
          <div className='col-lg-3 col-md-4 col-sm-4 col-12'>
            <div className='card shadow-sm my-2 cards'>
              <div className='card-body text-center'>
                <i className="fas fa-ticket fa-2x"></i>

                  <h4 className='my-2'>All Tickets</h4>
                <span className='badges'> {supportdata.allticket}</span>
              </div>
            </div>
          </div>
          <div className='col-lg-3 col-md-4 col-sm-4 col-12'>
              <div className='card  my-2 cards'>
              <div className='card-body text-center'>
                <i className="bi bi-folder2-open fa-2x"></i>
                <h4 className='my-2'>Total Open</h4>

                <span className='badges'> {supportdata.totalopen}</span>

              </div>
            </div>
          </div>
          <div className='col-lg-3 col-md-4 col-sm-4 col-12'>
              <div className='card shadow-sm my-2 cards'>
              <div className='card-body text-center'>
                <i className="bi bi-x-circle-fill fa-2x"></i>
                  <h4 className='my-2'>Total close</h4>

                <span className='badges'>{supportdata.totalclose}</span>

              </div>
            </div>
          </div>
          <div className='col-lg-3 col-md-4 col-sm-4 col-12'>
              <div className='card shadow-sm my-2 cards'>
              <div className='card-body text-center'>
                <i className="fas fa-user-plus fa-2x"></i>
                <h4 className='my-2'>Total Assign</h4>

                <span className='badges'>  {supportdata.totalassign} </span>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SupportDashBoard;
