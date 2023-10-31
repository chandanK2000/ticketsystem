import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../LoadingSpinner';

const AdminAccount = () => {
  const [allaccounts, setAccount] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [accountsPerPage] = useState(7); // Changed to 7 items per page

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
        setAccount(accountArray);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }

  useEffect(() => {
    allAccount();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  }

  const filteredAccounts = allaccounts.filter(accountinfo => {
    const query = searchQuery.toLowerCase();

    const isFullNameMatch = accountinfo.fullname && accountinfo.fullname.toLowerCase().includes(query);
    const isEmailMatch = accountinfo.email && accountinfo.email.toLowerCase().includes(query);
    const isMobileMatch = accountinfo.mobile && accountinfo.mobile.includes(query);

    return isFullNameMatch || isEmailMatch || isMobileMatch;
  });

  const indexOfLastAccount = currentPage * accountsPerPage;
  const indexOfFirstAccount = indexOfLastAccount - accountsPerPage;
  const currentAccounts = filteredAccounts.slice(indexOfFirstAccount, indexOfLastAccount);

  const pageNumbers = Math.ceil(filteredAccounts.length / accountsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='container my-5 text-center'>
      <h3 className='text-center text-primary'>All Accounts</h3>
      <div className='row my-3'>
        <div className='col-lg-3'></div>
        <div className='col-lg-6'>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Name, Email, or Mobile"
              aria-label="Search by Name, Email, or Mobile"
              aria-describedby="button-addon2"
              value={searchQuery}
              onChange={handleSearch}
            />
            <button class="btn btn-outline-primary" type="button" id="button-addon2"><i className='fa fa-search'></i></button>
          </div>
        </div>
        <div className='col-lg-3'></div>
      </div>
      <div className='row'>
        <div className='col-lg-12'>
          {loading ? (
         /*    <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p>Loading...</p>
            </div> */
            <LoadingSpinner/>
          ) : (
            <div>
              {currentAccounts.length > 0 ? (
                <table className='table text-center table-bordered'>
                  <thead className='bg-dark'>
                    <tr>
                      <th>User id</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>Password</th>
                      <th>City</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody className='bg-info'>
                    {currentAccounts.map((accountinfo, index) => (
                      <tr key={index}>
                        <td>{index}</td>
                        <td>{accountinfo.fullname}</td>
                        <td>{accountinfo.email}</td>
                        <td>{accountinfo.mobile}</td>
                        <td>{accountinfo.password}</td>
                        <td>{accountinfo.city}</td>
                        <td>{accountinfo.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center"><i className="fa fa-search"></i> data not found</p>
              )}
              <div className="d-flex justify-content-center my-4">
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                      <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                    </li>
                    {Array.from({ length: pageNumbers }, (_, i) => i + 1).map(number => (
                      <li key={number} className={`page-item ${currentPage === number && 'active'}`}>
                        <button className="page-link" onClick={() => handlePageChange(number)}>{number}</button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === pageNumbers && 'disabled'}`}>
                      <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminAccount;
