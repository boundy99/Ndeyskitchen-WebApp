const app = require('./index');

const DBConnection = require('./database/DBConnect.js');

if (DBConnection) {
  app.listen(process.env.PORT, () => {
    console.log('Server is listenning on port', process.env.PORT);
  });
}
