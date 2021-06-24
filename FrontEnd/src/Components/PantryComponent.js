import React from "react";
import { useHistory } from "react-router-dom";

function PantryComponent() {
  const history = useHistory();
  // const handleRoute = () =>{
  //     history.push("/pantryItem");
  // }

  return (
    <div>
      <br />
      <div class="container card-columns text-center">
        <div class="card">
          <div class="card-header">Pantry Room 1</div>
          <div class="card-body">
            <img
              alt="1"
              src="img/PR1.jpg"
              className="img-fluid"
              style={{ height: "300px", width: "750px" }}
            />
          </div>
          <div class="card-footer">
            <button
              class="btn btn-outline-primary"
              onClick={() => {
                history.push("/pantryItem/1");
              }}
            >
              Get Details
            </button>
          </div>
        </div>
        <div class="card">
          <div class="card-header">Pantry Room 2</div>
          <div class="card-body">
            <img
              alt="1"
              src="img/PR-2.jpg"
              className="img-fluid"
              style={{ height: "300px", width: "750px" }}
            />
          </div>

          <div class="card-footer">
            <button
              class="btn btn-outline-primary"
              onClick={() => {
                history.push("/pantryItem/2");
              }}
            >
              Get Details
            </button>
          </div>
        </div>
        <div class="card">
          <div class="card-header">Pantry Room 3</div>
          <div class="card-body">
            <img
              alt="1"
              src="img/PR3.jpg"
              className="img-fluid"
              style={{ height: "300px", width: "750px" }}
            />
          </div>
          <div class="card-footer">
            <button
              class="btn btn-outline-primary"
              onClick={() => {
                history.push("/pantryItem/3");
              }}
            >
              Get Details
            </button>
          </div>
        </div>
      </div>
      <div className="text-center">
        <div
          className="tm-color-white tm-btn-white-bordered"
          onClick={() => window.location.replace("/")}
        >
          <span>Back to Book Meetings</span>
        </div>
      </div>
    </div>
  );
}

export default PantryComponent;
