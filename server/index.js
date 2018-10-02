const express = require('express');
var schedule = require('node-schedule');
const fetchData = require('./fetch-data');
const { db, writeData } = require('./database');

const app = express();
const port = process.env.PORT || 9000;

app.get('/phish', (req, res) =>
  db.Phish.findAll().then(data => {
    res.send(data);
  })
);

app.listen(port, () => console.log(`Server listening on port ${port}`));

/* Update records every day */
schedule.scheduleJob('1 * * *', async () => {
  /* Clear all of the records so that we can update them */
  db.Phish.destroy({
    where: {},
    truncate: true
  });

  const records = await fetchData();
  writeData(JSON.parse(records));
});
