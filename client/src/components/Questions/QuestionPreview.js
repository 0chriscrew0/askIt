import React from "react";
import { Link } from "react-router-dom";

const QuestionPreview = props => {
  return (
    <div className="question-card card mb-3">
      <div className="card-header">{props.title}</div>
      <div className="card-body">
        <p className="card-text">{truncate(props.description)}</p>

        <p className="card-text text-muted">
          Asked by{" "}
          {props.currentUserId === props.creator._id
            ? "You"
            : props.creator.username}{" "}
          on {new Date(props.date).toLocaleDateString()}
        </p>
        <Link
          to={`/question/${props.id}`}
          className="btn btn-sm btn-outline-primary"
        >
          View Question
        </Link>
      </div>
    </div>
  );
};

const truncate = str => {
  if (str.length >= 150) {
    return str.substring(0, 151) + "...";
  }
  return str;
};

export default QuestionPreview;
