/**
* @desc Actionが持つことを期待される指紋的な文字列。
*/
const actionFootprint = 'footprintstring';

const defaultPayloads = {
  payload: {}, meta: {}, isError: false,
};

/**
* @desc Actionの型を強制するために、同じ形態のActionを返すファクトリ
* @param {string} type Actionの型
* @param {Object} payload Actionに載せるデータ
* @param {Object} meta View層には流さないペイロード。エラーログの表示などに使う
* @param {Boolean} isError Error Actionのフラグ
* @return {Object} Action
*/
function createAction(type, _payloads) {
  if (!_payloads) {
    _payloads = defaultPayloads;
  }
  const payloads = _payloads;
  const payload = payloads.payload;
  const meta = payloads.meta;
  const isError = payloads.isError;

  // Action-typeには文字列型と列挙型を想定する
  if (typeof type !== 'string' && typeof type !== 'number') {
    throw new Error('Action must have action-type.');
  }

  return {
    type,
    payload,
    meta,
    isError,
    _actionFootprint: actionFootprint,
  };
}

/**
* @desc createActionを介さないActionを不正規なものとして捉えるためのミドルウェア
* @return {Function} dispatcherの間に挟まるミドルウェア関数
*/
function actionVerificationRedux() {
  return next=> action=> {
    if (!action.type) {
      return next(action);
    }

    if (action._actionFootprint !== actionFootprint) {
      throw new Error(`This Action is not correct. Action must be created by 'createAction'.`);
    }
    return next(action);
  };
}

module.exports = {
  createAction,
  actionVerificationRedux,
};
