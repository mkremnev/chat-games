import Home from '@/modules/Home/Home';
import ChatRoom from '@/modules/ChatRoom/ChatRoom';

export const routes = [
	{ path: '/', name: 'Home', Component: Home },
	{ path: '/:roomId', name: 'ChatRoom', Component: ChatRoom },
];
