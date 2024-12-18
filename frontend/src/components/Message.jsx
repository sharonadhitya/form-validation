import React from "react";

const Message = ({ type, message }) => {
  return message ? <div className={type}>{message}</div> : null;
};

export default Message;
