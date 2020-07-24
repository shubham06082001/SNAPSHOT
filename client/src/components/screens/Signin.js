import React, { useState, useContext } from "react";
import "./Signin.css";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import { UserContext } from "../../App";
/* eslint-disable */
const Signin = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
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
    fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          M.toast({ html: data.error, classes: "rounded  red accent-3" });
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({type:"USER",payload:data.user})
          M.toast({ html: "SIGNIN success!!", classes: "rounded  teal" });
          history.push("/");
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
          style={{ marginTop: "60px", right: "130px" }}
          onClick={() => PostData()}
        >
          LOGIN
        </button>
        <h5>
          <Link
            to="/signup"
            style={{
              color: "white",
              border: "1px solid white",
              padding: "5px",
            }}
          >
            Don't have an account ?
          </Link>
        </h5>
      </div>
    </div>
  );
};
export default Signin;
