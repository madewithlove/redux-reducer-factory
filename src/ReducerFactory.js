import Immutable from 'immutable';

export default class ReducerFactory {

    /**
     * @type {Array|Object}
     */
    initialState = [];

    /**
     * @type {Object}
     */
    handlers = {};

    /**
     * @param {*} state
     *
     * @returns {Immutable.Iterable}
     */
    sanitizer = Immutable.fromJS;

    //////////////////////////////////////////////////////////////////////
    ////////////////////////////// OPTIONS ///////////////////////////////
    //////////////////////////////////////////////////////////////////////

    /**
     * @param {Function} sanitizer
     *
     * @returns {ReducerFactory}
     */
    setSanitizer(sanitizer) {
        this.sanitizer = sanitizer;

        return this;
    }

    /**
     * @param {*} state
     *
     * @returns {ReducerFactory}
     */
    setInitialState(state) {
        this.initialState = state;

        return this;
    }

    /**
     * @param {Object} handlers
     *
     * @returns {ReducerFactory}
     */
    setHandlers(handlers) {
        // Unwrap actions
        Object.keys(handlers).forEach(actions => {
            actions.split(',').forEach(action => {
                this.handlers[action] = handlers[actions];
            });
        });

        return this;
    }

    //////////////////////////////////////////////////////////////////////
    ////////////////////////////// FACTORY ///////////////////////////////
    //////////////////////////////////////////////////////////////////////

    /**
     * Get the final reducer
     *
     * @returns {Function}
     */
    getReducer() {
        return (state = this.initialState, action) => {
            state = this.sanitizer(state);

            // Look for a direct match
            if (this.handlers.hasOwnProperty(action.type)) {
                return this.handlers[action.type](state, action, this.sanitizer);
            }

            return state;
        };
    }

}
