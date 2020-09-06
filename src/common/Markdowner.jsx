import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import "./Markdowner.scss";
import Prism from "prismjs";

export default function Markdowner({ source }) {
  useEffect(() => {
    Prism.highlightAllUnder(
      document.querySelector("#react-markdown-container")
    );
  }, []);
  return (
    <div
      id="react-markdown-container"
      className="markdown-container"
      role="article"
      aria-label="markdown-content"
    >
      <ReactMarkdown source={source} />
    </div>
  );
}
