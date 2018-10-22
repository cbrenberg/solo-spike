const express = require('express');
const pool = require('../modules/pool')
const router = express.Router();

router.post('/', (req, res) => {
  console.log('req.body:', req.body);
})

router.put('/', (req, res) => {
  console.log(req.body);
  pool.query(`UPDATE "beans" SET "$1"='$2' WHERE "id"=$3;`, [req.body.column, req.body.value, req.body.id])
    .then(() => {
      res.sendStatus(201);
    })
    .catch(error => console.log('Error editing item:', error))
})

router.get('/', (req, res) => {
  console.log('/orders GET hit');
  pool.query(`SELECT outerBean."id", outerBean."flavor_description", outerBean."image_url", outerBean."name", outerBean."origin_description", outerBean."quantity", 
	(SELECT array_agg("roast_levels"."roast") as "roasts" FROM "roast_levels"
		JOIN "roast_junction" ON "roast_junction"."roast_id"="roast_levels"."id"
		JOIN "beans" ON "roast_junction"."bean_id" = "beans"."id"
		WHERE "roast_junction"."bean_id" = outerBean."id")
FROM "beans" outerBean;`)
    .then(results => {
      console.log(results.rows);
      res.send(results.rows);
    })
    .catch(error => {
      console.log('Error getting order data', error);
      res.sendStatus(500);
    })
})

router.delete('/', (req, res) => {
  console.log('/feedback DELETE hit. req.query:', req.query);
})

module.exports = router;