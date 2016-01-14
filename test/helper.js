const EventEmitter = require('events').EventEmitter;
const redux = require('redux');
const thunkMiddleware = require('redux-thunk');

const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

const actionVerificationRedux = require('src/createAction').actionVerificationRedux;

function sampleReducer(_state, action) {
  const state = _state ? _state : {};
  return state;
}
const rootReducer = redux.combineReducers({ sampleReducer });

/**
* @desc コンポーネントのユニットテスト用reduxミドルウェア。発行されたActionを購読者に密告する
*/
function createActionSpy() {
  const spy = new EventEmitter();

  spy.onceAndNextTick = (type, listener)=> {
    const nextTickListener = ()=> {
      setTimeout(()=> {
        listener();
      }, 10);
    };
    spy.once(type, nextTickListener);
  };

  function actionInformer() {
    return next=> action=> {
      if (action.type) {
        // CIサーバー上では冗長なのでActionのログを表示しない
        // 開発環境ではテストのデバッグに有用なのでどのActionが発行されたか表示する
        if (!process.env.CI) {
          console.log('SPY:', action.type);
        }
        spy.emit(`${action.type}`, action);
      }
      return next(action);
    };
  }
  return { spy, actionInformer };
}

function createInitialStore() {
  const initialStore = {};
  const actionSpy = createActionSpy();
  const spy = actionSpy.spy;
  const actionInformer = actionSpy.actionInformer;

  const createStoreWithMiddleware = applyMiddleware(
    actionVerificationRedux,
    actionInformer,
    thunkMiddleware
  )(createStore);

  const store = createStoreWithMiddleware(rootReducer, initialStore);
  return {
    store,
    spy: spy,
  };
}

module.exports = {
  createInitialStore,
};
