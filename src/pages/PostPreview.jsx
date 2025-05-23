import React,{useEffect, useState} from "react";
import ProfileInfo from "../components/ProfileInfo";
import { useParams } from "react-router-dom";
import MainBlog from "../components/MainBlog";
import axios from 'axios';
const API_URL = process.env.REACT_APP_BACKEND_URL;

function PostPreview() {
  const [post, setPost] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)

  const { previewToken } = useParams();
  useEffect(() => {
    console.log(previewToken)

    const fetchPost = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/posts/preview/${previewToken}`)
        setPost(response.data)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch post')
      } finally {
        setLoading(false)
      }
    }

    if (previewToken) {
      fetchPost()
    }
  }, [previewToken])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!post) return <div>No post found</div>

  return (
    <div>
      <ProfileInfo post = {post}/>
      <MainBlog post = {post}  loading={loading} error = {error}/>
    </div>
  );
}

export default PostPreview;
