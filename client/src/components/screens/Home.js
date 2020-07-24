import React, { useState, useEffect, useContext } from "react";
import quote from "../../images/quote.jpg";
import home from "../../images/home.jpg";
import "./Home.css";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    fetch("/allpost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setData(result.posts);
      });
  });
  const likePost = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //   console.log(result)
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const unlikePost = (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //   console.log(result)
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const makeComment = (text, postId) => {
    fetch("/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePost = (postid) => {
    fetch(`/deletepost/${postid}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.filter((item) => {
          return item._id !== result._id;
        });
        setData(newData);
      });
  };
  return (
    <div className="home">
      {data.map((item) => {
        return (
          <div className="card home-card card-panel hoverable" key={item._id}>
            <h5
              style={{
                fontSize: "35px",
                float: "left",
                fontFamily: "monospace",
              }}
            >
              <i
                className="material-icons"
                style={{ color: "blue", fontSize: "35px", float: "left" }}
              >
                brightness_7
              </i>
              <Link
                to={
                  item.postedBy._id !== state._id
                    ? "/profile/" + item.postedBy._id
                    : "/profile"
                }
              >
                {item.postedBy.name}
              </Link>
            </h5>
            {item.postedBy._id == state._id && (
              <i
                className="material-icons"
                style={{
                  color: "red",
                  fontSize: "35px",
                  float: "right",
                }}
                onClick={() => deletePost(item._id)}
              >
                delete_sweep
              </i>
            )}
            <div className="card-image">
              <img src={item.photo} alt={item.title} />
            </div>
            <div className="card-content">
              <div className="center-align">
                <h6
                  style={{
                    fontSize: "35px",
                    float: "left",
                  }}
                >
                  <i
                    className="material-icons"
                    style={{ color: "red", fontSize: "35px", float: "left" }}
                    onClick={() => {
                      likePost(item._id);
                    }}
                  >
                    favorite_border
                  </i>
                  {item.likes.includes(state._id) ? (
                    <i
                      className="material-icons"
                      style={{
                        color: "red",
                        fontSize: "35px",
                        float: "left",
                      }}
                      onClick={() => {
                        likePost(item._id);
                      }}
                    >
                      favorite_border
                    </i>
                  ) : (
                    <i
                      className="material-icons"
                      style={{
                        color: "#4a148c",
                        fontSize: "35px",
                        float: "left",
                      }}
                      onClick={() => {
                        unlikePost(item._id);
                      }}
                    >
                      content_cut
                    </i>
                  )}
                  {item.likes.length} Likes
                </h6>
              </div>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              {item.comments.map((record) => {
                return (
                  <h6 key={record._id}>
                    <span style={{ fontWeight: "500", color: "green" }}>
                      {record.postedBy.name}
                    </span>
                    {record.text}
                  </h6>
                );
              })}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  makeComment(e.target[0].value, item._id);
                }}
              >
                <input type="text" placeholder="add comment" />
              </form>
            </div>
          </div>
        );
      })}
      <div className="card home-card  teal lighten-2">
        <h5>Ramesh</h5>
        <div className="card-image">
          <img src={quote} alt="post" />
        </div>
        <div className="card-content">
          <i className="material-icons" style={{ color: "red" }}>
            favorite_border
          </i>
          <h6>TITLE</h6>
          <p>CONTENT</p>
          <input type="text" placeholder="add comment" />
        </div>
      </div>
      <div className="card home-card">
        <h5>Ramesh</h5>
        <div className="card-image">
          <img src={home} alt="post" />
        </div>
        <div className="card-content">
          <i className="material-icons" style={{ color: "red" }}>
            favorite_border
          </i>
          <h6>TITLE</h6>
          <p>CONTENT</p>
          <input type="text" placeholder="add comment" />
        </div>
      </div>
    </div>
  );
};
export default Home;
