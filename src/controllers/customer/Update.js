const express = require('express');
const router = express.Router();
const db = require('../Database');


router.patch('/', (req, res, next) => {
    var errorList = validateRequestBody(req.body);

    if (errorList.length == 0) {
            sqlQuery = "UPDATE customer SET staffId = \""+ req.body.staffId +"\"," +
            "name = \""+ req.body.name +"\"," +
            "email = \""+ req.body.email +"\"," +
            "address = \""+ req.body.address +"\"," +
            "phone = \""+ req.body.phone +"\"," +
            "source = \""+ req.body.source +"\"," +
            "status = \""+ req.body.email +"\"," +
            "comment = \""+ req.body.comment +"\"" +
            "WHERE customerId = " + req.body.customerId
            db.query(sqlQuery, function (err, result) {
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
                        error: null,
                        response: result
                    });
                }
              });
        }
        else {
            res.status(404).json({
                message: 'Information missing',
                errors: "Provide email",
                response: null
            });
        }
});

function validateRequestBody(requestBody) {
    var errors = [];

    if (!requestBody.customerId) { errors.push("Customer ID missing"); }
    if (!requestBody.staffId) { errors.push("Staff ID missing"); }
    if (!requestBody.name) { errors.push("Customer Name missing"); }
    if (!requestBody.email) { errors.push("Email missing"); }
    if (!requestBody.address) { errors.push("Address missing"); }
    if (!requestBody.phone) { errors.push("Phone missing"); }
    if (!requestBody.source) { errors.push("Source missing"); }
    if (!requestBody.status) { errors.push("Status missing"); }
    if (!requestBody.comment) { errors.push("Comment missing"); }

    return errors;
}

module.exports = router;