import React, { useState, useEffect } from "react";
import PantryChart from "./PantryCharts";
import { Tabs, Tab } from "react-bootstrap";
import ChartComponent from "./ChartComponent";
import PieChartComponent from "./PieChartComponent";
import BookingApi from "../API/BookingApi";
import moment from "moment";
function AdminComponent() {
  const [fromDate, setFromDate] = useState("2021-04-01");
  const [toDate, setToDate] = useState("2021-05-30");
  const [data, setData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [pantryData, setPantryData] = useState([]);
  // set data for booking dashboard
  useEffect(() => {
    setData([
      {
        name: "HJ",
        Room1: BookingApi.getAll().filter(
          (booking) =>
            booking.Id === 1 &&
            moment(booking.Date.split("T")[0]).isBetween(fromDate, toDate)
        ).length,
        Room2: BookingApi.getAll().filter(
          (booking) =>
            booking.Id === 2 &&
            moment(booking.Date.split("T")[0]).isBetween(fromDate, toDate)
        ).length,
      },
      {
        name: "BG",
        Room1: BookingApi.getAll().filter(
          (booking) =>
            booking.Id === 3 &&
            moment(booking.Date.split("T")[0]).isBetween(fromDate, toDate)
        ).length,
        Room2: BookingApi.getAll().filter(
          (booking) =>
            booking.Id === 4 &&
            moment(booking.Date.split("T")[0]).isBetween(fromDate, toDate)
        ).length,
      },
      {
        name: "AR",
        Room1: BookingApi.getAll().filter(
          (booking) =>
            booking.Id === 5 &&
            moment(booking.Date.split("T")[0]).isBetween(fromDate, toDate)
        ).length,
        Room2: 0,
      },
      {
        name: "SEZ",
        Room1: BookingApi.getAll().filter(
          (booking) =>
            booking.Id === 6 &&
            moment(booking.Date.split("T")[0]).isBetween(fromDate, toDate)
        ).length,
        Room2: BookingApi.getAll().filter(
          (booking) =>
            booking.Id === 7 &&
            moment(booking.Date.split("T")[0]).isBetween(fromDate, toDate)
        ).length,
      },
      {
        name: "VRN",
        Room1: BookingApi.getAll().filter(
          (booking) =>
            booking.Id === 8 &&
            moment(booking.Date.split("T")[0]).isBetween(fromDate, toDate)
        ).length,
        Room2: 0,
      },
      {
        name: "WRN",
        Room1: BookingApi.getAll().filter(
          (booking) =>
            booking.Id === 9 &&
            moment(booking.Date.split("T")[0]).isBetween(fromDate, toDate)
        ).length,
        Room2: BookingApi.getAll().filter(
          (booking) =>
            booking.Id === 10 &&
            moment(booking.Date.split("T")[0]).isBetween(fromDate, toDate)
        ).length,
      },
    ]);
  }, [fromDate, toDate]);
  // set data for pantry dashboard
  useEffect(() => {
    setPantryData([
      {
        name: "Pantry 1",
        cookiesPackets: 50,
        coffeeSachets: 17,
        candy: 175,
        milkPackets: 45,
        coffeeMachine: 5,
      },
      {
        name: "Pantry 2",
        cookiesPackets: 40,
        coffeeSachets: 27,
        candy: 125,
        milkPackets: 35,
        coffeeMachine: 2,
      },
      {
        name: "Pantry 3",
        cookiesPackets: 70,
        coffeeSachets: 13,
        candy: 145,
        milkPackets: 65,
        coffeeMachine: 4,
      },
    ]);
  }, []);
  // set data for pie chart
  useEffect(() => {
    if (data.length > 0)
      setPieData([
        {
          name: "Pune",
          value:
            data[0].Room1 +
            data[0].Room2 +
            data[1].Room1 +
            data[1].Room2 +
            data[2].Room1 +
            data[2].Room2,
        },
        { name: "Banglore", value: data[3].Room1 + data[3].Room2 },
        { name: "Goa", value: data[4].Room1 + data[4].Room2 },
        { name: "Hyderabad", value: data[5].Room1 + data[5].Room2 },
      ]);
  }, [data]);

  if (!localStorage.getItem("isAdmin")) {
    return <div>Acccess Denied</div>;
  }
  return (
    <div className="tm-bg-img-02">
      <div className="center">
        <Tabs defaultActiveKey="booking" id="uncontrolled-tab-example">
          <Tab
            eventKey="booking"
            title="Room Booking Dashboard"
            className="tabs-container"
          >
            <div className=" chart-container">
              <div className="row from-to-date">
                <div className=" center">
                  <label>From:</label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(evt) => setFromDate(evt.target.value)}
                  />

                  <label>To:</label>
                  <input
                    max={moment()
                      .add(7, "days")
                      .format("YYYY-MM-DD")}
                    type="date"
                    value={toDate}
                    onChange={(evt) => setToDate(evt.target.value)}
                  />
                </div>
              </div>

              <div className="row height550">
                <div className="col-8">
                  <ChartComponent data={data}></ChartComponent>
                </div>

                <div className="col-4">
                  <PieChartComponent data={pieData} />
                </div>
              </div>
            </div>
          </Tab>

          <Tab eventKey="pantry" title="Pantry Dashboard">
            <div className=" chart-container">
              <div className="row from-to-date">
                <div className=" center"></div>
              </div>

              <div className="row height550">
                <div className="col-12">
                  <PantryChart data={pantryData}></PantryChart>
                </div>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default AdminComponent;
