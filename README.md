# redux-util

Utility tools for flux based project.
It has purpose that do not rely on babel(or other transpiler).


## Usage

createAction

```js
// ActionCreator
const createAction = require('@kogai/redux-utils').createAction;
const sampleAction = createAction({ type: 'SAMPLE_ACTION' });

// Redux-Middleware
const actionVerification = require('@kogai/redux-utils').actionVerification;
const createStoreWithMiddleware = applyMiddleware(
  actionVerification
)(createStore);
```
