import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import IconAda from '@/assets/iconAda.svg';
import clsx from 'clsx';
import IconBtc from '@/assets/iconBtc.svg';
import AdminBadge from '@/assets/adminbadge.svg';
import moment from 'moment';

const useStyles = makeStyles({
	root: {
		maxWidth: 340,
		display: 'flex',
		flexWrap: 'wrap',
		backgroundColor: 'transparent',
		boxShadow: 'none',
		alignItems: 'center',
	},
	rootReverse: {
		flexDirection: 'row-reverse',
	},
	wrapperTitle: {
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'end',
		margin: '0 0 6px 0',
		lineHeight: 1,
	},
	iconLeft: {
		marginRight: 5,
	},
	iconRight: {
		marginRight: 5,
	},
	userLevel: {
		color: '#23B838',
	},
	title: {
		fontSize: 13,
		color: '#999999',
		textAlign: 'center',
		margin: 0,
		marginRight: 5,
	},
	content: {
		backgroundColor: '#fff',
		borderRadius: '20px 20px 20px 0px;',
		padding: '11px 12px',
		margin: '0 10px 12px 0',
		minWidth: 150,
		maxWidth: '80%',
	},
	contentReverse: {
		margin: '0 0 12px 10px',
		borderRadius: ' 20px 20px 0px 20px',
		backgroundColor: '#212121',
		color: '#ffffff',
	},
	text: {
		color: '#rgb(0,0,0)',
		wordBreak: 'break-word',
		overflowWrap: 'break-word',
	},
	clock: {
		color: 'rgba(255,255,255, .4)',
	},
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

	const time = moment(createdAt).utc().format('HH:mm');
	const firstUpper = from[0].toUpperCase() + from.slice(1);
	const level = Math.floor(Math.random() * Math.floor(10));

	const user = username === msg.from;

	return (
		<Card className={clsx(classes.root, user && classes.rootReverse)}>
			<div
				className={clsx(
					classes.content,
					user && classes.contentReverse,
				)}
			>
				{username !== msg.from ? (
					<div className={classes.wrapperTitle}>
						<span className={classes.iconLeft}>
							<IconAda />
						</span>
						<h3 className={classes.title}>{firstUpper}</h3>
						{username === 'admin' ? (
							<span className={classes.iconRight}>
								<AdminBadge />
							</span>
						) : (
							''
						)}
						<span className={classes.userLevel}>{level}</span>
					</div>
				) : (
					''
				)}
				<div className={classes.text}>{text}</div>
			</div>
			<div className={classes.clock}>{time}</div>
		</Card>
	);
};
