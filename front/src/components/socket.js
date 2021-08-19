import socketIOClient from "socket.io-client";

const ENDPOINT = "https://devhive-sidharth3000.vercel.app";

const socket = socketIOClient(ENDPOINT);

export default socket;