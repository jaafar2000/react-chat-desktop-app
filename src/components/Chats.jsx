import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { updateDoc, deleteField } from "firebase/firestore";
import { db } from "../firebase";
import {AiTwotoneDelete} from 'react-icons/ai'
const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u, chat) => {
    dispatch({ type: "CHANGE_USER", payload: u });
    console.log(chat);
  };

  const handleDel = async (id) => {
    const chatRef = doc(db, "chats", id);
    await updateDoc(chatRef, {
      messages: deleteField(),
    });
  };
  return (
    <div className="chats">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className="userChat"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo, chat)}
          >
            <img src={chat[1].userInfo.photoURL} alt="" />
            <div className="userChatInfo">
              <span>{chat[1].userInfo.displayName}</span>
              <p>{chat[1].lastMessage?.text}</p>
            </div>
            <p className="delete" onClick={() => handleDel(chat[0])}  ><AiTwotoneDelete/></p>
          </div>
        ))}
    </div>
  );
};

export default Chats;
