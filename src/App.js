import React, { useEffect, useState } from 'react';
import Adminapp from './admin/Adminapp';
import Sdapp from './sd/Sdapp';
import './App.css';
function App() {
  const userType = localStorage.getItem("type");
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    function onlineHandler() {
      setIsOnline(true);
    }

    function offlineHandler() {
      setIsOnline(false);
    }

    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", offlineHandler);


    return () => {
      window.removeEventListener("online", onlineHandler);
      window.removeEventListener("offline", offlineHandler);
    };
  }, [])
  return (
    <div>
      {isOnline ? (
        <div className="App">


          {userType === "ADMIN" ? (
            <Adminapp />
          ) : (
            <Sdapp />
          )
          }
        </div>
      ) : (
        <div className='network'>
          <div>
            <img src="./nointernet.jpg" height="100px" width="100px" alt="nointernet"/>
          </div>
          <h3>No internet</h3>
          <ul>
              <li>Checking the network cables, modem, and router</li>
              <li>Reconnecting to Wi - Fi</li>
              <li>Running Windows Network Diagnostics</li>
          </ul>
            <p>ERR_INTERNET_DISCONNECTED</p>

        </div>
      )}
    </div>
  );
}



export default App;
