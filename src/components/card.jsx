/** @format */

import React, { useState } from "react";
import { apiLinks } from "../constants";
import axios from "axios";
import toast from "react-hot-toast";

function Card({ post, handleUpdate, getAllPosts }) {
  // State For button spinner
  const [spinner, setSpinner] = useState(false);

  // Function to handle  delete post
  function handleDelete(id) {
    setSpinner(true);

    // send id of post to api to delete the post by it's id
    axios
      .post(`${apiLinks.main}deletepost`, { id: id })
      .then((res) => {
        if (res.status === 200) {
          // alert msg
          toast.success("The post has been deleted successfully");
          setSpinner(false);

          // call getAllPosts to change the state and get posts after delete post
          getAllPosts();
        } else {
          toast.error("Something's Wrong");
          setSpinner(false);
        }
      })
      .catch((error) => error);
  }

  return (
    <div className="card d-flex flex-column justify-content-between h-100">
      <div className="bg-light d-flex justify-content-start flex-row flex-sm-column flex-lg-row align-items-center p-3">
        <img
          className="cards-img d-block me-3"
          src={post?.post_image}
          alt={post?.post_title}
        />
        <h5 className="py-sm-2 m-auto">{post?.post_title.split(" ").slice(0, 3).join(" ")}</h5>
      </div>
      
      <p className="p-3 ">{post?.post_message?.length > 50 ? `${post.post_message.slice(0, 50)}...` : post.post_message}</p>

      <div className="p-3 row  flex-md-column flex-lg-row  justify-content-around">
        <button
          onClick={() => handleUpdate(post)}
          className="btn btn-success col-5 mb-md-2 mb-lg-0 col-md-12 col-lg-5">
          Update
        </button>
        <button
          onClick={() => handleDelete(post?.id)}
          className=" btn btn-danger col-5 col-md-12 col-lg-5">
          {!spinner ? (
            "Delete"
          ) : (
            <span
              class="spinner-border"
              style={{ width: 20, height: 20 }}
              role="status"
              aria-hidden="true"></span>
          )}
        </button>
      </div>
    </div>
  );
}

export default Card;
