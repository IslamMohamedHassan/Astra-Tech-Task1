/** @format */

import React, { useState } from "react";
import { useFormik } from "formik";
import { apiLinks } from "../constants";
import toast, { Toaster } from "react-hot-toast";

function UpdateForm({ post, getAllPosts, toggleUpdateForm }) {

  // State For button spinner
  const [spinner, setSpinner] = useState(false);

  const formik = useFormik({
    
    //get form initial Values from the post and sign it to update form
    initialValues: {
      id: post.id,
      post_title: post.post_title,
      post_message: post.post_message,
      post_image: null,
    },

    onSubmit: async (values) => {
      const body = new FormData();

      body.append("id", post.id);
      body.append("post_title", values.post_title);
      body.append("post_message", values.post_message);

      // Check if a new image is selected
      if (values.post_image) {
        body.append("post_image", values.post_image);
      }

      setSpinner(true);

      // send form data to api to update post
      await fetch(`${apiLinks.main}updatepost`, {
        method: "POST",
        body,
      })
        .then((res) => {
          if (res.status === 200) {
            setSpinner(false);
            toast.success("The post has been updated successfully");
            toggleUpdateForm();
            return getAllPosts();
          } else {
            setSpinner(false);
            toast.error("Something's wrong");
          }
        })
        .catch((error) => error);
    },
  });

  return (
    <>
      <div className="form-popup-bg is-visible">
        <Toaster />
        <div className="form-container">
          <button
            className="close-button btn btn-close bg-white btn-lg"
            onClick={toggleUpdateForm}></button>
          <h2>Update Post</h2>
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              className="form-control mb-3 d-none"
              id="id"
              name="id"
              placeholder="Post title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.id}
            />

            <label htmlFor="post_title">Post Title</label>
            <input
              type="text"
              className="form-control mb-3"
              id="post_title"
              name="post_title"
              placeholder="Post title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.post_title}
            />

            <label htmlFor="post_message">Post Message</label>
            <input
              type="text"
              className="form-control mb-3"
              id="post_message"
              name="post_message"
              placeholder="Post Message"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.post_message}
            />

            <label htmlFor="post_image">Post Image</label>
            <input
              type="file"
              className="form-control mb-3"
              id="post_image"
              name="post_image"
              onChange={(event) => {
                formik.setFieldValue(
                  "post_image",
                  event.currentTarget.files[0]
                );
              }}
            />

            <button
              className="btn btn-success mb-2"
              type="submit">
              {!spinner ? (
                "Edit post"
              ) : (
                <span
                  class="spinner-border"
                  style={{ width: 20, height: 20 }}
                  role="status"
                  aria-hidden="true"></span>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateForm;
