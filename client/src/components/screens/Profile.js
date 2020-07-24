import React, { useEffect, useState, useContext } from "react";
import profile from "../../images/boy.jpeg";
import "./Profile.css";
import { UserContext } from "../../App";
import LoadingSpinner from "../UIElements/LoadingSpinner";

const Profile = () => {
  const [mypics, setPics] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    fetch("/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setPics(result.mypost);
      });
  }, []);
  return (
    <div style={{ margin: "30px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "18px 0px",
          borderBottom: "2px double grey",
        }}
      >
        <div>
          <img
            src={profile}
            alt="profile"
            style={{
              width: "160px",
              height: "160px",
              borderRadius: "80px",
            }}
          />
        </div>
        <div>
          <h4>
            <i class="material-icons">brightness_7</i>
            {state ? state.name : <LoadingSpinner />}
          </h4>
          <h4>{state ? state.email : <LoadingSpinner />}</h4>
          <h6 style={{ textAlign: "center" }}>{mypics.length} posts</h6>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "108%",
            }}
          >
            <h5>{state ? state.followers.length : "0"} followers</h5>
            <h5>{state ? state.following.length : "0"} following</h5>
          </div>
        </div>
      </div>
      <div className="gallery">
        {mypics.map((item) => {
          return (
            <img
              key={item._id}
              className="post-item"
              src={item.photo}
              alt={item.title}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Profile;
