const express = require('express');
const studentRouter = require('./src/student/routes.js');
const client = require('./redis-connection.js');
const app = express();
const port = 3001;
const cors = require('cors');
const amqp = require('amqplib');
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

const queue = "testMQ";
const text = {
  item_id: "12",
  text: "hello this is Abdur Razzak",
};
(async () => {
  let connection;
  try {
    connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(text)));
    console.log(" [x] Sent '%s'", text);
    await channel.close();
  } catch (err) {
    console.warn(err);
  } finally {
    if (connection) await connection.close();
  }
})();






app.listen(port, () => {
  console.log(`Server is running on:${port}`);
  console.log(`Press CTRL + C to stop server`);
});




// var lengthOfLongestSubstring = function(s) {
//     let maxLength = 0;
//     let charIndexMap = {};
//     let start = 0;

//     for (let i = 0; i < s.length; i++) {
//         const currentChar = s[i];
//         if (charIndexMap[currentChar] !== undefined && charIndexMap[currentChar] >= start) {
//             start = charIndexMap[currentChar] + 1;
//         }
//         charIndexMap[currentChar] = i;
//         maxLength = Math.max(maxLength, i - start + 1);
//     }

//     return maxLength;
// };

// console.log(lengthOfLongestSubstring("abb"));




 
// var longestPalindrome = function(s) {
//     if (s.length <= 1) {
//         return s;
//     }

//     let start = 0;
//     let maxLength = 1;

//     function expandAroundCenter(left, right) {
//         while (left >= 0 && right < s.length && s[left] === s[right]) {
//             const currentLength = right - left + 1;
//             if (currentLength > maxLength) {
//                 start = left;
//                 maxLength = currentLength;
//             }
//             left--;
//             right++;
//         }
//     }

//     for (let i = 0; i < s.length; i++) {
//         expandAroundCenter(i, i); 
//         expandAroundCenter(i, i + 1);  
//     }

//     return s.substring(start, start + maxLength);
// };

//  console.log(longestPalindrome("babad")); 
// console.log(longestPalindrome("cbbd")); 
















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

 