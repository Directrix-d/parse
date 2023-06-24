// Example express application adding the parse-server module to expose Parse
// compatible API routes.

// const express = require('express');
// const { ParseServer } = require('parse-server');
// const path = require('path');
// const __dirname = path.resolve();
// const http = require('http');


// const config = {
//   databaseURI: 'mongodb+srv://deepakdirectrix:root1234@cluster0.qvrflm9.mongodb.net/'
// ,
//   cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
//   appId: process.env.APP_ID || 'eqfnoenooijvjolwrjc',
//   masterKey: process.env.MASTER_KEY || 'qwertkhfouherwiouhfourwhy',
//   maxUploadSize: '20mb',
//   serverURL:
//     // ENVIRONMENT === 'production'
//     //   ? ''
//       // : 
//   'http://localhost:1337/parse',
//       liveQuery: {
//         classNames: ['_User'], // List of classes to support for query subscriptions
//       },
//       verifyUserEmails: false,
//       emailVerifyTokenValidityDuration: 2 * 60 * 60,
//       appName: 'Maxx Dashboard',
//       // emailAdapter: {
//       //   module: 'parse-smtp-template',
//       //   options: {
//       //     port: 465,
//       //     host: 'smtp.gmail.com',
//       //     user: 'vedant@xoogle.in',
//       //     password: 'randomInvalidPassword',
//       //     fromAddress: 'vedant@xoogle.in',
//       //     secure: true,
//       //     multiTemplate: true,
//       //     confirmTemplatePath: 'views/templates/verifyEmail.html',
//       //     passwordTemplatePath: 'views/templates/passwordReset.html',
//       //     passwordOptions: {
//       //       subject: 'Password recovery - Freecharge Dashboard',
//       //       btn: 'Reset Password',
//       //       body: 'sample body text',
//       //     },
//       //   },
// };
// // Client-keys like the javascript key or the .NET key are not necessary with parse-server
// // If you wish you require them, you can set them as options in the initialization above:
// // javascriptKey, restAPIKey, dotNetKey, clientKey

// export const app = express();

// // Serve static assets from the /public folder
// app.use('/public', express.static(path.join(__dirname, '/public')));

// // Serve the Parse API on the /parse URL prefix
// if (!process.env.TESTING) {
//   const mountPath = process.env.PARSE_MOUNT || '/parse';
//   const server = new ParseServer(config);
//   await server.start();
//   app.use(mountPath, server.app);
// }

// // Parse Server plays nicely with the rest of your web routes
// app.get('/', function (req, res) {
//   res.status(200).send('I dream of being a website.  Please star the parse-server repo on GitHub!');
// });

// // There will be a test page available on the /test path of your server url
// // Remove this before launching your app
// app.get('/test', function (req, res) {
//   res.sendFile(path.join(__dirname, '/public/test.html'));
// });

// if (!process.env.TESTING) {
//   const port = process.env.PORT || 1337;
//   const httpServer = http.createServer(app);
//   httpServer.listen(port, function () {
//     console.log('parse-server-example running on port ' + port + '.');
//   });
//   // This will enable the Live Query real-time server
//   await ParseServer.createLiveQueryServer(httpServer);
// }




const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const path = require('path');
const args = process.argv || [];
const test = args.some(arg => arg.includes('jasmine'));

const databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI || 'mongodb+srv://deepakdirectrix:root1234@cluster0.qvrflm9.mongodb.net/?retryWrites=true&w=majority';
var ENVIRONMENT = 'development';
ENVIRONMENT = 'production';

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}
const config = {
  databaseURI: databaseUri || 'mongodb+srv://deepakdirectrix:root1234@cluster0.qvrflm9.mongodb.net/?retryWrites=true&w=majority',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'eqadfadjovjolwrjc',
  masterKey: process.env.MASTER_KEY || 'djfopsdjfopijfoigsjrogi',
  maxUploadSize: '20mb',
  serverURL:
    ENVIRONMENT === 'production'
      ? ''
      : 'http://localhost:1337/parse',
  liveQuery: {},
};

const app = express();

app.use('/public', express.static(path.join(__dirname, '/public')));

// const mountPath = process.env.PARSE_MOUNT || '/parse';
// // Serve the Parse API on the /parse URL prefix
if (!process.env.TESTING) {
  const mountPath = process.env.PARSE_MOUNT || '/parse';
  const server = new ParseServer(config);
  server.start();
  app.use(mountPath, server.app);
}


app.get('/', function (req, res) {
  res.status(200).send('SUTRAA');
});

app.get('/test', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
});

const port = process.env.PORT || 1337;
if (!test) {
  const httpsServer = require('http').createServer(app);
  httpsServer.listen(port, function () {
    console.log('parse-server-example running on port ' + port + '.');
  });
  ParseServer.createLiveQueryServer(httpsServer);
}

module.exports = {
  app,
  config,
};