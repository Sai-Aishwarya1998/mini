import React from "react";
import Dropdown from "./Components/SearchBarComponent";

import LoginApi from "./API/LoginApi";
import AdminSection from "./Components/AdminSection";

// to check if user is admin or not
const checkAdmin = () => {
  return LoginApi.getIsAdmin();
};
const Home = (props) => (
  <div>
    <div className="tm-section tm-bg-img" id="tm-section-1">
      <div className="tm-bg-white ie-container-width-fix-2">
        <div className="container ie-h-align-center-fix">
          <div className="row">
            <div className="col-xs-12 ml-auto mr-auto ie-container-width-fix">
              <Dropdown handleLoginShow={props.handleLoginShow} />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>{checkAdmin() ? <AdminSection /> : <span />}</div>
  </div>
);

export default Home;
