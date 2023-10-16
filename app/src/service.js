const express = require('express');
const studentRouter = require('./student/routes.js');


const app = express();
const port =  3000;
 
app.use(express.json());
app.get('/home',(req,res) =>{
   res.send('Hello this is Razzak!');
   console.log('Hello this is Razzak!');
})
app.use("/api/v1/students",studentRouter);

 
app.listen(port, () => {
  console.log(`Server is running on:${port}`);
  console.log(`Press CTRL + C to stop server`);
});



















