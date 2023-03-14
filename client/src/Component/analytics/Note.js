import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../App.css";
const Note = () => {
  const navigator = useNavigate();
  let i = 0;
  const [detail, setDetail] = useState([]);
  const [render,setRender] = useState(true);
  const [readTimes, setReadTimes] = useState([]);
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
  const { id } = useParams();
  const getData = async () => {
    const res = await fetch(`/getData/${id}`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.status == 404) {
      window.alert(data.message);
      navigator("/analytics");
    }
    setReadTimes(data[0].readTime);
    setDetail(data);
  };
  useEffect(()=>{
     getData()
  },[]
    )
    const deletes=async(_id)=>{
      const res = await fetch(`/deleteNoteAnalytics/${id}/${_id}`,{
          method:"delete",
          headers:{
            "Content-Type":"application/json",
          },
          body:JSON.stringify({
             _id
          })
      })
      if(res.status==200){
          getData();
      }
    }
  return (
    <div className="container">
      <div className="row rows-cols-3">
        {detail.map((elem) => {
          const { generateID, favourite, readTime, downloads, read } = elem;
          return (
            <>
              <div className="col cols">
                <h2>Id:</h2>
                <h2>{generateID}</h2>
              </div>
              <div className="col cols">
                <h2>Important: </h2>
                <h3>{favourite ? "YES" : "NO"}</h3>
              </div>
              <div className="col cols">
                <h2>Download:</h2>
                <h3>{downloads + " "}Times</h3>
              </div>
              <div className="col cols">
                <h2>Read</h2>
                <h3>{read ? `Yes(${readTime.length + " "}Times)` : "No"}</h3>
              </div>
            </>
          );
        })}
      </div>
      <div className="row">
        <div className="col cols">
          <h1>Read-Analysis</h1>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Session</th>
                <th scope="col">Time</th>
                <th scope="col">Date</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {readTimes.map((elem) => {
                i = i + 1;
                let id = elem._id;
                let Dates = new Date(elem.slot);
                let D = Dates.getDate();
                const day = Dates.getDay();
                const month = Dates.getMonth();
                const year = Dates.getFullYear();
                const date =
                  dayNames[day] + ", " + D + " " + months[month] + " " + year;
                const Time = Dates.getHours() + ":" + Dates.getMinutes();
                console.log();
                return (
                  <tr>
                    <th scope="row">{i}</th>
                    <td>{Time}</td>
                    <td>{date}</td>
                    <td>
                      <button className="btn" onClick={()=>deletes(id)}>
                      <i style={{color:"red"}} class="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Note;
