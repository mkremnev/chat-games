import React, { FC } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage/useLocalStorage';
import { makeStyles } from '@material-ui/core';
import NavRoom from '@/components/NavRoom';

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
}));

const Chat: FC<{}> = () => {
	const classes = useStyles();
	const [username, setUsername] = useLocalStorage('username', 'Maxim');

	return (
		<div className={classes.root}>
			<div>
				<NavRoom />
			</div>
		</div>
	);
};

export default Chat;
