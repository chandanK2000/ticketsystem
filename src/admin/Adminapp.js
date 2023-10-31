import React from 'react'
import {HashRouter,Routes,Route} from "react-router-dom";
import AdminDashboard from './AdminDashboard';
import AdminTickets from './AdminTickets';
import AdminAccount from "./AdminAccount"
import AdminHeader from './AdminHeader';
import NewAccount from './NewAccount';
const Adminapp = () => {
  return (
    <HashRouter>
      <AdminHeader/>
       <Routes>
        <Route path='/' element={<AdminDashboard />} />
        <Route path='/alltickets' element={<AdminTickets />} />
        <Route path='/adminaccount' element={<AdminAccount />} />
        <Route path='/newaccount' element={<NewAccount />} />
       
        
       </Routes>
    </HashRouter>
  )
}

export default Adminapp;