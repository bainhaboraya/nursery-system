const express = require("express");
const controller = require("../Controller/childController");
const validationResult = require("../Midelwares/validations/validatorResult");
const { insertValidator, updateValidator, deleteValidator } = require("../Midelwares/validations/childValidator");
const {isAdmin,isteacher} = require("./../Midelwares/authenticationMw");
/**
 * @swagger
 * tags:
 *   name: Children
 *   description: API endpoints for managing children
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Child:
 *       type: object
 *       properties:
 *         _id:
 *           type: number
 *           description: The unique identifier for the child.
 *         fullName:
 *           type: string
 *           description: The full name of the child.
 *         age:
 *           type: number
 *           description: The age of the child.
 *         level:
 *           type: string
 *           enum: [PreKG, KG1, KG2]
 *           description: The level of the child.
 *         address:
 *           type: object
 *           properties:
 *             city:
 *               type: string
 *               description: The city of the child's address.
 *             street:
 *               type: string
 *               description: The street of the child's address.
 *             building:
 *               type: string
 *               description: The building of the child's address.
 *         img:
 *           type: string
 *           description: The image URL of the child.
 *     Message:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: A message indicating the operation result.
 */
const router = express.Router();
router.route("/child")
  .get(isteacher,controller.getAllChildren) 
  .post(isAdmin,insertValidator, validationResult, controller.insertChild) 

/**
 * @swagger
 * /child:
 *   get:
 *     summary: Get all children
 *     tags: [Children]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of children
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Child'
 *   post:
 *     summary: Create a new child
 *     tags: [Children]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Child'
 *     responses:
 *       201:
 *         description: The created child
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Child'
 */
router.route("/child/:id")
  .delete(isAdmin,deleteValidator, validationResult, controller.deleteChild) 
  .patch(isAdmin,updateValidator, validationResult, controller.updateChild)
  .get(isteacher,controller.getChildById)

/**
 * @swagger
 * /child/{id}:
 *   get:
 *     summary: Get a child by ID
 *     tags: [Children]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: ID of the child to get
 *     responses:
 *       200:
 *         description: A child object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Child'
 *   patch:
 *     summary: Update a child
 *     tags: [Children]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: ID of the child to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Child'
 *     responses:
 *       200:
 *         description: The updated child
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Child'
 *   delete:
 *     summary: Delete a child
 *     tags: [Children]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: ID of the child to delete
 *     responses:
 *       200:
 *         description: The child was deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 */









module.exports = router;
