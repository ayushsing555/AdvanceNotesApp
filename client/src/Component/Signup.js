import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Signup = () => {
    const navigator = useNavigate();
    const [User, setUser] = useState({
        email: "", password: "", cpassword: "", name: ""
    })
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({ ...User, [name]: value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { email, password, name } = User;
            const res = await fetch("/register", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password, name 
                })
            })
            const data = await res.json();
            if (res.status == 400) {
                window.alert(data.error);
            }
            if (res.status == 200) {
                window.alert("successfuly registered");
                navigator("/signin");
            }
        } catch (error) {
            console.log(error);
            window.alert(error);
        }
    }

    return (
        <>
            <form method='post'>
                <section className="vh-100 bg-image">
                    <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                        <div className="container h-100">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                    <div className="card" style={{ borderRadius: "15px" }}>
                                        <div className="card-body p-5">
                                            <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                                            <form>
                                                <div className="form-outline mb-4">
                                                    <input type="text" name='name' onChange={handleInput} id="form3Example1cg" className="form-control form-control-lg" />
                                                    <label className="form-label" htmlFor="form3Example1cg">Your Name</label>
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <input type="email" name='email' onChange={handleInput} id="form3Example3cg" className="form-control form-control-lg" />
                                                    <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <input type="password" name='password' onChange={handleInput} id="form3Example4cg" className="form-control form-control-lg" />
                                                    <label className="form-label" htmlFor="form3Example4cg">Password</label>
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <input type="password" name='cpassword' onChange={handleInput} id="form3Example4cdg" className="form-control form-control-lg" />
                                                    <label className="form-label" htmlFor="form3Example4cdg">Repeat your password</label>
                                                </div>
                                                <div className="d-flex justify-content-center">
                                                    <button type="button" onClick={handleSubmit}
                                                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                                                </div>
                                                <p className="text-center text-muted mt-5 mb-0">Have already an account? <a href="/signin"
                                                    className="fw-bold text-body"><u>login here</u></a></p>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </form>
        </>
    )
}

export default Signup;