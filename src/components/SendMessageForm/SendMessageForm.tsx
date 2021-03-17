import React, {
	ChangeEvent,
	FC,
	FormEvent,
	KeyboardEvent,
	useState,
} from 'react';
import { Picker } from 'emoji-mart';
import { Button, makeStyles, TextField } from '@material-ui/core';
import Emoji from '@/assets/emodjis.svg';
import { MessageType } from '@/hooks/useChat/useChat';

const useStyles = makeStyles(() => ({
	root: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		backgroundColor: 'rgba(0, 0, 0, .5)',
		width: '100%',
		height: 40,
	},
	input: {
		padding: '0 20px 0 15px',
		'& input': {
			color: '#fff',
			padding: '12px 0',
			'&::placeholder': {
				color: 'rgba(255, 255, 255, .5)',
			},
		},
	},
	button: {
		position: 'absolute',
		right: 0,
		top: 0,
	},
}));

export type SendMessageFormProps = {
	username: string;
	sendMessage: ({}: MessageType) => void;
};

export const SendMessageForm: FC<SendMessageFormProps> = ({
	username,
	sendMessage,
}) => {
	const classes = useStyles();
	const [showEmoji, setChangeShowEmoji] = useState(false);
	const [text, setText] = useState('');

	const handlerChangeText = (ev: ChangeEvent<HTMLInputElement>) =>
		setText(ev.target.value);

	const handlerChangeShowEmoji = () =>
		setChangeShowEmoji((value: boolean) => !value);

	const handlerEmojiSelect = (ev: any) =>
		setText((text) => (text += ev.native));

	const submitMessage = () => {
		const trimmed = text.trim();

		if (trimmed) {
			sendMessage({ senderName: username, messageText: text });
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
