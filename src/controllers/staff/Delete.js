const express = require('express');
const request = require('request');
const router = express.Router();
const db = require('../Database');

router.delete('/:satffId', (req, res, next) => {
        sqlQueryCompany = "DELETE FROM staff WHERE staffId = " + req.params.staffId
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