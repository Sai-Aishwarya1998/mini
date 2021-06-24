import "./App.css";
import React, { useState,useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Home from "./Home";
import NavBar from "./NavBarNavBar";
import Footer from "./footer";
import CheckAvailabilityComponent from "./Components/CheckAvailabilityComponent";
import store from "./Reducers/store";
import "./Nav.css";
import AdminComponent from "./Components/AdminComponent";
import ChatBotComponent from './Components/chatBotComponent';
import ItemComponent from './Components/ItemComponent';
import axios from 'axios';
import BookingApi from './API/BookingApi';
import {mySqlServer} from './Components/Constants'
function App() {
  const [loginShow, setLoginShow] = useState(false);
  const handleLoginClose = () => setLoginShow(false);
  const handleLoginShow = () => setLoginShow(true);
  const [registerShow, setRegisterShow] = useState(false);
  const handleRegisterClose = () => setRegisterShow(false);
  const handleRegisterShow = () => setRegisterShow(true);
  useEffect(()=>{
    axios.get(mySqlServer+'/api/getbookings').then((response)=>{
      BookingApi.setBookings(response.data);
    });
  },[])  
  return (
    <div>
      <Provider store={store}>
        <ChatBotComponent/>
        <Router>
          <NavBar
            handleLoginClose={handleLoginClose}
            handleLoginShow={handleLoginShow}
            loginShow={loginShow}
            handleRegisterClose={handleRegisterClose}
            handleRegisterShow={handleRegisterShow}
            registerShow={registerShow}

          />
          <Switch>
            <Route exact path="/">
              <Home handleLoginShow={handleLoginShow} />
              <Footer />
            </Route>
            <Route path="/checkavailability">
              <CheckAvailabilityComponent />
            </Route>
            <Route path="/admindashboard">
              <AdminComponent/>
            </Route>
            <Route path="/pantryItem/:id">
              <ItemComponent/>
            </Route>
            <Route path="/login">
              <Home />
              <Footer />
            </Route>
          </Switch>
        </Router>
      </Provider>

    </div>
  );
}

export default App;
