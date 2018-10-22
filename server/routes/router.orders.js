const express = require('express');
const pool = require('../modules/pool')
const router = express.Router();

router.post('/', (req, res) => {
  console.log('req.body:', req.body);
})

router.get('/', (req, res) => {
  console.log('/orders GET hit');
  pool.query(`SELECT "orders"."id",
              "orders"."first_name", 
              "orders"."last_name", 
              "orders"."street_address", 
              "orders"."city", 
              "orders"."state", 
              "orders"."zipcode", 
              "orders"."phone", 
              "orders"."email",
              "beans"."name", 
              "roast_levels"."roast",
              "orders"."quantity",
              "order_status"."status"
              FROM "orders"
              JOIN "roast_levels" on "roast_levels"."id" = "orders"."roast"
              JOIN "beans" ON "beans"."id" = "orders"."bean"
              JOIN "order_status" ON "orders"."order_status" = "order_status"."id";`)
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