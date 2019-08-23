import React, { Component } from "react";
import Backdrop from "../Backdrop";
import Modal from "../Modal";
import Spinner from "../Spinner";

class SingleAnswer extends Component {
  state = {
    isLoading: false,
    deleteModal: false
  };

  onDelete = () => {
    this.setState({ deleteModal: true });
  };

  onDeleteCancel = () => {
    this.setState({ deleteModal: false });
  };

  onDeleteConfirm = () => {
    this.setState({ isLoading: true });
    const answerId = this.props.id;

    const requestBody = {
      query: `
        mutation {
          deleteAnswer(answerId:"${answerId}") {
            _id
            title
          }
        }
      `
    };

    const token = this.props.token;

    fetch("/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          console.log(res);
          throw new Error("Failed!");
        }

        return res.json();
      })
      .then(resData => {
        this.setState({ isLoading: false, deleteModal: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isLoading: false
        });
      });
  };

  render() {
    return (
      <div className="single-answer">
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <div className="card mt-3 border-0">
            <div className="card-header bg-light">
              <span>
                <strong>{this.props.creator.username}</strong>
              </span>
            </div>
            <div className="card-body">
              <p className="card-text">{this.props.body}</p>

              <p className="card-title text-muted">
                Answered by{" "}
                {this.props.creator._id === this.props.currentUserId
                  ? "you"
                  : this.props.creator.username}{" "}
                on {new Date(this.props.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}
        {this.props.creator._id === this.props.currentUserId && (
          <div>
            {this.state.deleteModal && <Backdrop />}
            {this.state.deleteModal && (
              <Modal
                title="Delete Answer"
                cancel
                confirm
                onCancel={this.onDeleteCancel}
                onConfirm={this.onDeleteConfirm}
              >
                <p>Are you sure you want to delete this answer?</p>
              </Modal>
            )}
            <input
              type="button"
              className="btn btn-danger btn-sm"
              value="Delete"
              onClick={this.onDelete}
            />
          </div>
        )}
      </div>
    );
  }
}

export default SingleAnswer;
