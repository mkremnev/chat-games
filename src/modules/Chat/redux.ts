import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Message = {
	id: string;
	from: string;
	text: string;
	createdAt: string;
};

export type chatState = {
	skip: number;
	messages: Message[];
	loading: boolean;
};

export const initialState: chatState = {
	skip: 0,
	messages: [],
	loading: false,
};

export const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		changeSkip: (state, { payload }: PayloadAction<number>) => ({
			...state,
			skip: state.skip + payload,
		}),
		addMessage: (
			state,
			{ payload }: PayloadAction<Message | Message[]>,
		) => {
			if (Array.isArray(payload)) {
				return {
					...state,
					messages: [...payload, ...state.messages],
				};
			}
			return {
				...state,
				messages: [...state.messages, payload],
			};
		},
		sendMessage: (state, { payload }: PayloadAction<Message>) => ({
			...state,
			messages: [...state.messages, payload],
		}),
	},
});

export const { reducer, actions } = chatSlice;
