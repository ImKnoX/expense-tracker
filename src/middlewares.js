/**
 * The function `notFound` is a middleware in JavaScript that renders a 'not-found' page with the
 * original URL when a 404 error occurs.
 * @param req - The `req` parameter in the `notFound` function represents the request object, which
 * contains information about the HTTP request that was made to the server. This object includes
 * properties such as the request URL, headers, parameters, query strings, and more. In this case, the
 * `req` object
 * @param res - The `res` parameter in the `notFound` function is the response object in Express.js. It
 * is used to send a response back to the client making the request. In this case, it is being used to
 * set the status code to 404 (Not Found) and render a 'not
 * @param next - The `next` parameter in an Express middleware function is a callback function that is
 * used to pass control to the next middleware function in the stack. It is typically used to trigger
 * the next middleware function in the chain. If an error occurs or if the current middleware function
 * cannot handle the request, you can
 */
function notFound(req, res, next) {
    res.status(404).render('not-found', {
        url: req.originalUrl
    })
}

/**
 * The errorHandler function handles errors by rendering an error page with relevant information.
 * @param req - The `req` parameter typically represents the HTTP request object, which contains
 * information about the incoming request such as headers, parameters, and body data. It is used to
 * access and manipulate the request details in the middleware function.
 * @param res - The `res` parameter in the `errorHandler` function is the response object that
 * represents the HTTP response that an Express app sends when it receives an HTTP request. It is used
 * to send data back to the client, such as setting the status code, rendering a view, or sending JSON
 * data.
 * @param next - The `next` parameter in the `errorHandler` function is a callback function that is
 * used to pass control to the next middleware function in the stack. It is typically used in
 * Express.js middleware functions to move to the next middleware in the chain. If an error occurs in
 * the current middleware function,
 */
function errorHandler(req, res, next) {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.render('error-page', {
       message: err.message,
       stack: process.env.NODE_ENV === 'development' ? '🥞' : err.stack
    })
}

module.exports = {
    notFound,
    errorHandler
}