import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { Picker } from 'emoji-mart';
import { Button, makeStyles, TextField } from '@material-ui/core';
import Emoji from '@/assets/emodjis.svg';
import { MessageType } from '@/hooks/useChat/useChat';
import { useDispatch } from 'react-redux';
import { actions } from '@/modules/Chat/redux';
import { nanoid } from '@reduxjs/toolkit';

const useStyles = makeStyles(() => ({
	root: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		backgroundColor: 'rgba(0, 0, 0, .5)',
		width: '100%',
		height: 40,
		'& .emoji-mart-scroll': {
			'&::-webkit-scrollbar': {
				width: 0,
			},
		},
	},
	input: {
		padding: '0 20px 0 15px',
		'& input': {
			color: '#fff',
			padding: '12px 18px 12px 0',
			'&::placeholder': {
				color: 'rgba(255, 255, 255, .5)',
			},
		},
	},
	button: {
		position: 'absolute',
		right: -8,
		top: 3,
	},
}));

export type SendMessageFormProps = {
	username: string;
};

export const SendMessageForm: FC<SendMessageFormProps> = ({ username }) => {
	const classes = useStyles();
	const [showEmoji, setChangeShowEmoji] = useState(false);
	const [text, setText] = useState('');
	const { sendMessage } = actions;
	const dispatch = useDispatch();

	const handlerChangeText = (ev: ChangeEvent<HTMLInputElement>) =>
		setText(ev.target.value);

	const handlerChangeShowEmoji = () =>
		setChangeShowEmoji((value: boolean) => !value);

	const handlerEmojiSelect = (ev: any) =>
		setText((text) => (text += ev.native));

	const submitMessage = () => {
		const trimmed = text.trim();

		if (trimmed) {
			dispatch(
				sendMessage({
					id: nanoid(16),
					from: username,
					text: text,
					createdAt: String(new Date()),
				}),
			);
			setText('');
		}
	};

	const keyPress = (ev: KeyboardEvent<HTMLDivElement>): void => {
		if (ev.key === 'Enter') {
			ev.preventDefault();
			submitMessage();
		}
	};

	return (
		<>
			<form className={classes.root}>
				<TextField
					placeholder="Напишите сообщение..."
					fullWidth
					onChange={handlerChangeText}
					value={text}
					className={classes.input}
					onKeyPress={(ev) => keyPress(ev)}
					inputProps={{
						maxLength: 200,
					}}
				/>

				<Button
					onClick={handlerChangeShowEmoji}
					className={classes.button}
				>
					<Emoji />
				</Button>
				{showEmoji && (
					<Picker
						onSelect={handlerEmojiSelect}
						emojiSize={16}
						sheetSize={64}
						theme="dark"
						showPreview={false}
						style={{
							position: 'absolute',
							bottom: 40,
							left: 0,
							height: 245,
							overflow: 'hidden',
						}}
						perLine={12}
						showSkinTones={false}
					/>
				)}
			</form>
		</>
	);
};
