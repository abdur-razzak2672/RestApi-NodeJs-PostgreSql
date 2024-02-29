const express = require('express');
const studentRouter = require('./src/student/routes.js');
const client = require('./redis-connection.js');
const app = express();
const port = 3001;
const cors = require('cors');

client.set('name', 'Razzak', (err, reply) => {
  console.log('SET name:', reply);
});

client.get('name', (err, reply) => {
  console.log('GET name:', reply);
}
);





app.use(cors());

app.use(express.json());
app.get('/home', (req, res) => {
  res.send('Hello this is Razzak!');
  console.log('Hello this is Razzak!');
})

app.use("/api/v1/students", studentRouter);
app.get('/get-data', async (req, res) => {
  const cachedData = await client.get('myData');
  if (cachedData) {
    // Serve data from cache if available
    res.send(
      `Data from cache: ${cachedData}`
    );
  } else {
    // Fetch data from original source
    const data = " Hello this is Razzak! from server";
    await client.set('myData', data);
    res.send(data);
  }
});


app.get('/clear-cache', async (req, res) => {
  await client.del('students');
  res.send('Cache cleared');
});


app.listen(port, () => {
  console.log(`Server is running on:${port}`);
  console.log(`Press CTRL + C to stop server`);
});



















