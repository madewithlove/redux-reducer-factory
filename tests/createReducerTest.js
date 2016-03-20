import {createReducer} from '../src';
import expect from 'expect';

describe('createReducer', () => {
    it('can create reducer', () => {
        const action = {type: 'FOOBAR', foo: 'bar'};
        const reducer = createReducer({}, {
            FOOBAR: (state, action) => action.foo,
        });

        expect(reducer(undefined, action)).toEqual('bar');
    });
});
