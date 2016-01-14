const createAction = require('./createAction');
const createConstant = require('./createConstant');

module.exports =  {
  createAction: createAction.createAction,
  actionVerification: createAction.actionVerification,
  createAsyncConstants: createConstant.createAsyncConstants,
  createRESTConstants: createConstant.createRESTConstants,
};
