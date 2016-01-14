const merge = require('lib/utils').merge;

/**
* 非同期処理に必要な定数を生成する
* @param {String} _constant 定数の名前 例: ASYNC_GET
* @return {Object} 非同期処理に必要な3つの定数 ASYNC_GET, ASYNC_GET_SUCCESS, ASYNC_GET_FAILURE
**/
function createAsyncConstants(_constant) {
  return {
    [_constant]: _constant,
    [`${_constant}_SUCCESS`]: `${_constant}_SUCCESS`,
    [`${_constant}_FAILURE`]: `${_constant}_FAILURE`,
  };
};


/**
* 4種のメソッドに必要な定数を生成する
* @param {String} rawConstants 定数の生成元となる文字列の可変長引数
* @return {
  USERS_GET,    USERS_GET_SUCCESS,    USERS_GET_FAILURE,
  USERS_POST,   USERS_POST_SUCCESS,   USERS_POST_FAILURE,
  USERS_PUT,    USERS_PUT_SUCCESS,    USERS_PUT_FAILURE,
  USERS_DELETE, USERS_DELETE_SUCCESS, USERS_DELETE_FAILURE,
  USERS_GET_COMPLETE,
};
**/
function createRESTConstants(_rawConstants) {
  const rawConstants = [_rawConstants];

  for (var i = 0; i < arguments.length; i++) {
    rawConstants.push(arguments[i]);
  }
  const RESTConstants = rawConstants.reduce((prevConstants, currentConstant)=> {
    return merge(
      createAsyncConstants(`${currentConstant}_GET`),
      createAsyncConstants(`${currentConstant}_POST`),
      createAsyncConstants(`${currentConstant}_PUT`),
      createAsyncConstants(`${currentConstant}_DELETE`),
      { [`${currentConstant}_COMPLETE`]: `${currentConstant}_COMPLETE` },
      prevConstants
    );
  }, {});
  return RESTConstants;
};

module.exports = {
  createAsyncConstants,
  createRESTConstants,
};
