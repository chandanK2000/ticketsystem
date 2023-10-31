import React from 'react'
import { HashRouter, Routes, Route } from "react-router-dom";
import Header from './Header';
import Tickets from './Tickets';
import SupportDashBoard from "./Dashboard";
const Sdapp = () => {
  return (
    <HashRouter>
      < Header/>
      <Routes>
        <Route path='/' element={<SupportDashBoard />}/>
        <Route path='/tickets' element={<Tickets />} />

      </Routes>
    </HashRouter>  )
}

export default Sdapp;