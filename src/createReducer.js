import ReducerFactory from './ReducerFactory';

export default function createReducer(initialState, handlers) {
    return (new ReducerFactory())
        .setInitialState(initialState)
        .setHandlers(handlers)
        .getReducer();
}
