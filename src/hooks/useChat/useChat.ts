import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useLocalStorage } from '@/hooks/useLocalStorage/useLocalStorage';

const SERVER_URL = 'wss://api-23eqo.ondigitalocean.app';

export type Message = {
	id: string;
	from: string;
	text: string;
	createdAt: string;
};

export type MessageType = {
	messageText: string;
	senderName: string;
};

export const useChat = (roomId: string) => {
	const [messages, setMessages] = useState<Message[]>([]);

	const [username] = useLocalStorage('username');

	const socketRef = useRef<Socket | null>(null);

	useEffect(() => {
		socketRef.current = io(SERVER_URL, {
			transports: ['websocket'],
			upgrade: false,
		});

		socketRef.current.emit('message');
		socketRef.current.on('message', (message: Message) => {
			setMessages([...messages, message]);
		});

		return () => {
			socketRef.current!.disconnect();
		};
	}, [roomId, username, messages]);

	const sendMessage = ({ messageText, senderName }: MessageType) => {
		const message = {
			from: senderName,
			text: messageText,
		};

		socketRef.current!.emit('message', message, (err: Error) => {
			if (err) {
				console.error(err);
			} else {
				// eslint-disable-next-line no-console
				console.log('Success');
			}
		});

		const createAt = new Date();
		setMessages([
			...messages,
			{ ...message, createdAt: createAt.toString(), id: '123123' },
		]);
	};

	return { messages, sendMessage };
};
