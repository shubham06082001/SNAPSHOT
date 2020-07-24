import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const renderList = () => {
    if (state) {
      return [
        <li key="0">
          <Link to="/profile">PROFILE</Link>
        </li>,
        <li key="1">
          <Link to="/create">CREATE POST</Link>
        </li>,
        <li key="2">
          <button
            className="btn waves-effect waves-light  pink darken-3"
            style={{
              border: "2px solid white",
              borderRadius: "6px",
              fontSize: "28px",
              fontFamily: "Barna Break Regular",
            }}
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              history.push("/signin");
            }}
          >
            LOGOUT
          </button>
        </li>,
      ];
    } else {
      return [
        <li key="3">
          <Link to="/signin">LOGIN</Link>
        </li>,
        <li key="4">
          <Link to="/signup">SIGNUP</Link>
        </li>,
      ];
    }
  };
  return (
    <nav>
      <div className="nav-wrapper pink lighten-1">
        <Link
          to={state ? "/" : "/signin"}
          className="brand-logo left"
          style={{
            fontWeight: "bold",
            boxShadow: "0px 0px 5px",
            borderRadius: "12px",
            padding: "0px 5px 0px 5px",
          }}
        >
          SNAPSHOT
        </Link>
        <ul id="nav-mobile" className="right">
          {renderList()}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

{
  /* <i class="material-icons">home</i>
<i class="material-icons">hourglass_full</i>
<i class="material-icons">perm_identity</i>
<i class="material-icons">pages</i> */
}
