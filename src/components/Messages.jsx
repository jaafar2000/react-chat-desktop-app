import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import Message from "./Message";
import {RiWechatFill} from "react-icons/ri"
const Messages = () => {
  const [messages, setMessages] = useState();
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  console.log(messages)

  return (
    <div className="messages">
      {  
      
      messages ? 
      messages.map((m) => (
        <Message message={m} key={m.id} />
      ))
      : (
        <p className="no_msg" >
          <h1>JHY Chat <RiWechatFill style={{color : "#2f2d52"}} /></h1>
          <h3>Thanks for checking out this application.</h3>
          <p>Search for users, Select user and start your chat.</p>
        </p>
      )
      
      }
    </div>
  );
};

export default Messages;
