// import Overview from "./Components/Overview";
// import React, { useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";


// import "./App.css";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";

// import Login from "./Components/login";
// import SignUp from "./Components/register";

// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Profile from "./Components/profile";
// import { useState } from "react";
// import { auth } from "./Components/firebase";


// function App() {
//   // const [city, setCity] = useState("");
//   // const [coords, setCoords] = useState({ lat: 51.505, lon: -0.09 }); // Default to London
//   // const [cityName, setCityName] = useState("");
//   const [user, setUser] = useState();

//   useEffect(() => {
//     auth.onAuthStateChanged((user) => {
//       setUser(user);
//     });
//   }, []); // Empty dependency array to run only once on component mount

//   // const handleSearch = async () => {
//   //   const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your OpenWeatherMap API key
//   //   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

//   //   try {
//   //     const response = await axios.get(url);
//   //     const { lat, lon } = response.data.coord;
//   //     setCoords({ lat, lon });
//   //     setCityName(response.data.name);
//   //   } catch (error) {
//   //     console.error("Error fetching the weather data", error);
//   //   }
//   // };

//   return (
//     <Router>
//       <div className="App">
//         <div className="auth-wrapper">
//           <div className="auth-inner">
//             <Routes>
//               <Route
//                 path="/"
//                 element={user ? <Navigate to="/profile" /> : <Login />}
//               />
//               <Route path="/login" element={<Login />} />
//               <Route path="/register" element={<SignUp />} />
//               <Route path="/profile" element={<Profile />} />
//             </Routes>
//             <ToastContainer />
//             <Overview />
//             {/* <input
//               type="text"
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//               placeholder="Enter city name"
//             />
//             <button onClick={handleSearch}>Search</button>
//             <div style={{ height: "500px", width: "100%" }}>
//               <MapComponent lat={coords.lat} lon={coords.lon} city={cityName} />
//             </div> */}
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;



import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./Components/firebase";
import Login from "./Components/login";
import SignUp from "./Components/register";
import Profile from "./Components/profile";

import "./App.css";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []); // Empty dependency array to run only once on component mount`

  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route path="/" element={user ? <Navigate to="/profile" /> : <Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
            <ToastContainer />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;