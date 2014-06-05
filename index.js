
module.exports = function () {
	var express = require('express');
	var ejs = require('ejs-locals');
	var cookieParser = require('cookie-parser');
	var bodyParser = require('body-parser');
	var session = require('express-session');
	var redis = require('redis').createClient();
	var RedisStore = require('connect-redis')(session);
	var sessionStore = new RedisStore({
		client: opts.redis.client || redis,
		port: opts.redis.port || 3020,
		host: opts.redis.host || "localhost",
	});

	var app = express();

	app.engine('ejs', ejs);
	app.set('view engine', ejs);
	app.use( express.static( __dirname + '../../public' ));
	app.use( bodyParser() );
	app.use( cookieParser() );
	app.use( session({ secret: "asdasd", store: sessionStore }));

	return app;
}