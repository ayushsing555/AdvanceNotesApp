import React, { useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const User = () => {
  var dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const styles = {
    float: "left",
    width: "1000px",
    "overflow-y": "auto",
    height: "350px",
  };
  const [user, setUser] = useState([]);
  const [Notedata, setdata] = useState([]);
  const [loginData, setLoginData] = useState([]);
  const [allDetails, setDetail] = useState([]);
  const { identification } = useParams();
  let i = 0,
    j = 0;
  const getData = async () => {
    const identification = localStorage.getItem("identification");
    const res = await fetch("/allusers", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application",
      },
      credentials: "include",
    });
    const Userdata = await res.json();
    const updateData = Userdata.filter((elem) => {
      return elem.identification == identification;
    });
    setLoginData(updateData[0].tokens);
    setUser(updateData);
    const resdata = await fetch("/getData", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await resdata.json();
    setdata(data);
    console.log(Notedata);
  };
  let Download = 0;
  const totalDownloads = Notedata.map((elem) => {
    Download += elem.downloads;
  });
  getData();
  return (
    <>
      <div className="container">
        <div className="row rows-cols-3">
          {user.map((elem) => {
            const { tokens, createTime, email, AllData } = elem;
            return (
              <>
                <div className="col cols">
                  <h2>Id:</h2>
                  <h3>{identification}</h3>
                </div>
                <div className="col cols">
                  <h2>TotalDownloads</h2>
                  <h3>{Download}</h3>
                </div>
                <div className="col cols">
                  <h2>Total Notes</h2>
                  <h3>{Notedata.length}</h3>
                </div>
                <div className="col cols">
                  <h2>Total Logged in</h2>
                  <h3>{tokens.length}Times</h3>
                </div>
                <div className="col cols">
                  <h2>Email</h2>
                  <h3>{email}</h3>
                </div>
              </>
            );
          })}
        </div>
        <hr />
        <div className="row rows-cols-2 overflow-auto">
          <div class="h-10 col cols overflow-auto " style={styles}>
            <b>Log in Details</b>
            <hr></hr>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Session</th>
                  <th scope="col">Time</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {loginData.map((elem) => {
                  i = i + 1;
                  let Dates = new Date(elem.time);
                  let D = Dates.getDate();
                  const day = Dates.getDay();
                  const month = Dates.getMonth();
                  const year = Dates.getFullYear();
                  const date =
                    dayNames[day] + ", " + D + " " + months[month] + " " + year;
                  const Time = Dates.getHours() + ":" + Dates.getMinutes();
                  return (
                    <tr>
                      <th scope="row">{i}</th>
                      <td>{Time}</td>
                      <td>{date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div class="col cols overflow-auto" style={styles}>
            <b>Notes Details</b>
            <hr></hr>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Session</th>
                  <th scope="col">CreateTime</th>
                  <th scope="col">Downloads</th>
                  <th scope="col">ReadTimes</th>
                  <th scope="col">Analytics</th>
                </tr>
              </thead>
              <tbody>
                {Notedata.map((elem) => {
                  j = j + 1;
                  const {
                    time,
                    createDate,
                    readTime,
                    downloads,
                    identification,
                    generateID,
                  } = elem;
                  let Dates = new Date(createDate);
                  let D = Dates.getDate();
                  const day = Dates.getDay();
                  const month = Dates.getMonth();
                  const year = Dates.getFullYear();
                  const Time = Dates.getHours() + ":" + Dates.getMinutes();
                  const date =
                    Time + ", " + D + " " + months[month] + " " + year;
                  {
                    /* console.log(time); */
                  }
                  return (
                    <tr>
                      <th scope="row">{j}</th>
                      <td>{date}</td>
                      <td>{downloads}</td>
                      <td>{readTime.length}</td>
                      <td>
                        <NavLink
                          to={`/analytics/${identification}/${generateID}`}
                        >
                          View
                        </NavLink>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
