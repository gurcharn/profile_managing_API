const express = require('express');
const request = require('request');
const router = express.Router();
const db = require('../Database');

router.get('/companyId/:companyId', (req, res, next) => {
    sqlQueryCompany = "SELECT * FROM customer WHERE companyId = " + req.params.companyId
    db.query(sqlQueryCompany, function (err, result) {
        if (err) {
            console.log(err+"");
            res.status(500).json({
                message: "No Response",
                errors: err,
                response: null
            });
        }
        else {
            res.status(200).json({
                message: "Response Retrieved",
                errors: null,
                response: result
            });
        }
     });
});


router.get('/customerId/:customerId', (req, res, next) => {

        sqlQueryCompany = "SELECT * FROM customer WHERE customerId = " + req.params.customerId
        db.query(sqlQueryCompany, function (err, result) {
            if (err) {
                console.log(err+"");
                res.status(500).json({
                    message: "No Response",
                    errors: err,
                    response: null
                });
            }
            else {
                res.status(200).json({
                    message: "Response Retrieved",
                    errors: null,
                    response: result
                });
            }
         });
});

router.get('/email/:email', (req, res, next) => {

    sqlQueryCompany = "SELECT * FROM customer WHERE email = " + req.params.email
    db.query(sqlQueryCompany, function (err, result) {
        if (err) {
            console.log(err+"");
            res.status(500).json({
                message: "No Response",
                errors: err,
                response: null
            });
        }
        else {
            res.status(200).json({
                message: "Response Retrieved",
                errors: null,
                response: result
            });
        }
     });
});

module.exports = router;