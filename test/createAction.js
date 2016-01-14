const assert = require('assert');
const createAction = require('src/createAction').createAction;
const createInitialStore = require('test/helper').createInitialStore;

describe('Actionの生成関数', ()=> {
  const SAMPLE_ACTION = 'SAMPLE_ACTION';
  const SAMPLE_ACTION_NUM = 1;
  var store;
  var spy;
  beforeEach(()=> {
    const initialStore = createInitialStore();
    store = initialStore.store;
    spy = initialStore.spy;
  });

  it('FSAであるActionが発行できること', (done)=> {
    const sampleAction = createAction(SAMPLE_ACTION);
    spy.once(SAMPLE_ACTION, ()=> {
      assert(true);
      done();
    });
    store.dispatch((dispatch)=> dispatch(sampleAction));
  });

  it('FSAでないActionが発行できないこと', ()=> {
    var err = null;
    try {
      store.dispatch((dispatch)=> dispatch({ type: SAMPLE_ACTION }));
    } catch (error) {
      err = error.message;
    }
    assert(err !== null);
  });

  it('Actionの型として渡せるのは文字列か数値に限られること', ()=> {
    const sampleStringAction = createAction(SAMPLE_ACTION);
    const sampleNumberAction = createAction(SAMPLE_ACTION_NUM);

    assert(sampleStringAction.type === SAMPLE_ACTION);
    assert(sampleNumberAction.type === SAMPLE_ACTION_NUM);

    var err = null;
    try {
      createAction({});
    } catch (error) {
      err = error.message;
    }
    assert(err !== null);
  });
});
