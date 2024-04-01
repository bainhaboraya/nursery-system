const { body, param, query } = require("express-validator");
//const { body } = require('express-validator');

exports.insertValidator = [
  body("fullName").isAlpha().withMessage("Child fullname should be a string").isLength({ min: 5 }),
  body("age").isInt().withMessage("Child age should be an integer"),
  body("level").isIn(['PreKG', 'KG1', 'KG2']).withMessage("Invalid child level"),
  body("address.city").isString().withMessage("City should be a string"),
  body("address.street").isString().withMessage("Street should be a string"),
  body("address.building").isString().optional({ nullable: true }).withMessage("Building should be a string"),
  body("img")
    .isAlpha()
    .withMessage("child img should be a string") 
];

exports.updateValidator= [
  body("_id").isInt().withMessage("Child id should be an integer"),
  body("fullName").isAlpha().withMessage("Child fullname should be a string").isLength({ min: 5 }),
  body("age").isInt().withMessage("Child age should be an integer"),
  body("level").isIn(['PreKG', 'KG1', 'KG2']).withMessage("Invalid child level"),
  body("address.city").isString().withMessage("City should be a string"),
  body("address.street").isString().withMessage("Street should be a string"),
  body("address.building").isString().optional({ nullable: true }).withMessage("Building should be a string"),
  body("img")
    .isAlpha()
    .optional()
    .withMessage("child img should be a string")
],
exports.deleteValidator= [
  param('id').isInt().withMessage('ID must be an integer'),
];
