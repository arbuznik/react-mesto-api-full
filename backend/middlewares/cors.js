// const allowedCors = [
//   'https://praktikum.tk',
//   'http://praktikum.tk',
//   'localhost:3000'
// ];
//
// const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
//
// app.use(function(req, res, next) {
//   const { method } = req
//   const { origin } = req.headers;
//
//   if (method === 'OPTIONS') {
//     const requestHeaders = req.headers['access-control-request-headers'];
//     res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
//     res.header('Access-Control-Allow-Headers', requestHeaders);
//     return res.end();
//   }
//
//   if (allowedCors.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//     return res.end();
//   }
//
//   next();
// });