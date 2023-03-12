import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Analytics = () => {
  const identification = localStorage.getItem("identification");
  const [input, setInput] = useState();
  return (
    <>
      <div className="container">
        <div className="row rows-cols-2">
          <div className="col">
            <NavLink to={`/analytics/${identification}`}>
              <button className="btn btn-outline-info">
                Analytics <i class="fa-solid fa-chart-line"></i>
              </button>
            </NavLink>
          </div>
          <div className="col">
            <form className="form-inline my-2 my-lg-0 mr-3">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search by Id"
                aria-label="Search"
                onChange={(e) => setInput(e.target.value)}
              />
              <button className="btn btn-outline-info">
                <NavLink to={`/analytics/${identification}/${input}`}>
                  Anlytics
                </NavLink>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
