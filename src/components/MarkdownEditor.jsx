import React from "react";
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";
import "react-mde/lib/styles/css/react-mde-all.css";
function MarkdownEditor({value,setValue}) {
  const [selectedTab, setSelectedTab] = React.useState("write");
  return (
    <div>
      <ReactMde
        value={value}
        onChange={setValue}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={markdown =>
          Promise.resolve(<ReactMarkdown>{markdown}</ReactMarkdown>)
        }
      />
    </div>
  );
}

export default MarkdownEditor;
