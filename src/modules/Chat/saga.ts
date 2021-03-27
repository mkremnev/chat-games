import { take, call, put } from 'redux-saga/effects';
import { createAddMessageChannel } from './channels';
import { actions } from './redux';

export function* messageEventSaga() {
	const channel = yield call(createAddMessageChannel);

	while (true) {
		const message = yield take(channel);

		const action = actions.addMessage(message);

		yield put(action);
	}
}
