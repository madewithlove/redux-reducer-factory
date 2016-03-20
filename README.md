# Redux Reducer Factory

A small helper to easily create Redux reducers, inspired by the [documentation](https://github.com/reactjs/redux/blob/master/docs/recipes/ReducingBoilerplate.md#generating-reducers) and taken an inch further.

## Installation

```bash
$ npm install redux-reducer-factory --save
```

## Usage

### Basic usage

**UserReducer.js**
```js
import {createReducer} from 'redux-reducer-factory';
import {SET_USER, SOME_ACTION, OTHER_ACTION} from '../Actions';

export default createReducer({}, {

    // Map a handler to the SET_USER action
    [SET_USER]: (state, action) => action.user,
    
    // You can also map a handler to multiple actions
    [[SOME_ACTION, OTHER_ACTION]]: (state, action) => action.someData,
    
});
```

### Sanitizers

A sanitizer is a function that will be applied on the initial state to shape it a certain way. 
By default `Immutable.fromJS` is used so that any state passed is immutable, but you can easily change that using the `createReducerWithSanitizer` function:

```js
import {createReducerWithSanitizer} from 'redux-reducer-factory';
import Immutable from 'immutable';

// Ensure that our user has certain attributes
const sanitizer = function(initialState) {
    initialState = new Immutable.Map(initialState);
    initialState = initialState.update('some_attribute', attribute => attribute || 'default');
    
    return initialState;
};

export default createReducerWithSanitizer({}, sanitizer, {
    // Handlers
});
```

The sanitizer is only applied to the initial state, but you can also use it to sanitize the result of some actions.
For this, a third argument `sanitize` is passed to the handlers:

```js
export default createReducerWithSanitizer({}, sanitizer, {
    SET_USER: (state, action, sanitize) => sanitize(action.user),
});
```

### Using the factory itself

Both `createReducer` and `createReducerWithSanitizer` use the `ReducerFactory` underneath.
It's a fluent class which allows you to customize your reducer more in depth:
 
```js
import {ReducerFactory} from 'redux-reducer-factory';
import Immutable from 'immutable';

export default (new ReducerFactory())
    .setInitialState({})
    .setSanitizer((state) => new Immutable.Set(state))
    .setHandlers({
        SET_USER: (state, action) => action.user,
    })
    .getReducer();
```

## Contributing

```bash
npm run lint
npm test
```
