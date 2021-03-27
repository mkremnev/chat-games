import { eventChannel } from 'redux-saga';
import { socket, SocketEvent } from '@/api/socket';
import { Message } from '@/modules/Chat/redux';

type Emitter = (message: Message) => void;

export function createAddMessageChannel() {
	const subscribe = (emitter: Emitter) => {
		socket.on(SocketEvent.message, emitter);

		return () => socket.off(SocketEvent.message, emitter);
	};

	return eventChannel(subscribe);
}
