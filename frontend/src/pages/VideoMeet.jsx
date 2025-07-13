"use client"

import React, { useEffect, useRef, useState } from "react"
import { io } from "socket.io-client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faMicrophone,
    faMicrophoneSlash,
    faVideo,
    faVideoSlash,
    faPhone,
    faDesktop,
    faComment,
    faTimes,
    faPaperPlane,
    faUsers,
    faSignInAlt,
    faCopy
} from "@fortawesome/free-solid-svg-icons"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"

const server_url = "http://localhost:8000"
const peerConfigConnections = {
    iceServers: [{ urls: "stun:12connect.com:3478" }],
}

let connections = {}


const RemoteVideo = React.memo(({ stream }) => {
    const videoRef = useRef();

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    return (
        <video
            autoPlay
            playsInline
            ref={videoRef}
            className="remote-video"
        />
    );
});

function VideoMeet() {
    const socketRef = useRef()
    const socketIdRef = useRef()
    const localVideoRef = useRef()
    const videoRef = useRef([])
    const chatInputRef = useRef()
    const chatMessagesRef = useRef()
    const nav = useNavigate()
    const { meetingId } = useParams()
    console.log("meeting", meetingId)

    const [videoAvailable, setVideoAvailable] = useState(true)
    const [audioAvailable, setAudioAvailable] = useState(true)
    const [video, setVideo] = useState(true)
    const [audio, setAudio] = useState(true)
    const [screenAvailable, setScreenAvailable] = useState(false)
    const [screen, setScreen] = useState(false)
    const [videos, setVideos] = useState([])
    const [participantsList, setParticipantsList] = useState([])
    const [askForUsername, setAskForUsername] = useState(true)
    const [username, setUsername] = useState("")


    const [connectionCount, setConnectionCount] = useState(0)


    const [chatOpen, setChatOpen] = useState(false)
    const [participants, setParticipants] = useState(false)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [unreadCount, setUnreadCount] = useState(0)

    const updateConnectionCount = () => {
        const count = Object.keys(connections).length
        setConnectionCount(count)
        console.log("Connection count updated:", count)
    }

    const getPermissions = async () => {
        try {
            const videoStream = await navigator.mediaDevices.getUserMedia({ video: true })
            if (videoStream) setVideoAvailable(true)
            const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true })
            if (audioStream) setAudioAvailable(true)
            if (navigator.mediaDevices.getDisplayMedia) setScreenAvailable(true)

            if (videoAvailable || audioAvailable) {
                const mediaStream = await navigator.mediaDevices.getUserMedia({
                    video: videoAvailable,
                    audio: audioAvailable,
                })
                window.localStream = mediaStream
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = mediaStream
                }
            }
        } catch (err) {
            console.error("Permission error:", err)
        }
    }

    useEffect(() => {
        getPermissions()
    }, [])

    useEffect(() => {
        if (!askForUsername && localVideoRef.current && window.localStream) {
            localVideoRef.current.srcObject = window.localStream
        }
    }, [askForUsername])

    const toggleChat = () => {
        setChatOpen((prev) => {
            const newState = !prev
            if (newState) setParticipants(false)
            if (!newState) setUnreadCount(0)
            return newState
        })
    }

    const toggleParticipants = () => {
        setParticipants((prev) => {
            const newState = !prev
            if (newState) setChatOpen(false)
            return newState
        })
    }

    const sendMessage = () => {
        if (newMessage.trim()) {
            const messageData = {
                text: newMessage,
                username: username,
                timestamp: new Date().toLocaleTimeString(),
                isOwn: true,
            }
            setMessages((prev) => [...prev, messageData])
            setNewMessage("")
            socketRef.current.emit("chat-message", messageData)
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            sendMessage()
        }
    }

    // Scroll to bottom of chat
    useEffect(() => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight
        }
    }, [messages])

    const gotMessageFromServer = (fromId, message) => {
        const signal = JSON.parse(message)
        if (fromId !== socketIdRef.current) {
            if (signal.sdp) {
                connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
                    if (signal.sdp.type === "offer") {
                        connections[fromId].createAnswer().then((description) => {
                            connections[fromId].setLocalDescription(description).then(() => {
                                socketRef.current.emit("signal", fromId, JSON.stringify({ sdp: connections[fromId].localDescription }))
                            })
                        })
                    }
                })
            }
            if (signal.ice) {
                connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice))
            }
        }
    }

    const black = ({ width = 640, height = 480 } = {}) => {
        const canvas = Object.assign(document.createElement("canvas"), { width, height })
        canvas.getContext("2d").fillRect(0, 0, width, height)
        const stream = canvas.captureStream()
        return Object.assign(stream.getVideoTracks()[0], { enabled: false })
    }

    const silence = () => {
        const ctx = new AudioContext()
        const oscillator = ctx.createOscillator()
        const dst = oscillator.connect(ctx.createMediaStreamDestination())
        oscillator.start()
        ctx.resume()
        return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false })
    }

    const blackSilence = () => new MediaStream([black(), silence()])

    const connectToSocketServer = () => {
        socketRef.current = io(server_url, { secure: false })

        socketRef.current.on("signal", gotMessageFromServer)

        socketRef.current.on("chat-message", (messageData) => {
            setMessages((prev) => [...prev, { ...messageData, isOwn: false }])
            if (!chatOpen) {
                setUnreadCount((prev) => prev + 1)
            }
        })

        socketRef.current.on("connect", () => {
            socketRef.current.emit("join-call", window.location.href, username)
            socketIdRef.current = socketRef.current.id

            socketRef.current.on("user-left", (id, usernamesMap) => {
                console.log("User left:", id)


                setVideos((videos) => videos.filter((video) => video.socketId !== id))

                if (connections[id]) {
                    connections[id].close()
                    delete connections[id]
                    updateConnectionCount()
                }


                const updatedParticipants = Object.entries(usernamesMap).map(([socketId, name]) => ({
                    socketId,
                    name,
                }))
                setParticipantsList(updatedParticipants)
            })

            socketRef.current.on("user-joined", (id, clientList, userNamesMap) => {
                console.log("User joined:", id)

                socketIdRef.current = socketRef.current.id

                const updatedParticipants = Object.entries(userNamesMap).map(([socketId, name]) => ({
                    socketId,
                    name,
                }))
                setParticipantsList(updatedParticipants)

                clientList.forEach((clientId) => {
                    if (connections[clientId]) return

                    connections[clientId] = new RTCPeerConnection(peerConfigConnections)


                    updateConnectionCount()

                    connections[clientId].onicecandidate = (event) => {
                        if (event.candidate) {
                            socketRef.current.emit("signal", clientId, JSON.stringify({ ice: event.candidate }))
                        }
                    }

                    connections[clientId].onaddstream = (event) => {
                        const alreadyExists = videoRef.current.find((video) => video.socketId === clientId)
                        if (alreadyExists) {
                            setVideos((prev) => {
                                const updated = prev.map((video) =>
                                    video.socketId === clientId ? { ...video, stream: event.stream } : video,
                                )
                                videoRef.current = updated
                                return updated
                            })
                        } else {
                            const newVideo = {
                                socketId: clientId,
                                stream: event.stream,
                                autoPlay: true,
                                playsInline: true,
                            }
                            setVideos((prev) => {
                                const updated = [...prev, newVideo]
                                videoRef.current = updated
                                return updated
                            })
                        }
                    }

                    if (window.localStream) {
                        connections[clientId].addStream(window.localStream)
                    } else {
                        window.localStream = blackSilence()
                        connections[clientId].addStream(window.localStream)
                    }
                })


                if (id === socketIdRef.current) {
                    for (const peerId in connections) {
                        if (peerId === socketIdRef.current) continue
                        try {
                            connections[peerId].addStream(window.localStream)
                        } catch (e) { }
                        connections[peerId].createOffer().then((description) => {
                            connections[peerId].setLocalDescription(description).then(() => {
                                socketRef.current.emit("signal", peerId, JSON.stringify({ sdp: connections[peerId].localDescription }))
                            })
                        })
                    }
                }
            })
        })
    }

    const connect = () => {
        setAskForUsername(false)
        connectToSocketServer()
    }

    function handlevideo() {
        if (window.localStream) {
            const videoTrack = window.localStream.getVideoTracks()[0]
            if (videoTrack) {
                videoTrack.enabled = !videoTrack.enabled
                setVideo(videoTrack.enabled)
            }
        }
    }

    function handleaudio() {
        if (window.localStream) {
            const audioTrack = window.localStream.getAudioTracks()[0]
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled
                setAudio(audioTrack.enabled)
            }
        }
    }

    async function handleScreenShare() {
        if (!screen) {
            try {
                const displayStream = await navigator.mediaDevices.getDisplayMedia({
                    video: true,
                    audio: true,
                })
                replaceStream(displayStream)
                displayStream.getVideoTracks()[0].onended = () => {
                    stopScreenShare()
                }
                setScreen(true)
            } catch (e) {
                console.log(e)
            }
        } else {
            stopScreenShare()
        }
    }

    function replaceStream(newStream) {
        Object.values(connections).forEach((pc) => {
            const senders = pc.getSenders()
            senders.forEach((sender) => {
                if (sender.track && sender.track.kind === "video") {
                    const newTrack = newStream.getVideoTracks()[0]
                    if (newTrack) sender.replaceTrack(newTrack)
                }
                if (sender.track && sender.track.kind === "audio") {
                    const newTrack = newStream.getAudioTracks()[0]
                    if (newTrack) sender.replaceTrack(newTrack)
                }
            })
        })
        window.localStream = newStream
        localVideoRef.current.srcObject = newStream
    }

    async function stopScreenShare() {
        if (window.localStream) {
            window.localStream.getTracks().forEach((track) => track.stop())
        }
        const camMicStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        })
        if (!video) {
            const videoTrack = camMicStream.getVideoTracks()[0]
            if (videoTrack) videoTrack.enabled = video
        }
        if (!audio) {
            const audioTrack = camMicStream.getAudioTracks()[0]
            if (audioTrack) audioTrack.enabled = audio
        }
        replaceStream(camMicStream)
        setScreen(false)
    }

    function handleEndCall() {
        if (window.localStream) {
            window.localStream.getTracks().forEach((track) => track.stop())
        }
        for (const id in connections) {
            connections[id].close()
        }
        connections = {}

        updateConnectionCount()
        nav("/home")

        if (socketRef.current) {
            socketRef.current.disconnect()
        }
        window.location.reload()

    }

    return (
        <>
            <div className={`meeting-container ${chatOpen ? "chat-open" : ""} ${participants ? "participants-open" : ""}`}>



                {askForUsername ? (

                    <div className="lobby">
                        <div className="meeting-id-box-lobby">
                            <span className="meeting-id-text">
                                Meeting ID: {meetingId}
                            </span>
                            <button
                                className="copy-btn"
                                onClick={() => {
                                    navigator.clipboard.writeText(meetingId);
                                    toast.success("Meeting ID copied!");
                                }}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        </div>

                        <div className="lobby-header">
                            <FontAwesomeIcon icon={faUsers} className="lobby-icon" />
                            <h1 className="lobby-title">Join Meeting</h1>
                            <p className="lobby-subtitle">Enter your details to join the video call</p>
                        </div>
                        <div className="lobby-content">
                            <div className="lobby-video-section">
                                <div className="local-video-preview">
                                    <video ref={localVideoRef} autoPlay muted className="local-video" />
                                    <div className="video-overlay">
                                        <span className="video-label">Your Camera</span>
                                    </div>
                                </div>
                                <div className="controls-lobby">
                                    <button
                                        className={`control-btn ${video ? "active" : "inactive"}`}
                                        onClick={handlevideo}
                                        title={video ? "Turn off camera" : "Turn on camera"}
                                    >
                                        <FontAwesomeIcon icon={video ? faVideo : faVideoSlash} />
                                    </button>
                                    <button
                                        className={`control-btn ${audio ? "active" : "inactive"}`}
                                        onClick={handleaudio}
                                        title={audio ? "Mute microphone" : "Unmute microphone"}
                                    >
                                        <FontAwesomeIcon icon={audio ? faMicrophone : faMicrophoneSlash} />
                                    </button>
                                </div>
                            </div>
                            <div className="lobby-form">
                                <div className="input-group">
                                    <label htmlFor="username">Display Name</label>
                                    <input
                                        id="username"
                                        className="lobby-input"
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Enter your name"
                                        maxLength={50}
                                    />
                                </div>
                                <button className="lobby-button" onClick={connect} disabled={!username.trim()}>
                                    <FontAwesomeIcon icon={faSignInAlt} />
                                    Join Meeting
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>

                        <div className="video-section">
                            <div className="meeting-id-box-meeting">
                                <span className="meeting-id-text">
                                    Meeting ID: {meetingId}
                                </span>
                                <button
                                    className="copy-btn"
                                    onClick={() => {
                                        navigator.clipboard.writeText(meetingId);
                                        toast.success("Meeting ID copied!");
                                    }}
                                >
                                    <FontAwesomeIcon icon={faCopy} />
                                </button>
                            </div>
                            <div className="remote-videos">
                                {videos.map((video) => (
                                    <div key={video.socketId} className="remote-video-container">
                                        <RemoteVideo stream={video.stream} />
                                    </div>
                                ))}

                            </div>
                            <div className="local-video-container">
                                <video ref={localVideoRef} autoPlay muted className="local-video" />
                                <div className="video-label">You</div>
                            </div>
                            <div className="controls">
                                <button
                                    className={`control-btn ${video ? "active" : "inactive"}`}
                                    onClick={handlevideo}
                                    title={video ? "Turn off camera" : "Turn on camera"}
                                >
                                    <FontAwesomeIcon icon={video ? faVideo : faVideoSlash} />
                                </button>
                                <button
                                    className={`control-btn ${audio ? "active" : "inactive"}`}
                                    onClick={handleaudio}
                                    title={audio ? "Mute microphone" : "Unmute microphone"}
                                >
                                    <FontAwesomeIcon icon={audio ? faMicrophone : faMicrophoneSlash} />
                                </button>
                                <button
                                    className={`control-btn ${screen ? "active" : ""}`}
                                    onClick={handleScreenShare}
                                    title="Share screen"
                                >
                                    <FontAwesomeIcon icon={faDesktop} />
                                </button>
                                <button
                                    className={`control-btn chat-toggle ${chatOpen ? "active" : ""}`}
                                    onClick={toggleChat}
                                    title="Toggle chat"
                                >
                                    <FontAwesomeIcon icon={faComment} />
                                    {unreadCount > 0 && <span className="unread-badge">{unreadCount}</span>}
                                </button>
                                <button
                                    className={`control-btn chat-toggle ${participants ? "active" : ""}`}
                                    onClick={toggleParticipants}
                                    title="Toggle participants"
                                >
                                    <FontAwesomeIcon icon={faUsers} />
                                    {/* ✅ FIXED: Use reactive state instead of static variable */}
                                    {connectionCount > 0 && <span className="unread-badge">{connectionCount}</span>}
                                </button>
                                <button className="control-btn end-call" onClick={handleEndCall} title="End call">
                                    <FontAwesomeIcon icon={faPhone} />
                                </button>
                            </div>
                        </div>

                        {/* Chat Window */}
                        <div className={`chat-window ${chatOpen ? "open" : ""}`}>
                            <div className="chat-header">
                                <h3>In-Call Messages</h3>
                                <button onClick={toggleChat} className="close-chat">
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            </div>
                            <div className="chat-messages" ref={chatMessagesRef}>
                                {messages.map((message, index) => (
                                    <div key={index} className={`message ${message.isOwn ? "own" : "other"}`}>
                                        <div className="message-header">
                                            <span className="username">{message.username}</span>
                                            <span className="timestamp">{message.timestamp}</span>
                                        </div>
                                        <div className="message-text">{message.text}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="chat-input">
                                <input
                                    ref={chatInputRef}
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Type a message..."
                                />
                                <button onClick={sendMessage}>
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                </button>
                            </div>
                        </div>

                        {/* Participants Window */}
                        <div className={`participants-window ${participants ? "open" : ""}`}>
                            <div className="chat-header">
                                <h3>Participants</h3>
                                <span>{participantsList.length}</span>
                                <button onClick={toggleParticipants} className="close-chat">
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            </div>
                            <div className="participants-list">
                                {participantsList.map((p, index) => (
                                    <div key={p.socketId} className="participant-item">
                                        <div className="avatar" />
                                        <div className="participant-info">
                                            <div className="name">{p.name}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default VideoMeet
