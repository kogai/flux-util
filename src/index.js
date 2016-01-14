const createAction = require('./createAction');
const createConstant = require('./createConstant');

module.exports =  {
  createAction: createAction.createAction,
  actionVerificationRedux: createAction.actionVerificationRedux,
  createAsyncConstants: createConstant.createAsyncConstants,
  createRESTConstants: createConstant.createRESTConstants,
};
