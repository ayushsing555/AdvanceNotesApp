import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "../App.css";
const Updatenote = () => {
  const navigator = useNavigate();
  const [name, setName] = useState();
  const [text, setText] = useState();
  const [_id,setId] = useState();
  const handleInput = () => {};
  //   const handleSubmit = () => {};
  const { id } = useParams();
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
    setName(updateData[0].name);
    setId(updateData[0]._id);
    setText(updateData[0].text);
  };
  useEffect(() => {
    getData();
  }, []);
  const changes = async (e) => {
    e.preventDefault();
    const res = await fetch("/updateData", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
       body:JSON.stringify({
          name,text,_id
       })
    });
    const data = await res.json();
    if(res.status==200){
        window.alert(data.message);
        navigator(`/singlenote/${id}`);
    }
  };
  return (
    <>
      <div
        class="modal fade show"
        style={{ display: "block" }}
        id="myModal"
        role="dialog"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body mt-4">
              <form id="contact-form" role="form">
                <div class="controls">
                  <div class="row">
                    <div class="col-md-12">
                      <form mathod="put">
                        <div class="form-group">
                          <label for="form_name">Title *</label>
                          <input
                            id="form_name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            width="200px"
                            type="text"
                            class="form-control"
                            placeholder="Please enter your firstname *"
                            required="required"
                            data-error="Firstname is required."
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-20">
                      <div class="form-group">
                        <label for="form_name">Text *</label>
                        <textarea
                          id="form_name"
                          name="text"
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                          type="text"
                          cols="60"
                          rows="5"
                          class="form-control"
                          placeholder="Please enter your firstname *"
                          required="required"
                          data-error="Firstname is required."
                        />
                      </div>
                    </div>
                  </div>
                  <div></div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <NavLink to={`/singlenote/${id}`}>
                <button type="button" onClick={changes} class="btn btn-info">
                  Save Changes
                </button>
              </NavLink>
              <NavLink to="/important">
                <button type="button" className="btn btn-outline-info">
                  Cancel
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Updatenote;
