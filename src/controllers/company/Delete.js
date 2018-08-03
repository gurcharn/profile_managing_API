const express = require('express');
const request = require('request');
const router = express.Router();
const db = require('../Database');

router.delete('/:companyId', (req, res, next) => {
        sqlQueryCompany = "DELETE FROM company WHERE companyId = " + req.params.companyId
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