import { fetchProducts, findProduct, addProduc, updateProduc, deleteProduc } from './service'

const Model = {
    namespace: 'product',
    state: {},
    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(fetchProducts, payload);
            yield put({
                type: 'set',
                payload: response,
            });
        },
        *find({ payload }, { call, put }) {
            const response = yield call(findProduct, payload);
            yield put({
                type: 'set',
                payload: { current: response },
            });
            return Promise.resolve(response);
        },
        *add({ payload, callback }, { call, put }) {
            const response = yield call(addProduc, payload);
            yield put({
                type: 'set',
                payload: response,
            });
            return Promise.resolve(response);
        },
        *update({ payload, callback }, { call, put }) {
            const response = yield call(updateProduc, payload);
            yield put({
                type: 'set',
                payload: response,
            });
            return Promise.resolve(response);
        },
        *delete({ payload, callback }, { call, put }) {
            const response = yield call(deleteProduc, payload);
            yield put({
                type: 'set',
                payload: response,
            });
            return Promise.resolve(response);
        },
    },
    reducers: {
        set(state, action) {
            return { ...state, product: { ...state.product, ...action.payload } };
        }
    }
};
export default Model;

