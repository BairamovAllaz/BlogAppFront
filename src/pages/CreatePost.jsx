import React from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MarkdownEditor from '../components/MarkdownEditor';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { AuthContext } from '../Context/AuthContext';

const API_URL = process.env.REACT_APP_BACKEND_URL;

function CreatePost() {
  const [title, setTitle] = React.useState("");
  const [value, setValue] = React.useState("**Hello, Markdown!**");
  const [selectedImage, setSelectedImage] = React.useState(null);
  const { user } = React.useContext(AuthContext);
  const [postKey, setPostKey] = React.useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const currentDate = new Date().toISOString().split("T")[0];
    const postData = {
      email: user.email,
      title,
      post_txt: value,
      create_time: currentDate,
      update_time: currentDate,
      status: true,
      like_count: 0,
      author_avatar: "Default",
      author_name: "Allaz",
      reading_time: "7 min",
      comment_count: 0,
      share_count: 0,
      views: 0,
      category: "Blog",
      featured_image: "Default",
    };
    try {
      const response = await axios.post(
        `${API_URL}/api/posts/createPost`,
        postData
      );
      console.log("Post submitted successfully:", response.data.insertedData);
      setPostKey(response.data.insertedData[0].preview_token);
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  const handleUpdate = async () => {
    if (!title.trim()) {
      alert("Please enter a title");
      return;
    }
    if (!postKey) {
      console.error('No post key available');
      return;
    }

    const updateData = {
      title,
      post_txt: value,
      status: true,
      like_count: 0
    };

    try {
      const response = await axios.put(
        `${API_URL}/api/posts/preview/${postKey}`,
        updateData,
      );
      console.log("Post updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating post:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <TextField
        fullWidth
        label="Post Title"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
        required
      />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        {/* <input
          accept="image/*"
          style={{ display: 'none' }}
          id="raised-button-file"
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setSelectedImage(file);
              const reader = new FileReader();
              reader.onloadend = () => {
                const imageUrl = reader.result;
                // Insert image markdown syntax at cursor position
                const newValue = value + `\n\n![](data:image/${file.type};base64,${imageUrl.split(',')[1]})\n\n`;
                setValue(newValue);
              };
              reader.readAsDataURL(file);
            }
          }}
        /> */}
        {/* TODO CREAT IMAGE UPLOAD FUNCTIONALITY */}
        <label htmlFor="raised-button-file">
          <IconButton color="primary" aria-label="upload picture" component="span">
            <CloudUploadIcon />
          </IconButton>
        </label>
        {selectedImage && (
          <Typography variant="body2" color="textSecondary">
            Selected: {selectedImage.name}
          </Typography>
        )}
      </Box>
      <MarkdownEditor value={value} setValue={setValue} />
      <Box sx={{ 
        mt: 2, 
        display: 'flex', 
        gap: 2,
        justifyContent: 'flex-end'
      }}>
        {postKey ? (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdate}
              startIcon={<EditIcon />}
            >
              Update Post
            </Button>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<VisibilityIcon />}
              onClick={() => navigate(`/preview/${postKey}`)}
            >
              Preview
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            startIcon={<AddIcon />}
          >
            Create Post
          </Button>
        )}
      </Box>
    </div>
  );
}

export default CreatePost;
