import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
const Message = ({ message }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 1,
    

  };

  TimeAgo.addDefaultLocale(en);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  console.log(message);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />

        {/* <span> {timeAgo.format(Date.now() - message?.date?.seconds )} </span> */}
      </div>
      <div className="messageContent">
        {message.text && (
          <p>
            <span>{message.text}</span>
            <span>
              {new Date(message?.date?.seconds * 1000)
                .toLocaleString()
                .slice(11, 15)}
              -
              {new Date(message?.date?.seconds * 1000)
                .toLocaleString()
                .slice(19)}
            </span>
          </p>
        )}
        {message.img && (
          <>
            <div className="img">
              <Button onClick={handleOpen}>
                <img src={message.img} alt="" />{" "}
                {!message.text && (
                  <span>
                    {new Date(message?.date?.seconds * 1000)
                      .toLocaleString()
                      .slice(11, 15)}

                    {new Date(message?.date?.seconds * 1000)
                      .toLocaleString()
                      .slice(19)}
                  </span>
                )}{" "}
              </Button>
            </div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <img src={message.img} className="img__inside__model"  />
              </Box>
            </Modal>
          </>
        )}
      </div>
    </div>
  );
};

export default Message;
