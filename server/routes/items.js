const express = require('express');
const router = express.Router();

const pg = require('pg');
const pool = new pg.Pool({
    database: 'to-do-list', // database name
    host: 'localhost', // Where is your database running?
    port: '5432', // default port
    max: 10, // Max number of queries at one time
    idleTimeoutMillis: 30000 // 30 seconds
});

router.post('/', (req, res) => {
    console.log('In items router.post');
    const itemToAdd = req.body;
    const queryText = `INSERT INTO "items" ("name") VALUES ($1);`;
    pool.query(queryText, [
        itemToAdd.name, // $1
    ]).then((result) => {
        console.log('Success! in router.post');
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error inserting data to database', error);
        res.sendStatus(500);
    });
})

router.get('/', (req, res) => {
    console.log('In items router.get');
    const queryText = 'SELECT * FROM "items" ORDER BY "id" LIMIT 50;';
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('Error in retreiving data from database', error);
        res.sendStatus(500);
    })
})

router.put('/:id', (req, res) => {
    console.log('in router.put mark item complete');
    
    const itemId = req.params.id;
    const queryText = `
        UPDATE "items"
        SET "complete" = true
        WHERE "id" = $1;`;
    pool.query(queryText, [itemId]).then((result) => {
        console.log('Item marked complete!');
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Unable to mark item as complete, error: ', error);
        res.sendStatus(500);
    })
});

router.delete('/:id', (req, res) => {
    console.log('in router.delete, delete item');
    
    const itemId = req.params.id;
    const queryText = `
        DELETE FROM "items" WHERE "id" = $1;`;
    pool.query(queryText, [itemId]).then((result) => {
        console.log('Item deleted!');
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Unable to delete item, error: ', error);
        res.sendStatus(500);
    })
});

module.exports = router;