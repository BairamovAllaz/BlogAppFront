import React from "react";
import ProfileInfo from "../components/ProfileInfo";
import { useParams } from "react-router-dom";
function PostPreview() {
  const { previewToken } = useParams();
  return (
    <div>
      <ProfileInfo />
    </div>
  );
}

export default PostPreview;
