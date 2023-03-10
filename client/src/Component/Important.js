import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../App.css";
const Important = () => {
  const navigator = useNavigate();
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
  const remove = async(_id)=>{
    const res = await fetch("/updateList",{
       method:"put",
       headers:{
         "Content-Type":"application/json"
       },
       body:JSON.stringify({
         _id
       })
    })
    const data = await res.json();
    if(res.status==200){
      window.alert(data.message);
      navigator("/important");
    }
     
  }
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
              <div className="cols">
                <h4>{generateID}</h4>
                <h2>{name}</h2>
                <h3>{text.length >= 15 ? `${text1}...` : `${text}`}</h3>
                <NavLink to={`/singlenote/${generateID}`}>
                  <button className="btn btn-success">Read</button>
                </NavLink>
                <button className="btn btn-danger" onClick={()=>remove(elem._id)}>Remove</button>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Important;
