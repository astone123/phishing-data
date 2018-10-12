const express = require('express');
const getTargetCounts = require('./target-helpers');
const getCountryArray = require('./country-helpers');
const { db } = require('./database');

const app = express();
const port = process.env.PORT || 9000;

/* Allow for cross-origin requests. */
app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/phish', async (req, res) => {
  const query = req.query.q || '';
  const phishData = await db.Phish.findAll({
    where: {
      $or: [
        {
          target: {
            $iLike: `%${query}%`
          }
        },
        {
          url: {
            $iLike: `%${query}%`
          }
        },
        {
          ip: {
            $iLike: `%${query}%`
          }
        }
      ]
    }
  });

  const countryData = await getCountryArray(phishData);

  const targetCounts = await getTargetCounts(phishData);

  res.send({ phishData, countryData, targetCounts });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
