import React, { ChangeEvent, FC, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage/useLocalStorage';
import { Button, makeStyles } from '@material-ui/core';
import NavRoom from '@/components/NavRoom';
import SelectLang from '@/components/SelectLang';
import Enlarge from '@/assets/enlarge.svg';
import Minimize from '@/assets/minimize.svg';
import SendMessageForm from '@/components/SendMessageForm';
import MessageList from '@/components/MessageList';
import { sendMessage } from '@/modules/Chat/channels';
import axios from 'axios';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { ChatState } from '@/store';
import { actions } from '@/modules/Chat/redux';

const useStyles = makeStyles(() => ({
	root: {
		width: 360,
		height: 400,
		position: 'absolute',
		bottom: 10,
		left: 10,
		backgroundColor: 'rgba(0, 0, 0, .5)',
		borderRadius: 20,
		overflow: 'hidden',
	},
	wrapper: {},
	appBar: {
		position: 'inherit',
		backgroundColor: 'rgba(0, 0, 0, .6)',
		minHeight: 40,
	},
	tabs: {
		minHeight: 40,
		maxWidth: 243,
		'& button': {
			minHeight: 40,
			padding: 0,
			minWidth: 50,
			marginRight: 15,
		},
		'& .MuiTabScrollButton-root': {
			width: 25,
		},
	},
	enlarge: {
		position: 'absolute',
		top: 5,
		right: 32,
		borderRadius: '50%',
		width: 30,
		height: 30,
		minWidth: 30,
		padding: 0,
	},
	minimize: {
		position: 'absolute',
		top: 5,
		right: 5,
		borderRadius: '50%',
		width: 30,
		height: 30,
		minWidth: 30,
		padding: 0,
	},
}));

const Chat: FC<{}> = () => {
	const classes = useStyles();
	const [username] = useLocalStorage('username', nanoid(8));
	const { skip, messages } = useSelector((state: ChatState) => state.chat);
	const { addMessage, changeSkip } = actions;
	const dispatch = useDispatch();

	const request = async (num = 0) => {
		try {
			const data = await axios
				.get(
					`https://api-23eqo.ondigitalocean.app/api/messages?skip=${num}&limit=15 `,
				)
				.then((response) => response.data);
			dispatch(addMessage([...data]));
		} catch (error) {
			console.error(error);
		}
	};

	const lazyLoad = (ev: ChangeEvent<HTMLElement>) => {
		const scrollTop = ev.target.scrollTop;

		if (!scrollTop) {
			let newSkip = skip;
			newSkip += 15;
			dispatch(changeSkip(15));
			request(newSkip);
		}
	};

	useEffect(() => {
		if (!skip) {
			request(skip);
		}
	}, []);

	return (
		<div className={classes.root}>
			<div className={classes.wrapper}>
				<NavRoom
					commonElement={
						<MessageList messages={messages} username={username} />
					}
					onScroll={(ev: ChangeEvent<HTMLElement>) => lazyLoad(ev)}
				/>
				<SelectLang />
				<Button className={classes.enlarge}>
					<Enlarge />
				</Button>
				<Button className={classes.minimize}>
					<Minimize />
				</Button>
				<SendMessageForm username={username} />
			</div>
		</div>
	);
};

export default Chat;
