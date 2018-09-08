/**
 * Export handler function as module
 */
module.exports.handleErrorConnect = handleErrorConnect;

/**
 * Handler an error of connecting database
 * 
 * @param {any} err
 * 
 * @return {Object}
 */
function handleErrorConnect(err) {
  return {
    message: 'Error while connect to database',
    err,
    status: 500
  };
}