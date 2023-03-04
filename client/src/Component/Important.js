import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
const Important = () => {
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
    let Updatedata = data.filter((elem)=>{
      return (elem.favourite)
    })
    setDetails(Updatedata);
  };
  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <div className="container">
      <div className="row">
        <NavLink to="/viewnote">
          <button className="btn btn-outline-info"> <i class="fa-solid fa-arrow-left"></i> Switch To All notes</button>
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
                <button className="btn btn-danger">Remove</button>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Important;
