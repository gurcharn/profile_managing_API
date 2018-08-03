const express = require('express');
const router = express.Router();
const db = require('../Database');


router.patch('/', (req, res, next) => {
    var errorList = validateRequestBody(req.body);

    if (errorList.length == 0) {
            sqlQuery = "UPDATE staff SET name = \""+ req.body.name + "\"," +
                        "address = \""+ req.body.address + "\"," +
                        "phone = \""+ req.body.phone + "\"," +
                        "position = \""+ req.body.position + "\"," +
                        "department = \""+ req.body.department + "\"" +
                        "WHERE staffId = " + req.body.staffId
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
                        query: sqlQuery,
                        response: result
                    });
                }
              });
        }
        else {
            res.status(404).json({
                message: 'Information missing',
                errors: errorList,
                response: null
            });
        }
});

function validateRequestBody(requestBody) {
    var errors = [];

    if (!requestBody.staffId) { errors.push("Staff ID missing"); }
    if (!requestBody.name) { errors.push("Name missing"); }
    if (!requestBody.address) { errors.push("Address missing"); }
    if (!requestBody.phone) { errors.push("Phone number missing"); }
    if (!requestBody.position) { errors.push("Position missing"); }
    if (!requestBody.department) { errors.push("Department missing"); }

    return errors;
}

module.exports = router;