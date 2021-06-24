import Axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { mySqlServer } from "./Constants";
function CheckAvailabilityComponent(props) {
  const [roomData, setRoomData] = useState("");
  const [recipients, setRecipients] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  // close modal
  const handleClose = () => {
    setShow(false);
    setButtonDisabled(true);
  };
  const handleShow = () => setShow(true);
  const [buttonDisabled, setButtonDisabled] = useState(false);
   // to get roomData from localstorage 
  useEffect(() => {
    setRoomData(JSON.parse(localStorage.getItem("room-data")));
  }, []);

  // set messsage for sending email  
  useEffect(() => {
    if (roomData)
      setMessage(
        "Hi all,\nYou have been invited for a meeting from " +
          roomData.startTime +
          " hrs to " +
          roomData.endTime +
          " hrs, on " +
          roomData.date +
          ".\nVenue: " +
          roomData.room +
          "-" +
          roomData.campus +
          ", " +
          roomData.city
      );
  }, [subject, roomData]);

  const changeHandler = (evt) => {
    switch (evt.target.name) {
      case "recipients":
        setRecipients(evt.target.value);
        break;
      case "subject":
        setSubject(evt.target.value);
        break;
      case "message":
        setMessage(evt.target.value);
        break;
      default:
        setMessage("");
        setRecipients("");
        setSubject("");
    }
  };

  // function for calling apis of booking and email 
  const booking = () => {
    if (recipients === "" || subject === "") {
      toast.error("Enter all the details");
    } else {
      Axios.post(mySqlServer + "/api/create", {
        city: roomData.city,
        campus: roomData.campus,
        hallName: roomData.room,
        date: roomData.date,
        Intime: roomData.startTime,
        Outtime: roomData.endTime,
      }).then((response) => {
        if (response.data.message === "Record added") {
          //window.location = "/";
          console.log(response);
          handleShow();
        }
      });
      Axios.post(mySqlServer + "/api/access", {
        from: "backendteam123456@gmail.com",
        to: recipients,
        subject: subject,
        text: message,
      }).then((response) => {
        if (response.data.message === "Record added") {
          //window.location = "/";
          console.log(response);
          handleShow();
        }
      });
    }
  };

  return (
    <div className="tm-bg-img-02">
      <div className="checkavailability-container">
        <div className="checkavailability-info-container form-horizontal">
          <div className="row">
            <div className="col-7">
              <div className="row checkavailability-info">
                <img src="img/tn-img-03.jpg" alt="rooms"></img>
              </div>
              <div className="row checkavailability-info form-group">
                <label class="control-label col-sm-5">Room:</label>
                <div class="col-sm-7">
                  <input class="form-control" value={roomData.room} disabled />
                </div>
              </div>
              <div className="row checkavailability-info form-group">
                <label class="control-label col-sm-5">Campus:</label>
                <div class="col-sm-7">
                  <input
                    class="form-control"
                    value={roomData.campus}
                    disabled
                  />
                </div>
              </div>
              <div className="row checkavailability-info form-group">
                <label class="control-label col-sm-5">City:</label>
                <div class="col-sm-7">
                  <input class="form-control" value={roomData.city} disabled />
                </div>
              </div>
              <div className="row checkavailability-info form-group">
                <label class="control-label col-sm-5">Date:</label>
                <div class="col-sm-7">
                  <input class="form-control" value={roomData.date} disabled />
                </div>
              </div>
              <div className="row checkavailability-info form-group">
                <label class="control-label col-sm-5">Time:</label>
                <div class="col-sm-7">
                  <input
                    class="form-control"
                    value={roomData.startTime + " To " + roomData.endTime}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="col-5 checkavailability-right-info">
              <label class="control-label">Recipients:</label>
              <div class="rightinfo-container">
                <textarea
                  class="form-control"
                  rows="2"
                  name="recipients"
                  value={recipients}
                  onChange={changeHandler}
                  placeholder="Recipient's Email IDs should be seperated by Comma (,)"
                />
              </div>
              <label class="control-label">Subject:</label>
              <div class="rightinfo-container">
                <input
                  class="form-control"
                  name="subject"
                  value={subject}
                  onChange={changeHandler}
                />
              </div>
              <label class="control-label">Message:</label>
              <div class="rightinfo-container">
                <textarea
                  class="form-control"
                  rows="8"
                  name="message"
                  value={message}
                  onChange={changeHandler}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="confirm-btn-container">
              <Button
                disabled={buttonDisabled}
                onClick={booking}
                variant="success"
              >
                Confirm Booking
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Booking Successful !!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your meeting has been Booked from {roomData.startTime} hrs to{" "}
          {roomData.endTime} hrs on {roomData.date}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Link to="/">
            <Button variant="primary" onClick={handleClose}>
              Okay
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
      <ToastContainer
        pauseOnHover={false}
        newestOnTop
        pauseOnFocusLoss={false}
      />
    </div>
  );
}

export default CheckAvailabilityComponent;
