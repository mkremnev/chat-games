import React, { FC } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage/useLocalStorage';
import { Button, makeStyles } from '@material-ui/core';
import NavRoom from '@/components/NavRoom';
import SelectLang from '@/components/SelectLang';
import Enlarge from '@/assets/enlarge.svg';
import Minimize from '@/assets/minimize.svg';
import SendMessageForm from '@/components/SendMessageForm';
import { useChat } from '@/hooks/useChat/useChat';

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
	const [username] = useLocalStorage('username', 'Maxim');
	const { messages, sendMessage } = useChat('common');

	return (
		<div className={classes.root}>
			<div className={classes.wrapper}>
				<NavRoom />
				<SelectLang />
				<Button className={classes.enlarge}>
					<Enlarge />
				</Button>
				<Button className={classes.minimize}>
					<Minimize />
				</Button>
				<SendMessageForm
					username={username}
					sendMessage={sendMessage}
				/>
			</div>
		</div>
	);
};

export default Chat;
