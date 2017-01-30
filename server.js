/**
 * Node program to initialize the server and register the routers to serve REST calls.
 * @author Rama Raju Vatsavai <rrv.atwork@gmail.com>
 */

/** Get the Router instance for weather api */
var weatherRouter = require('./scripts/routes/weatherRoute.js');

var restify = require('restify');

/** Create a server */
var server = restify.createServer({
  name: 'myapp',
  version: '1.0.0',
  url: 'localhost'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

/** Add router to the server program */
weatherRouter.applyRoutes(server);

/** Redirect root context to static index.html file */
server.get(/.*/, restify.serveStatic({
  directory: './app',
  default: 'index.html'
}));

/** Set the application PORT number to an input value or default to 8000 */
var PORT = Number(process.argv[2]) || 8000;

/** Let the server listen on the designated PORT */
server.listen(PORT, function () {
  console.log('%s listening at %s', server.name, server.url);
});
