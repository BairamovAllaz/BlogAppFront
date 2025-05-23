import React from "react";
import { Avatar, Button, Typography, Box, IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function ProfileInfo({post}) {
  if (!post) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 2,
        width: "100%",
        maxWidth: 600,
        margin: "0 auto", 
        gap: 2,
      }}
    >
      {/* Header Section */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar
          src={"https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Fso%2Favatar-logo&psig=AOvVaw2hW665QKWHojWzG-J1JB3S&ust=1747243818977000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJDXhM38oI0DFQAAAAAdAAAAABAE"}
          alt={post.author_name || "Author"}
        />
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6">
            {post.author_name || "Laurel W"}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {new Date(post.create_time).toLocaleDateString()} · {post.reading_time || "6 min"} read
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button variant="outlined" size="small">
            Follow
          </Button>
          <IconButton size="small">
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Post Title */}
      <Typography variant="h5" sx={{ mb: 2 }}>
        {post.title}
      </Typography>

      {/* Post Actions */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton size="small">
            <ThumbUpIcon />
          </IconButton>
          <Typography variant="body2">{post.like_count || 0}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton size="small">
            <CommentIcon />
          </IconButton>
          <Typography variant="body2">{post.comment_count || 0}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton size="small">
            <ShareIcon />
          </IconButton>
          <Typography variant="body2">{post.share_count || 0}</Typography>
        </Box>
        <IconButton size="small">
          <MoreVertIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default ProfileInfo;
