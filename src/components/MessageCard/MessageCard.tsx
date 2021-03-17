import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CardHeader } from '@material-ui/core';

const useStyles = makeStyles({
	root: {
		maxWidth: 265,
		display: 'flex',
		flexWrap: 'wrap',
		backgroundColor: 'transparent',
		boxShadow: 'none',
		alignItems: 'center',
	},
	title: {
		fontSize: 14,
		flexBasis: '100%',
		margin: '0 0 6px 0',
	},
	content: {
		marginBottom: 12,
		backgroundColor: '#fff',
		borderRadius: '20px 20px 20px 0px;',
		padding: '11px 12px',
		margin: '0 10px 0 0',
	},
	test: {},
	clock: {},
});

export type MsgType = {
	id: string;
	from: string;
	text: string;
	createdAt: string;
};

export type MessageCardProps = {
	username: string;
	msg: MsgType;
};

export const MessageCard: FC<MessageCardProps> = ({ msg, username }) => {
	const classes = useStyles();
	const { from, text, createdAt } = msg;

	const time = new Date(createdAt);

	return (
		<Card className={classes.root}>
			<div className={classes.content}>
				<h3 className={classes.title}>{from}</h3>
				<div className={classes.text}>{text}</div>
			</div>
			<div
				className={classes.clock}
			>{`${time.getHours()}:${time.getMinutes()}`}</div>
		</Card>
	);
};
