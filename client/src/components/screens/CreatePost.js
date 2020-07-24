import React, { useState, useEffect } from "react";
import "./CreatePost.css";
import M from "materialize-css";
import { useHistory } from "react-router-dom";
// import e from "express";

const CreatePost = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (url) {
      fetch("/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          if (data.error) {
            M.toast({ html: data.error, classes: "#c62828 red darken-3" });
          } else {
            M.toast({
              html: "New Post Created",
              classes: "#69f0ae green accent-2",
            });
            history.push("/");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [url]);

  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "snapshot");
    data.append("cloud_name", "instag");
    fetch("https://api.cloudinary.com/v1_1/instag/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUrl(data.url);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="mycard">
      <div
        className="card auth-card input-field"
        style={{
          margin: "40px auto",
          maxWidth: "500px",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "white", fontWeight: "bold" }}>SNAPSHOT</h2>
        <span
          className="helper-text"
          data-error="wrong"
          data-success="right"
          style={{ color: "white", float: "left", fontSize: "20px" }}
        >
          POST &nbsp;&nbsp;&nbsp; Title
        </span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <span
          className="helper-text"
          data-error="wrong"
          data-success="right"
          style={{ color: "white", float: "left", fontSize: "20px" }}
        >
          POST &nbsp;&nbsp;&nbsp; description
        </span>
        <input
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <div className="file-field input-field">
          <div className="btn waves-effect waves-teal blue accent-3">
            <span>Select Image</span>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            <i class="material-icons">add_a_photo</i>
            
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        <button
          className="btn waves-effect waves-light btn-large pink"
          onClick={() => postDetails()}
        >
          CREATE POST
        </button>
      </div>
    </div>
  );
};
export default CreatePost;
