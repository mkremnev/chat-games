import React, { FC, useEffect, useRef } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { MessageCard } from '@/components/MessageCard/MessageCard';
import { Message } from '@/hooks/useChat/useChat';

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

export type MessageListProps = {
	messages: Message[];
	username: string;
};

export const MessageList: FC<MessageListProps> = ({ messages, username }) => {
	const classes = useStyles();

	const messageEndRef = useRef<null | HTMLElement>(null);

	useEffect(() => {
		messageEndRef.current!.scrollIntoView({
			behavior: 'smooth',
		});
	});

	return (
		<List component="ul" className={classes.root}>
			{messages.map((msg: Message) => (
				<MessageCard key={msg.id} username={username} msg={msg} />
			))}
			<span ref={messageEndRef} />
		</List>
	);
};
