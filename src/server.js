// const express = require("express");
// const dotenv = require('dotenv');
// const cors = require("cors");
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('../swagger.json');
// const HttpException = require('./utils/HttpException.utils');
// const errorMiddleware = require('./middleware/error.middleware');
// const nguoiDungRouter = require('./routes/nguoiDung.route');

// // Init express
// const app = express();
// // Init environment
// dotenv.config();
// // parse requests of content-type: application/json
// // parses incoming requests with JSON payloads
// app.use(express.json());
// // enabling cors for all requests by using cors middleware
// app.use(cors());
// // Enable pre-flight
// app.options("*", cors());

// // Swagger
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// const port = Number(process.env.PORT || 3331);

// app.use(`/api/v1/nguoi_dung`, nguoiDungRouter);

// // 404 error
// app.all('*', (req, res, next) => {
//     const err = new HttpException(404, 'Endpoint Not Found');
//     next(err);
// });

// // Error middleware
// app.use(errorMiddleware);

// // starting the server
// app.listen(port, () =>
//     console.log(`🚀 Server running on port ${port}!`));


// module.exports = app;

function f(n) {
    if (n === 0) return 4n;
    if (n === 1) return 7n;
    if (n === 2) return 5n;
    
    let a = 4n, b = 7n, c = 5n, next;
    
    for (let i = 3; i <= n; i++) {
      next = a + b + c;
      a = b;
      b = c;
      c = next;
    }
    
    return c;
  }
  
  console.log(f(0));
  console.log(f(1));
  console.log(f(2));
  console.log(f(3));
  console.log(f(10));
  console.log(f(100));
  console.log(f(1000));
  console.log(f(1000000));
  