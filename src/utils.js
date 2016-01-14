const utils = {};

utils.merge = function(into, from) {
  const context = {};
  const merged = [{}];

  for (var i = 0; i < arguments.length; i++) {
    merged.push(arguments[i]);
  }

  return Object.assign.apply(context, merged);
}

module.exports = utils;
