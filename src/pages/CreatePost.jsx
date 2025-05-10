import React from "react";
import MarkdownEditor from "../components/MarkdownEditor.jsx";
import axios from "axios";
const API_URL = process.env.REACT_APP_BACKEND_URL;
function CreatePost() {
  const [value, setValue] = React.useState("**Hello, Markdown!**");

  const handleSubmit = async () => {
    const email = localStorage.getItem("email");
    const currentDate = new Date().toISOString().split("T")[0];

    const postData = {
      email: "ellezdjdj",
      post_txt: value,
      create_time: currentDate,
      update_time: currentDate,
      status: true,
      like_count: 0,
    };
    console.log(postData);  
    try {
      const response = await axios.post(
        `${API_URL}/api/post/createPost`,
        postData
      );
      console.log("Post submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  return (
    <div>
      <MarkdownEditor value={value} setValue = {setValue}/>
      <button onClick={handleSubmit}>Create Post</button> 
    </div>
  );
}

export default CreatePost;
