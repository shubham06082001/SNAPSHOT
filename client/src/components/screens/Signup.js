import React, { useState } from "react";
import "./Signup.css";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
/* eslint-disable */

const Signup = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const PostData = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({
        html: "Invalid Email!",
        classes: "rounded  orange accent-4",
      });
      return;
    }
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "rounded  red accent-3" });
        } else {
          M.toast({ html: data.message, classes: "rounded  teal" });
          history.push("/signin");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2 style={{ color: "white", fontWeight: "bold" }}>SNAPSHOT</h2>
        <input
          type="text"
          required
          autoComplete="off"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <span
          className="helper-text"
          data-error="wrong"
          data-success="right"
          style={{ color: "white", float: "left", fontSize: "20px" }}
        >
          Enter your Name
        </span>
        <input
          type="email"
          required
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <span
          className="helper-text"
          data-error="wrong"
          data-success="right"
          style={{ color: "white", float: "left", fontSize: "20px" }}
        >
          Enter your Email
        </span>
        <input
          type="password"
          required
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span
          className="helper-text"
          data-error="wrong"
          data-success="right"
          style={{ color: "white", float: "left", fontSize: "20px" }}
        >
          Enter your Password
        </span>

        <button
          className="btn waves-effect waves-light btn-large pink"
          style={{ marginTop: "50px", right: "150px", marginBottom: "30px" }}
          onClick={() => PostData()}
        >
          SIGNUP
        </button>
        <h5>
          <Link
            to="/signin"
            style={{
              color: "white",
              border: "1px solid white",
              padding: "5px",
            }}
          >
            Already have an account ?
          </Link>
        </h5>
      </div>
    </div>
  );
};
export default Signup;
