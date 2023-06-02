const axios = require('axios');
const express = require('express');
const ExpressError = require("./expressError")
const app = express();

app.use(express.json());

app.post('/', async function(req, res, next) {
  try {
    let results = await Promise.all(
      req.body.developers.map(async (d) => {
        let response = await axios.get(`https://api.github.com/users/${d}`);
        return response.data;
      })
    );
    let out = results.map(r => ({ bio: r.bio, name: r.name }));

    return res.send(JSON.stringify(out));
  } catch(err) {
    next(err);
  }
});

// This is a 404 handler
app.use((req, res, next) => {
	const e = new ExpressError("Page Not Found", 404)
	next(e)
	})

// This is a genereal error handler
app.use(function (err, req, res, next) { 
	let status = err.status || 500;
	let message = err.msg;
	  return res.status(status).json({
	    error: { message, status }
	  });
	});

module.exports = app; 