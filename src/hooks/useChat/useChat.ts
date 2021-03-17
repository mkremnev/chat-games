import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useLocalStorage } from '@/hooks/useLocalStorage/useLocalStorage';
import { nanoid } from '@reduxjs/toolkit';

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

export type Messages = {
	userId: string;
	message: Message;
};

export const useChat = (roomId: string) => {
	const [messages, setMessages] = useState<Messages[]>([]);

	const [userId] = useLocalStorage('userId', nanoid(8));

	const [username] = useLocalStorage('username');

	const socketRef = useRef<Socket | null>(null);

	useEffect(() => {
		socketRef.current = io(SERVER_URL, {
			query: { roomId },
			transports: ['websocket'],
			upgrade: false,
		});

		socketRef.current.emit('message');
		socketRef.current.on('messages', (messages) => {
			const newMessages = messages.map((msg: Messages) =>
				msg.userId === userId ? { ...msg, currentUser: true } : msg,
			);
			setMessages(newMessages);
		});

		return () => {
			socketRef.current!.disconnect();
		};
	}, [roomId, userId, username]);

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
	};

	return { messages, sendMessage };
};
