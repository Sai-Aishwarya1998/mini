import React from "react";
import { Link } from "react-router-dom";
import LoginApi from "../API/LoginApi";
import Axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { mySqlServer } from "./Constants";

class SearchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      campuses: [],
      rooms: [],
      selectedCity: "--Choose City--",
      selectedCampus: "--Choose Campus--",
      selectedRoom: "",
      selectedDate: "",
      selectedStartTime: "",
      selectedEndTime: "",
    };
    this.changeCity = this.changeCity.bind(this);
    this.changeCampus = this.changeCampus.bind(this);
    this.storeRoomData = this.storeRoomData.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  // setting roomData in states
  componentDidMount() {
    this.setState({
      cities: [
        { name: "--Choose City--", campuses: [{ name: "", rooms: ["", ""] }] },
        {
          name: "Pune",
          campuses: [
            { name: "HJ", rooms: ["A1", "A2"] },
            { name: "BG", rooms: ["B1", "B2"] },
            { name: "AR", rooms: ["A1"] },
          ],
        },
        {
          name: "Banaglore",
          campuses: [{ name: "SEZ", rooms: ["S01", "S02"] }],
        },
        { name: "Goa", campuses: [{ name: "VRN", rooms: ["V01"] }] },
        {
          name: "Hyderabad",
          campuses: [{ name: "WVR", rooms: ["W01", "W02"] }],
        },
      ],
    });
  }
  
  // add new city to state 
  changeCity(event) {
    this.setState({ selectedCity: event.target.value });
    this.setState({
      campuses: this.state.cities.find(
        (city) => city.name === event.target.value
      ).campuses,
    });
  }
  // add new campus to state 
  changeCampus(event) {
    this.setState({ selectedCampus: event.target.value });
    const stats = this.state.cities.find(
      (city) => city.name === this.state.selectedCity
    ).campuses;
    this.setState({
      rooms: stats.find((stat) => stat.name === event.target.value).rooms,
    });
  }
  
  // check if the user is logged in or not
  checkLogin() {
    return LoginApi.getLoginToken();
  }

  changeHandler(evt) {
    switch (evt.target.name) {
      case "date":
        this.setState({ ...this.state, selectedDate: evt.target.value });
        break;
      case "start-time":
        this.setState({ ...this.state, selectedStartTime: evt.target.value });
        break;
      case "end-time":
        this.setState({ ...this.state, selectedEndTime: evt.target.value });
        break;
      case "room":
        this.setState({ ...this.state, selectedRoom: evt.target.value });
        break;
      default:
        this.setState(this.state);
    }
  }

// to store room data in local storage
  storeRoomData() {
    localStorage.setItem(
      "room-data",
      JSON.stringify({
        city: this.state.selectedCity,
        campus: this.state.selectedCampus,
        room: this.state.selectedRoom,
        date: this.state.selectedDate,
        startTime: this.state.selectedStartTime,
        endTime: this.state.selectedEndTime,
      })
    );

    if (
      this.state.selectedCity === "--Choose City--" ||
      this.state.selectedDate === "" ||
      this.state.selectedStartTime === "" ||
      this.state.selectedEndTime === ""
    ) {
      toast.error("Enter all the details");
    } else if (this.state.selectedStartTime > this.state.selectedEndTime) {
      toast.error("Enter valid time details");
    } else {
    // call for the api which checks availability
      Axios.post(mySqlServer + "/api/checkav", {
        city: this.state.selectedCity,
        campus: this.state.selectedCampus,
        rooms: this.state.selectedRoom,
        Intime: this.state.selectedStartTime,
        Outtime: this.state.selectedEndTime,
        date: this.state.selectedDate,
      }).then((response) => {
        this.setState({
          Response: response.data.message,
        });
        if (response.data.message === "Not Found") {
          window.location = "/checkavailability";
        } else {
          toast.error(
            "Sorry!!!! This slot is already booked..Re-Enter Slot details "
          );
        }
      });
    }
  }

  render() {
    return (
      <form action="" class="tm-search-form tm-section-pad-2">
        <div className="form-row tm-search-form-row">
          <div className="form-group tm-form-element tm-form-element-100">
            <select
              placeholder="City"
              value={this.state.selectedCity}
              onChange={this.changeCity}
              style={{ height: 50 }}
              className="form-control"
            >
              {this.state.cities.map((e, key) => {
                return <option key={key}>{e.name}</option>;
              })}
            </select>
            <i className="fa fa-map-marker fa-2x tm-form-element-icon"></i>
          </div>
          <div className="form-group tm-form-element tm-form-element-100">
            <i className="fa fa-building fa-2x tm-form-element-icon"></i>

            <select
              placeholder="Campus"
              value={this.state.selectedCampus}
              onChange={this.changeCampus}
              style={{ height: 50 }}
              className="form-control"
            >
              <option>--Choose Campus--</option>
              {this.state.campuses.map((e, key) => {
                return <option key={key}>{e.name}</option>;
              })}
            </select>
          </div>
          <div className="form-group tm-form-element tm-form-element-100">
            <select
              name="room"
              placeholder="Room"
              style={{ height: 50 }}
              className="form-control"
              value={this.state.selectedRoom}
              onChange={this.changeHandler}
            >
              <option>--Choose Room--</option>
              {this.state.rooms.map((e, key) => {
                return <option key={key}>{e}</option>;
              })}
            </select>
            <i className="fa fa-2x fa-meetup tm-form-element-icon"></i>
          </div>
        </div>
        <div className="form-row tm-search-form-row">
          <div className="form-group tm-form-element tm-form-element-50">
            <i className="fa fa-calendar fa-2x tm-form-element-icon"></i>
            <input
              min={new Date().toISOString().split("T")[0]}
              name="date"
              type="date"
              style={{ height: 50 }}
              value={this.state.selectedDate}
              onChange={this.changeHandler}
              className="form-control"
              id="inputCheckInDate"
              placeholder="Check In date"
            />
          </div>
          <div className="form-group tm-form-element tm-form-element-50">
            <i className="fa fa-clock-o fa-2x tm-form-element-icon"></i>

            <input
              min={new Date().toISOString().split("T")[1]}
              name="start-time"
              type="time"
              style={{ height: 50 }}
              value={this.state.selectedStartTime}
              onChange={this.changeHandler}
              className="form-control"
              id="input_starttime"
              placeholder="Check in time"
            />
          </div>
          <div className="form-group tm-form-element tm-form-element-50">
            <i className="fa fa-clock-o fa-2x tm-form-element-icon"></i>
            <input
              name="end-time"
              type="time"
              style={{ height: 50 }}
              value={this.state.selectedEndTime}
              onChange={this.changeHandler}
              className="form-control"
              id="inputCheckOutTime"
              placeholder="Check Out time"
            />
          </div>
          <div className="form-group tm-form-element tm-form-element-100">
            {this.checkLogin() ? (
              <Link to="/">
                <button
                  style={{ height: 50 }}
                  className="btn btn-primary tm-btn-search"
                  onClick={this.storeRoomData}
                >
                  Check Availability
                </button>
              </Link>
            ) : (
              <Link to="/">
                <button
                  style={{ height: 50 }}
                  className="btn btn-primary tm-btn-search"
                  onClick={this.props.handleLoginShow}
                >
                  Check Availability
                </button>
              </Link>
            )}
          </div>
        </div>
      </form>
    );
  }
}

export default SearchComponent;
