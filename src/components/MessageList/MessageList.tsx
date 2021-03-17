import React, { FC, useRef } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { MessageCard } from '@/components/MessageCard/MessageCard';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
			maxWidth: 360,
			backgroundColor: 'transparent',
		},
		nested: {
			paddingLeft: theme.spacing(4),
		},
	}),
);

export const MessageList: FC<{}> = ({ messages, username }) => {
	const classes = useStyles();

	const messageEndRef = useRef(null);

	return (
		<List component="ul" className={classes.root}>
			{messages.map((msg) => (
				<MessageCard key={msg.id} username={username} msg={msg} />
			))}
			<span ref={messageEndRef} />
		</List>
	);
};
