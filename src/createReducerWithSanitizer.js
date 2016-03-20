import ReducerFactory from './ReducerFactory';

export default function createReducer(initialState, sanitizer, handlers) {
    return (new ReducerFactory())
        .setInitialState(initialState)
        .setSanitizer(sanitizer)
        .setHandlers(handlers)
        .getReducer();
}
