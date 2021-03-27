import { take, call, put } from 'redux-saga/effects';
import { createAddMessageChannel } from './channels';
import { actions } from './redux';

export function* messageEventSaga() {
	const channel = yield call(createAddMessageChannel);

	while (true) {
		const message = yield take(channel);

		const addMessage = actions.addMessage(message);
		const changeSkip = actions.changeSkip(1);

		yield put(addMessage);
		yield put(changeSkip);
	}
}

export function* sendMessageSaga() {
	while (true) {
		yield take(actions.sendMessage.type);
		const changeSkip = actions.changeSkip(1);
		yield put(changeSkip);
	}
}
