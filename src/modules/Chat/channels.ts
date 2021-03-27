import { eventChannel } from 'redux-saga';
import { socket, SocketEvent } from '@/api/socket';
import { Message } from '@/modules/Chat/redux';
import { MessageType } from '@/hooks/useChat/useChat';

type Emitter = (message: Message) => void;

export function createAddMessageChannel() {
	const subscribe = (emitter: Emitter) => {
		socket.on(SocketEvent.message, emitter);

		return () => socket.off(SocketEvent.message, emitter);
	};

	return eventChannel(subscribe);
}

export const sendMessage = ({ messageText, senderName }: MessageType) => {
	const message = {
		from: senderName,
		text: messageText,
	};

	socket.emit('message', message, (err: Error) => {
		if (err) {
			console.error(err);
		} else {
			// eslint-disable-next-line no-console
			console.log('Success');
		}
	});

	return message;
};
