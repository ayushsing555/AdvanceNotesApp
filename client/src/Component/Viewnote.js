import React, { useEffect, useState } from "react";
import { json, NavLink, useNavigate } from "react-router-dom";
import JsFileDownloader from 'js-file-downloader';
import axios from "axios";
import "../App.css";
const Viewnote = () => {
  const navigator = useNavigate();
  const trat = 0;
  const [detail, setDetails] = useState([]);
  const [search, setSearch] = useState([]);
  const [id, setId] = useState([]);
  const [allDetails, setAllDetails] = useState([]);
  const [status,setStatus] = useState(true);
  const [downloadData,setDownload] = useState();
  // console.log(search);
  // console.log(id);
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
    if(res.status==404){
      window.alert(data.message);
      navigator("/signin");
    }
    setDetails(data);
    setAllDetails(data);
  };
  const filterData = async (e) => {
    let Searchdata = allDetails.filter((elem) => {
      // console.log(elem.name);
      // console.log(search);
      let  elem_name = elem.name.toUpperCase();
      let search_title = search.toUpperCase();
      console.log(search_title);
      if (elem_name.indexOf(search_title) != -1) return elem;
    });
    console.log(Searchdata);
    setDetails(Searchdata);
  };
  const filterDataId = async (e) => {
    let Searchdata = allDetails.filter((elem) => {
      if (elem.generateID.indexOf(id) == 0) return elem;
    });
    setDetails(Searchdata);
  };
  const favourites =async(generateID,identification)=>{
    console.log(generateID);
    console.log(identification)
    const res = await fetch("/addFavorite",{
         method:"post",
         headers:{
            "Content-Type":"application/json"
         },
         body:JSON.stringify({
            generateID,identification
         })
    })
    const data = await res.json();
    if(res.status==200){
        window.alert(data.message);
        navigator(`/singlenote/${generateID}`);
    }
  }
  useEffect(() => {
    filterDataId();
  }, [id]);
  useEffect(() => {
    filterData();
  }, [search]);
  useEffect(() => {
    getData();
  }, []);
  const update = (id) => {
    navigator(`/updatenote/${id}`);
  };
  const reads=async(_id)=>{
    console.log(_id);
    const res = await fetch("/read",{
        method:"put",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
             _id
        })
    })
  }
  const deletes = async (_id) => {
    const res = await fetch("/deleteData", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
      }),
    });
    const data = await res.json();
    if (res.status == 200) {
      window.alert(data.message);
      getData();
    }
  };
  const download =async(_id)=>{
      let data = allDetails.filter((elem)=>{
          return (elem._id==_id)
      })
      const element = document.createElement("a");
      const file = new Blob(["id =  "+data[0].generateID+"\n"+"name =  "+data[0].name+"\n"+" text= "+data[0].text],
       {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `${data[0].generateID}.txt`;
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
      const res = await fetch("/updateDownload",{
          method:"put",
          headers:{
             "Content-Type":"application/json"
          },
          body:JSON.stringify({
             _id
          })
      })
  }
  return (
    <div className="container">
      <div className="row rows-cols-3">
        <div className="col">
          <NavLink to="/important">
            <button className="btn btn-outline-info">
              Switch To Importants <i className="fa-solid fa-arrow-right"></i>
            </button>
          </NavLink>
        </div>
        <div className="col">
          <form className="form-inline my-2 my-lg-0 mr-3">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search by title"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </div>
        <div className="col">
          <form className="form-inline my-2 my-lg-0 mr-3">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search by Id"
              aria-label="Search"
              onChange={(e) => setId(e.target.value)}
            />
          </form>
        </div>
        <hr />
      </div>
      <div className="row row-cols-5">
        {detail.map((elem) => {
          const { name, text, generateID ,favourite,identification,read,downloads} = elem;
          let text1 = text.substring(0, 15);
          return (
            <>
              <div className="col cols" key={elem._id}>
              {
                 favourite?<h4 style={{color:"red"}} >{generateID}<i style={{color:"yellow"}} className="fa-solid fa-star"></i></h4>:<h4 >{generateID}</h4>
              }
                
                <h2>{name+" "}{ read? <i style={{color:"black"}} className="fa-regular fa-circle-check"></i>:""}</h2>
                <h3>{text.length >= 15 ? `${text1}...` : `${text}`}</h3>
                <NavLink to={`/singlenote/${generateID}`}>
                  <button className="btn btn-success" onClick={()=>reads(elem._id)}>Read</button>
                </NavLink>
                <button
                  className="btn btn-danger"
                  onClick={() => deletes(elem._id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => update(generateID)}
                >
                  Update
                </button>
                {
                   !favourite?<button
                  className="btn btn-outline-warning"
                  onClick={() => favourites(generateID,identification)}
                >
                   <i className="fa-regular fa-star"></i> 
                </button>:""
                }
                <button className="btn btn-outline-secondary" onClick={()=>download(elem._id)}>
                    
                       {downloads+" "}<i className="fa-solid fa-down-long"></i>
                    
                </button>
                <button className="btn btn-outline-info">
                  Analytics   <i class="fa-solid fa-chart-pie"></i>
                </button>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Viewnote;
