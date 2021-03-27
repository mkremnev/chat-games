import { combineReducers } from 'redux';
import { chatSlice } from '@/modules/Chat/redux';
import createSagaMiddleware from 'redux-saga';
import { messageEventSaga, sendMessageSaga } from '@/modules/Chat/saga';
import { fork } from 'redux-saga/effects';
import { configureStore } from '@reduxjs/toolkit';

const SagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
	chat: chatSlice.reducer,
});

export type ChatState = ReturnType<typeof reducer>;

function* rootSaga() {
	yield fork(messageEventSaga);
	yield fork(sendMessageSaga);
}

export const store = configureStore<ChatState>({
	reducer,
	middleware: [SagaMiddleware],
});

SagaMiddleware.run(rootSaga);
