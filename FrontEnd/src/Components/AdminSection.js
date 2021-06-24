import React from "react";

import PantryComponent from "./PantryComponent";
const AdminSection = () => (
  <div>
    <div style={{ paddingTop: "5px" }} className="tm-section-2">
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <a href="#test" className="tm-color-white tm-btn-white-bordered">
              Check Out the Pantry section
            </a>
          </div>
        </div>
      </div>

      <div id="test" className="height550">
        <PantryComponent />
      </div>
    </div>
  </div>
);

export default AdminSection;
