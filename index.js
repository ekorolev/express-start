
module.exports = function (opts) {
	if (!opts) opts = {

	};

	var express = require('express');
	var ejs = require('ejs-locals');
	var cookieParser = require('cookie-parser');
	var bodyParser = require('body-parser');
	var methodOverride = require('method-override');
	var session = require('express-session');
	var redis = require('redis').createClient();
	var RedisStore = require('connect-redis')(session);

	var sessionStore = new RedisStore({
		client: opts.redis ? opts.redis.client || redis : redis,
		port: opts.redis ? opts.redis.port || 3020 : 3020,
		host: opts.redis ? opts.redis.host || "localhost" : "localhost",
	});

	var app = express();

	app.engine('ejs', ejs);
	app.set('view engine', 'ejs');
	app.set('views', __dirname + '/../../views');
	app.use( express.static( __dirname + '/../../public' ));
	app.use( bodyParser({ uploadDir: __dirname + '/../../public/upload'}) );
	app.use( cookieParser() );
	app.use( methodOverride() );
	app.use( session({ secret: "asdasd", store: sessionStore }));

	return app;
}