const express    = require('express');
const app        = express();
const path       = require('path');
const bodyParser = require('body-parser');
const sgMail     = require('@sendgrid/mail');
const cors       = require('cors')
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
  next();
});

app.post('/contact', function(req, res) {
	console.log(req.body);
			sgMail.setApiKey(process.env.SENDGRID_API_KEY);
			console.log(process.env.SENDGRID_API_KEY);
				const msg = {
				  to: 'krosecozadd@gmail.com',
				  from: `${req.body.email}`,
				  subject: 'New contact submission from acafeboise.com: ' + `${req.body.subject}`,
				  text: `${req.body.message}`,
				  html: `${req.body.message}`,
				};
				sgMail.send(msg);
				res.json(msg);
	});

// app.get('/contact', function(req, res) {
// 	res.json(msg);
// })

// listen on port 3000
  app.set('port', process.env.PORT || 3001)

  app.listen(app.get('port'), () => {
    console.log(`✅ PORT: ${app.get('port')} 🌟`)
  })
