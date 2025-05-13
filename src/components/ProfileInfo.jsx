import React from "react";
import { Avatar, Button, Typography, Box, IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function ProfileInfo() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 2,
        width: "100%",
        maxWidth: 600,
        margin: "0 auto", 
      }}
    >
      {/* Header Section */}
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
        <Avatar
          src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Fso%2Favatar-logo&psig=AOvVaw2hW665QKWHojWzG-J1JB3S&ust=1747243818977000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJDXhM38oI0DFQAAAAAdAAAAABAE"
          alt="Laurel W"
        />
        <Box sx={{ marginLeft: 2 }}>
          <Typography variant="h6">Laurel W</Typography>
          <Typography variant="body2" color="textSecondary">
            6 min read · Mar 22, 2025
          </Typography>
        </Box>
        <Button variant="outlined" sx={{ marginLeft: "auto" }}>
          Follow
        </Button>
      </Box>

      {/* Post Actions */}
      <Box sx={{ display: "flex", alignItems: "center", marginTop: 1 }}>
        <IconButton>
          <ThumbUpIcon />
        </IconButton>
        <Typography variant="body2">1.4K</Typography>
        <IconButton sx={{ marginLeft: 2 }}>
          <CommentIcon />
        </IconButton>
        <Typography variant="body2">68</Typography>
        <IconButton sx={{ marginLeft: 2 }}>
          <ShareIcon />
        </IconButton>
        <IconButton sx={{ marginLeft: "auto" }}>
          <MoreVertIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default ProfileInfo;
