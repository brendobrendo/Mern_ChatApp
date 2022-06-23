import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';


const Chat = () => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([])
    const [chatName, setChatName] = useState("")
    const [room, setRoom] = useState("")
    const [approve, setApprove] = useState(false)

    const [socket] = useState(() => io(':8000'));

    const onSubmitHandler = (e) => {
        e.preventDefault();
        socket.emit("chat", {chatName: chatName, content:input});
        setInput("")
    }

    useEffect(() => {
        // listen from server
        socket.on("post chat", (msg) => {

            setMessages(prevMsgState => [...prevMsgState, msg])
        })

        return () => socket.disconnect(true);

    }, [socket])

    const chatNameHandler= (e)=>{
        e.preventDefault()
        if(chatName){
            setApprove(true)
        }
    }
    return (
        <div>
            <h1>Welcome to General Chatroom</h1>
            <div>
                {
                    messages.map((msg, i) => (<p key={i}><span className="text-primary">{msg.chatName}:</span> {msg.content}</p>))
                }
            </div>
            {
                !approve?
                    <form onSubmit={chatNameHandler}>
                        <label>Enter your name </label>
                        <input type="text" value={chatName} onChange={e => setChatName(e.target.value)} />
                        <button className="btn btn-primary ms-2 mb-2"> Enter chat</button>
                    </form> :
                    <>
                        <form class onSubmit={onSubmitHandler}>
                            <input type="text" name='msg' onChange={(e) => setInput(e.target.value)} value={input} />
                            <button className="btn btn-primary ms-2 mb-2">Send</button>
                        </form>
                    </>
            }
        </div>
    );
}

export default Chat;