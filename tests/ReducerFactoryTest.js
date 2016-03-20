import ReducerFactory from '../src/ReducerFactory';
import Immutable from 'immutable';
import expect from 'expect';

describe('ReducerFactory', () => {
    let factory;
    let action = {type: 'FOOBAR', foo: 'bar'};

    beforeEach(() => {
        factory = new ReducerFactory();
    });

    it('can create basic reducer', () => {
        const reducer = factory.getReducer();

        expect(reducer(undefined, action)).toBeA(Immutable.List);
    });

    it('can set handlers', () => {
        const reducer = factory
            .setHandlers({FOOBAR: (state, action) => action.foo})
            .getReducer();

        expect(reducer(undefined, action)).toEqual('bar');
    });

    it('can set sanitizer', () => {
        const reducer = factory
            .setSanitizer(state => new Immutable.Set(state))
            .getReducer();

        expect(reducer(undefined, action)).toBeA(Immutable.Set);
    });

    it('can set initial state', () => {
        const reducer = factory
            .setInitialState({})
            .getReducer();

        expect(reducer(undefined, action)).toBeA(Immutable.Map);
    });

    it('can map multiple actions to one handler', () => {
       const reducer = factory
           .setHandlers({
               [['FOOBAR', 'BAZ']]: (state, action) => action.foo,
           })
           .getReducer();

        expect(reducer(undefined, action)).toEqual('bar');
        expect(reducer(undefined, {...action, type: 'BAZ'})).toEqual('bar');
        expect(reducer(undefined, {...action, type: 'BAR'})).toBeA(Immutable.List);
    });

    it('can sanitize the result of some actions', () => {
        const action = {type: 'SET_USER', user: {}};
        const reducer = factory
            .setSanitizer(state => {
                state = Immutable.fromJS(state);
                state = state.set('foo', 'bar');

                return state;
            })
            .setHandlers({SET_USER: (state, action, sanitizer) => sanitizer(action.user)})
            .getReducer();

        expect(reducer({}, action).toJS()).toEqual({foo: 'bar'});
    });
});
