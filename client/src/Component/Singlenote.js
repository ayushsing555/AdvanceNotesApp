import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
const Singlenote = () => {
  const navigator = useNavigate();
  const { id } = useParams();
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
    let data = await res.json();
    let updateData = data.filter((elem) => {
      if (elem.generateID == id) return elem;
    });
    setDetails(updateData);
  }
  useEffect(() => {
    getData();
  }, []);
  const favourites = async (e) => {
    e.preventDefault();
    let generateID = detail[0].generateID;
    let identification = detail[0].identification;
    console.log(generateID);
    const res = await fetch("/addFavorite", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        generateID,
        identification,
      }),
    });
    const data = await res.json();
    if (res.status == 200) {
      window.alert(data.message);
      navigator(`/singlenote/${generateID}`);
    }
  };
  return (
    <form>
      <div className="container">
        <div className="row row-cols-1">
          {detail.map((elem) => {
            const { name, text, generateID, favourite } = elem;
            return (
              <>
                <div className="cols item">
                  <h4>{generateID}</h4>
                  <h2>{name}</h2>
                  <h3>{text}</h3>

                  <NavLink to="/viewnote">
                    <button className="btn btn-success">Switch To Notes</button>
                  </NavLink>
                  {!favourite ? (
                    <button className="btn btn-primary" onClick={favourites}>
                      Add To Favourite
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </form>
  );
};

export default Singlenote;
