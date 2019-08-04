import React from "react";

const Modal = props => {
  return (
    <div className="myModal">
      <header className="myModal__header bg-primary">
        <h4>{props.title}</h4>
      </header>
      <section className="myModal__content">{props.children}</section>
      <section className="myModal__actions">
        {props.cancel && (
          <input
            type="button"
            className="btn btn-outline-secondary"
            value="Cancel"
            onClick={props.onCancel}
          />
        )}
        {props.confirm && (
          <input
            type="button"
            className="btn btn-outline-primary"
            value="Confirm"
            onClick={props.onConfirm}
          />
        )}
      </section>
    </div>
  );
};

export default Modal;
