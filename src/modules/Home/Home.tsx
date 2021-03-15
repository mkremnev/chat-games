import React, {
	useState,
	useRef,
	FC,
	Fragment,
	ChangeEvent,
	FormEvent,
} from 'react';
import { Link } from 'react-router-dom';
import { useLocalStorage } from '@/hooks/useLocalStorage/useLocalStorage';

const Home: FC<{}> = () => {
	const [username, setUsername] = useLocalStorage('username', 'Maxim');
	const [roomId, setRoomId] = useState('common');
	const linkRef = useRef<HTMLFormElement>(null);

	const handleChangeRoom = (ev: ChangeEvent<HTMLSelectElement>) => {
		setRoomId(ev.target.value);
	};

	const handleSubmit = (ev: FormEvent) => {
		ev.preventDefault();
		linkRef.current!.click();
	};

	return <Fragment />;
};

export default Home;
