import React from "react";
import MarkdownEditor from "../components/MarkdownEditor.jsx";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext.jsx";
import { Link } from "react-router-dom";

const API_URL = process.env.REACT_APP_BACKEND_URL;
function CreatePost() {
  const [value, setValue] = React.useState("**Hello, Markdown!**");
  const { user } = React.useContext(AuthContext);
  const [postKey, setPostKey] = React.useState(null);
  const handleSubmit = async () => {
    const currentDate = new Date().toISOString().split("T")[0];
    const postData = {
      email: user.email,
      post_txt: value,
      create_time: currentDate,
      update_time: currentDate,
      status: true,
      like_count: 0,
    };
    try {
      const response = await axios.post(
        `${API_URL}/api/post/createPost`,
        postData
      );
      console.log("Post submitted successfully:", response.data.insertedData);
      setPostKey(response.data.insertedData[0].preview_token);
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  return (
    <div>
      <MarkdownEditor value={value} setValue={setValue} />
      <button onClick={handleSubmit}>Create Post</button>
      {postKey ? (
        <Link
          to={`/preview/${postKey}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button>Preview</button>
        </Link>
      ) : null}
    </div>
  );
}

export default CreatePost;
