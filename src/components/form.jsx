/** @format */

import { useFormik } from "formik"; // Import useFormik from Formik
import { apiLinks } from "../constants";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

function AddForm({ getAllPosts, toggleForm }) {

  // State For button spinner
  const [spinner, setSpinner] = useState(false);

  // make all of fields required
  function validateFields (values,errors) {

  const requiredFields = ["post_title","post_message","post_image"]
  requiredFields.forEach(elem =>{
    if(!values[elem]){
      errors[elem] = "required"
    }
  })
}

  const formik = useFormik({

    //form initial Values 
    initialValues: { post_title: "", post_message: "", post_image: null },

    validate : function(values){

      const errors = {};

    
      if(values.post_title.length <= 5 || values.post_title.length > 15 ){
        errors.post_title = "Title Must Be Between 5 : 15 Characters "
      }

      if(values.post_message.length <= 5 || values.post_message.length > 50 ){
        errors.post_message = "Message Must Be Between 5 : 50 Characters "
      }

      // func to make all fields required
      validateFields(values,errors)

      return errors;

    },

    onSubmit: async (values) => {

      const body = new FormData();

      body.append("post_title", values.post_title);
      body.append("post_message", values.post_message);
      body.append("post_image", values.post_image);

      setSpinner(true);

      // send form data to api to add new post
      await fetch(`${apiLinks.main}create`, {
        method: "POST",
        body,
      }).then((res) => {
        if (res.status === 200) {
          setSpinner(false);
          toast.success("The post has been added successfully");
          toggleForm();
          return getAllPosts();
        } else {
          setSpinner(false);
          toast.error("Something's wrong");
        }
      });
    },
  });

  return (
    
    <div className="form-popup-bg is-visible">
      <Toaster />
      <div className="form-container">
        <button
          className="close-button btn btn-close bg-white btn-lg"
          onClick={toggleForm}></button>
        <h2>Add Post</h2>
        <form onSubmit={formik.handleSubmit}>
          <label className="mt-3" htmlFor="post_title">Post Title</label>
          <input
            type="text"
            className="form-control"
            id="post_title"
            name="post_title"
            placeholder="Post title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.post_title}
          />
          {(formik.errors.post_title && formik.touched.post_title) ? <div className='text-danger mb-2'>{formik.errors.post_title}</div> : "" }


          <label className="mt-3" htmlFor="post_message">Post Message</label>
          <input
            type="text"
            className="form-control "
            id="post_message"
            name="post_message"
            placeholder="Post Message"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.post_message}
          />
          {(formik.errors.post_message && formik.touched.post_message) ? <div className='text-danger mb-2'>{formik.errors.post_message}</div> : "" }


          <label className="mt-3" htmlFor="post_image">Post Image</label>
          <input
            type="file"
            className="form-control mb-3"
            id="post_image"
            name="post_image"
            onChange={(event) => {
              formik.setFieldValue("post_image", event.currentTarget.files[0]);
            }}
          />

          <button
            className="btn btn-success mb-2"
            type="submit">
            {!spinner ? (
              "New Post"
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
  );
}

export default AddForm;
