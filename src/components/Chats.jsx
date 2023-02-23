import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const Chats = ()=>{

    const[chats,setChats] = useState([])
    const {currentUser} = useContext(AuthContext)
    const {dispatch} = useContext(ChatContext)
    useEffect(()=>{
        const getChats = () => {
            const unsub = onSnapshot(doc(db,"userChats",currentUser.uid),(doc) =>{
                setChats(doc.data())
            });

            return () => {
                unsub();
            };
        };
        currentUser.uid && getChats();
    },[currentUser.uid]);
    
    const handleSelect = (u) =>{
        dispatch({type:"CHANGE_USER", payload: u})
    }
    const msgDate = (dte) =>{
        const timeNow = new Date().valueOf()
        const msgSent = timeNow - dte.toDate().valueOf()
        let timeAgo = ""
        if(msgSent < 30000){
            timeAgo = 'Just Now'
        } else if(msgSent < 3600000){
            timeAgo = Math.round(msgSent / 60000) + ' mins ago'
        } else if (msgSent < 86400000){
            timeAgo = Math.round(msgSent / 3600000) + ' hrs ago'
        } else {
            timeAgo = dte.toDate().toLocaleString()
        }
        return timeAgo
    }
    return (
        <div className="chats">
            {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map(chat=>(
                <div className="userChat" key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
                    <img src={chat[1].userInfo.photoURL} alt="" />
                    <div className="userChatInfo">
                        <span>{chat[1].userInfo.displayName}</span>
                        <p>{chat[1].lastMessage?.text}</p>
                    </div>
                    {chat[1].date &&<div className="lastMsgSent"><span>{msgDate(chat[1].date)}</span></div>}
                </div>
            ))}
        </div>
    )
}
export default Chats;