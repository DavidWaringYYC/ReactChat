import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
const Message = ({message}) => {
    const {currentUser} = useContext(AuthContext)
    const {data} = useContext(ChatContext)
    const ref = useRef()
    useEffect(()=>{
        ref.current?.scrollIntoView({behavior:"smooth"})
    },[message])
    const timeNow = new Date().valueOf()
    const msgSent = timeNow - message.date.toDate().valueOf()
    let timeAgo = ""
    if(msgSent < 30000){
        timeAgo = 'Just Now'
    } else if(msgSent < 3600000){
        timeAgo = Math.round(msgSent / 60000) + ' mins ago'
    } else if (msgSent < 86400000){
        timeAgo = Math.round(msgSent / 3600000) + ' hrs ago'
    } else {
        timeAgo = message.date.toDate().toLocaleString()
    }
    
    return (
        <div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`}>
            <div className="messageInfo">
                <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" />
                <span className="timeSpan">{timeAgo}</span>
            </div>
            <div className="messageContent">
                <p>{message.text}</p>
                {message.img && <img src={message.img} alt="" />}
            </div>
        </div>
    )
}
export default Message