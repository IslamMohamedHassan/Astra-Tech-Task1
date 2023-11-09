/** @format */

import React, { useEffect, useState } from "react";
import { apiLinks } from "../constants";
import axios from "axios";
import Card from "../components/card";
import AddForm from "../components/form";
import UpdateForm from "../components/updateform";
import { Helmet } from "react-helmet-async";

function Home() {

  // Hooks to change states
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null); // Store the selected post for update

  // Render All Posts
  useEffect(() => {
    getAllPosts();
  }, []);

  // Function To Get Posts
  function getAllPosts() {
    axios
      .get(`${apiLinks.main}getposts`)
      .then((res) => setPosts(res?.data))
      .catch((err) => err);
  }

  //Search Function
  const handleSearch = (event) => {
    console.log(event.target.value);
    setSearchQuery(event.target.value);
  };

  // Filter posts based on the search query
  const filteredPosts = posts.filter((post) =>
    post.post_title?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  // Function to toggle the add post form visibility
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  // Function to toggle the update post form visibility
  const toggleUpdateForm = () => {
    setShowUpdateForm(!showUpdateForm);
  };

  // Function to handle update
  const handleUpdate = (post) => {
    setSelectedPost(post);
    setShowUpdateForm(true); // Show the form when updating
  };

  return (
    <>

      <Helmet>
        <title>Home</title>
      </Helmet>

      {/* search field */}
      <section className="d-flex py-3 justify-content-between">
        <input
          className="form-control w-70"
          type="text"
          placeholder="Search posts"
          value={searchQuery}
          onChange={handleSearch}
        />
        <button
          onClick={toggleForm}
          className="btn btn-primary fw-bolder w-25">
          New
        </button>
      </section>

      {/* display all posts after filtered it */}
      <section className="row ">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="col-sm-6 col-md-4 py-3">
            <Card
              post={post}
              handleUpdate={handleUpdate}
              getAllPosts={getAllPosts}
            />
          </div>
        ))}
      </section>

        {/* Conditional rendering of the form */}
        {showForm && (
          <div className="form-popup">
            <AddForm
              getAllPosts={getAllPosts}
              toggleForm={toggleForm}
            />
          </div>
        )}

        {/* Conditional rendering of the form */}
        {showUpdateForm && (
          <div className="form-popup">
            <UpdateForm
              post={selectedPost}
              getAllPosts={getAllPosts}
              toggleUpdateForm={toggleUpdateForm}
            />
          </div>
        )}
    </>
  );
}

export default Home;
