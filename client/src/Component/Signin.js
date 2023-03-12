import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Signin = () => {
  const navigator = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/signin", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();
      console.log(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("identification", data.identification);
      if (res.status == 200) {
        window.alert(data.message);
        navigator("/viewnote");
      }
      if (res.status == 404) {
        window.alert(data.error);
      }
    } catch (error) {
      window.alert(error);
    }
  };
  return (
    <>
      <section className="vh-100 bg-image">
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ borderRadius: "15px" }}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">
                      Sign in your account
                    </h2>
                    <form method="post">
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          name="email"
                          onChange={(e) => setEmail(e.target.value)}
                          id="form3Example3cg"
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="form3Example3cg">
                          Your Email
                        </label>
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          name="password"
                          onChange={(e) => setPassword(e.target.value)}
                          id="form3Example4cg"
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" htmlFor="form3Example4cg">
                          Password
                        </label>
                      </div>

                      <div className="d-flex justify-content-center">
                        <button
                          type="button"
                          onClick={handleSubmit}
                          className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                        >
                          Sign in
                        </button>
                      </div>
                      <p className="text-center text-muted mt-5 mb-0">
                        {" "}
                        have not an account?{" "}
                        <NavLink to="/signup" className="fw-bold text-body">
                          <u>signup here</u>
                        </NavLink>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
