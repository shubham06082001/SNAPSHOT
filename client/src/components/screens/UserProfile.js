import React, { useEffect, useState, useContext } from "react";
import profile from "../../images/boy.jpeg";
import "./Profile.css";
import { UserContext } from "../../App";
import LoadingSpinner from "../UIElements/LoadingSpinner";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [userProfile, setProfile] = useState(null);
  const { state, dispatch } = useContext(UserContext);
  const { userid } = useParams();
  const [showfollow, setShowFollow] = useState(
    state ? !state.following.includes(userid) : true
  );
  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        //console.log(result)

        setProfile(result);
      });
  }, []);

  const followUser = () => {
    fetch("/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setProfile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, data._id],
            },
          };
        });
        setShowFollow(false);
      });
  };
  const unfollowUser = () => {
    fetch("/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        unfollowId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));

        setProfile((prevState) => {
          const newFollower = prevState.user.followers.filter(
            (item) => item != data._id
          );
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollower,
            },
          };
        });
        setShowFollow(true);
      });
  };
  return (
    <div>
      {userProfile ? (
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
                {userProfile.user.name}
              </h4>
              <h4>{userProfile.user.email}</h4>
              <h6 style={{ textAlign: "center" }}>
                {userProfile.posts.length} posts
              </h6>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "108%",
                }}
              >
                <h5>{userProfile.user.followers.length} followers</h5>
                <h5>{userProfile.user.following.length} following</h5>
              </div>
              {showfollow ? (
                <button
                  className="btn waves-effect waves-light blue"
                  style={{ margin: "10px" }}
                  onClick={() => followUser()}
                >
                  FOLLOW
                </button>
              ) : (
                <button
                  className="btn waves-effect waves-light blue"
                  style={{ margin: "10px" }}
                  onClick={() => unfollowUser()}
                >
                  UNFOLLOW
                </button>
              )}
            </div>
          </div>
          <div className="gallery">
            {userProfile.posts.map((item) => {
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
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};
export default Profile;
