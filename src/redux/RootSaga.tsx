import { takeEvery } from 'redux-saga/effects';

function* rootSaga() {
    yield takeEvery('SET_BAG', (asd: unknown) => console.warn('pull from db here for ', asd));
}

export default rootSaga;