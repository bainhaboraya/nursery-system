const { body, param, query } = require("express-validator");

exports.insertValidator= [
    body("name").isString().withMessage("Name must be string"),
    body("supervisor").isMongoId().withMessage("supervisor must be object id"),
    body("children").isArray().withMessage("children must be array of ids"),
    body("children.*").isNumeric().withMessage("children must be array of ids"),
];

exports.updateValidator= [
    body("name").optional().isString().withMessage("Name must be string"),
    body("supervisor").optional().isMongoId().withMessage("supervisor must be object id"),
    body("children").optional().isArray().withMessage("children must be array of ids"),
    body("children.*").optional().isNumeric().withMessage("children must be array of ids"),
];

exports.deleteValidator= [
    body("id").isInt().withMessage("Id Shoud be Number")
]
