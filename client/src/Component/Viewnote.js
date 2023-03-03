import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
const Viewnote = () => {
  const [detail, setDetails] = useState([]);
  const getData = async () => {
    const res = await fetch("/getData", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    setDetails(data);
    console.log(detail);
  };
  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <div className="container">
      <div className="row">
        <NavLink to="/important">
          <button className="btn btn-info">Favourites</button>
        </NavLink>
      </div>
      <div className="row row-cols-4">
        {detail.map((elem) => {
          const { name, text, generateID } = elem;
          let text1 = text.substring(0, 15);
          return (
            <>
              <div className="col">
                <h4>{generateID}</h4>
                <h2>{name}</h2>
                <h3>{text.length >= 15 ? `${text1}...` : `${text}`}</h3>
                <NavLink to={`/singlenote/${generateID}`}>
                  <button className="btn btn-success">Read</button>
                </NavLink>
                <button className="btn btn-primary">Delete</button>
                <button className="btn btn-danger">Update</button>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Viewnote;
