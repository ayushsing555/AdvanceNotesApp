import React, { useState } from 'react'

const Addnote = () => {
    const [details,setDetails] = useState({
        name:"",
        text:""
    });
    const handleInput = (e)=>{
        let name = e.target.name;
        let value = e.target.value;
        setDetails({...details,[name]:value});
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const {name,text} = details;
            const res = await fetch("/addData",{
                method:"post",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    name,text
                })
            })
            const data = await res.json();
            if(res.status==404)
                window.alert(data.error);
            if(res.status==200){
                window.alert("added data");
                setDetails({name:"",text:""});
            }
        } catch (error) {
            window.alert(error);
        }
    }

    return (
        <>
          <center>
            <button type="button" class="btn btn-outline-primary mt-3 p-3 " data-toggle="modal" data-target="#exampleModalCenter">
                Add Card <i class="fa-solid fa-arrow-up"></i>
            </button>
          </center>
            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container">
                                <div class=" text-center mt-2  ">
                                    <h1 >Add Note</h1>
                                </div>
                                <div class="row ">
                                    <div class="col-lg-9 mx-auto">
                                        <div class="card mt-1  bg-light">
                                            <div class="card-body bg-light">
                                                <div class="container">
                                                    <form id="contact-form" role="form">
                                                        <div class="controls">
                                                            <div class="row">
                                                                <div class="col-md-12">
                                                                    <div class="form-group">
                                                                        <label for="form_name">Title *</label>
                                                                        <input id="form_name"name="name" value={details.name} onChange={handleInput} width="200px"  type="text"  class="form-control" placeholder="Please enter your firstname *" required="required" data-error="Firstname is required."/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-md-20">
                                                                    <div class="form-group">
                                                                        <label for="form_name">Text *</label>
                                                                        <textarea id="form_name"name="text" value={details.text} onChange={handleInput} type="text"  cols="60" rows="5" class="form-control" placeholder="Please enter your firstname *" required="required" data-error="Firstname is required."/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div class="col-md-12">
                                                                    <button type="submit" onClick={handleSubmit} class="btn btn-success btn-send  pt-2 btn-block"  > Add+ </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Addnote