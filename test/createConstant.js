const assert = require('assert');
const createRESTConstants = require('lib/createConstant').createRESTConstants;

describe('定数の生成関数', ()=> {
  const TEST_ACTION_1 = 'TEST_ACTION_1';
  var testResults1;

  beforeEach(()=> {
    testResults1 = createRESTConstants(TEST_ACTION_1);
  });
  afterEach(()=> {
    testResults1 = undefined;
  });

  it('SUCCESS, FAILUREを付けたGET/POST_PUT/DELETEとCOMPLETE Actionが定義されている', ()=> {
    var length = 0;
    for (const val in testResults1) {
      if (testResults1.hasOwnProperty(val)) {
        length++;
      }
    }
    assert(length === 13);
    assert(testResults1.TEST_ACTION_1_GET === 'TEST_ACTION_1_GET');
    assert(testResults1.TEST_ACTION_1_GET_SUCCESS === 'TEST_ACTION_1_GET_SUCCESS');
    assert(testResults1.TEST_ACTION_1_GET_FAILURE === 'TEST_ACTION_1_GET_FAILURE');
    assert(testResults1.TEST_ACTION_1_POST === 'TEST_ACTION_1_POST');
    assert(testResults1.TEST_ACTION_1_POST_SUCCESS === 'TEST_ACTION_1_POST_SUCCESS');
    assert(testResults1.TEST_ACTION_1_POST_FAILURE === 'TEST_ACTION_1_POST_FAILURE');
    assert(testResults1.TEST_ACTION_1_PUT === 'TEST_ACTION_1_PUT');
    assert(testResults1.TEST_ACTION_1_PUT_SUCCESS === 'TEST_ACTION_1_PUT_SUCCESS');
    assert(testResults1.TEST_ACTION_1_PUT_FAILURE === 'TEST_ACTION_1_PUT_FAILURE');
    assert(testResults1.TEST_ACTION_1_DELETE === 'TEST_ACTION_1_DELETE');
    assert(testResults1.TEST_ACTION_1_DELETE_SUCCESS === 'TEST_ACTION_1_DELETE_SUCCESS');
    assert(testResults1.TEST_ACTION_1_DELETE_FAILURE === 'TEST_ACTION_1_DELETE_FAILURE');
    assert(testResults1.TEST_ACTION_1_COMPLETE === 'TEST_ACTION_1_COMPLETE');
  });

  it('可変長引数を受け取れる', ()=> {
    const TEST_ACTION_2 = 'TEST_ACTION_2';
    const TEST_ACTION_3 = 'TEST_ACTION_3';
    const testResults2 = createRESTConstants(TEST_ACTION_1, TEST_ACTION_2, TEST_ACTION_3);

    var length = 0;
    for (const val in testResults2) {
      if (testResults2.hasOwnProperty(val)) {
        length++;
      }
    }
    assert(length === 39);
    assert(testResults2.TEST_ACTION_1_GET === 'TEST_ACTION_1_GET');
    assert(testResults2.TEST_ACTION_1_GET_SUCCESS === 'TEST_ACTION_1_GET_SUCCESS');
    assert(testResults2.TEST_ACTION_1_GET_FAILURE === 'TEST_ACTION_1_GET_FAILURE');
    assert(testResults2.TEST_ACTION_2_GET === 'TEST_ACTION_2_GET');
    assert(testResults2.TEST_ACTION_2_GET_SUCCESS === 'TEST_ACTION_2_GET_SUCCESS');
    assert(testResults2.TEST_ACTION_2_GET_FAILURE === 'TEST_ACTION_2_GET_FAILURE');
    assert(testResults2.TEST_ACTION_3_GET === 'TEST_ACTION_3_GET');
    assert(testResults2.TEST_ACTION_3_GET_SUCCESS === 'TEST_ACTION_3_GET_SUCCESS');
    assert(testResults2.TEST_ACTION_3_GET_FAILURE === 'TEST_ACTION_3_GET_FAILURE');

    assert(testResults2.TEST_ACTION_1_COMPLETE === 'TEST_ACTION_1_COMPLETE');
    assert(testResults2.TEST_ACTION_2_COMPLETE === 'TEST_ACTION_2_COMPLETE');
    assert(testResults2.TEST_ACTION_3_COMPLETE === 'TEST_ACTION_3_COMPLETE');
  });
});
