require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const htmling = require('htmling');
const Pusher = require('pusher');

var pusher = new Pusher({
  appId: process.env.PUSHID,
  key: process.env.PUSHKEY,
  secret: process.env.PUSHSEC
});
pusher.port = 443;

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('html', htmling.express(__dirname + '/views/', {watch:true}));
app.set('view engine', 'html');

app.get('/', (req, res) => {
  res.render('index');
});

// var clientIndex = 0
// app.post('/pusher/auth', function(req, res) {
//   const socket_id = req.body.socket_id;
//   const channel_name = req.body.channel_name;
//   if(socket_id && channel_name) {
//     const userID = socket_id.replace(/\./g, "")+Date.now();
//     res.send(pusher.authenticate(
//       socket_id,
//       channel_name,
//       {user_id: userID, user_info: { clientIndex: clientIndex++ }}
//     ))
//   } else {
//     res.sendStatus(401)
//   }
// });

app.listen(process.env.PORT || 3000);


