require("dotenv").config();
const server = require("./server");

const port = 3001 || 5001;
server.set('view engine', 'html');

const startServer = () => {
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
      
startServer();
