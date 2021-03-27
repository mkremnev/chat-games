import { io, Socket } from 'socket.io-client';

const SERVER_URL = 'wss://api-23eqo.ondigitalocean.app';

export const socket: Socket = io(SERVER_URL, {
	transports: ['websocket'],
	upgrade: false,
});

export const SocketEvent = {
	message: 'message',
};
