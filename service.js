const express = require('express');
const app = express();
const port = 3000;

app.get('/home',(req,res) =>{
   res.send('Hello World!');
   console.log('Hello World!');
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`));