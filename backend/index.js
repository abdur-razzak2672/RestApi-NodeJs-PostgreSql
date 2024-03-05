const express = require('express');
const studentRouter = require('./src/student/routes.js');
const client = require('./redis-connection.js');
const app = express();
const port = 3001;
const cors = require('cors');
   app.use(cors());

app.use(express.json());
app.use("/api/v1/students", studentRouter);
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/views/index.html');
});

app.get('/clear-cache', async (req, res) => {
  await client.del('students');
  res.send('Cache cleared');
});

   
app.listen(port, () => {
  console.log(`Server is running on:${port}`);
  console.log(`Press CTRL + C to stop server`);
});


















// let x = [2, 7, 11, 15, 19]
// let target = 21
// for (let i = 0; i < x.length; i++) {
//   if (x[i] == target) {
//     console.log("not")
//   } else {
//     for (let j = i + 1; j < x.length; j++) {
//       if (x[i] + x[j] == target) {
//         console.log(i, j)
//       }
//     }
//   }
// }






















