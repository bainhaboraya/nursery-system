const express = require("express");
const controller = require("../Controller/classController");
const validationResult = require("../Midelwares/validations/validatorResult");
const { insertValidator, updateValidator, deleteValidator } = require("../Midelwares/validations/classValidator");
const { isAdmin, isteacher } = require("./../Midelwares/authenticationMw");

/**
 * @swagger
 * tags:
 *   name: Classes
 *   description: API endpoints for managing classes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Class:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the class
 *         supervisor:
 *           type: object
 *           description: The supervisor of the class
 *           properties:
 *             fullName:
 *               type: string
 *               description: The full name of the supervisor
 *         children:
 *           type: array
 *           description: The children in the class
 *           items:
 *             $ref: '#/components/schemas/Child'
 *     Message:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: A message describing the result of the operation
 */

const router = express.Router();

router.route("/class")
  /**
   * @swagger
   * /class:
   *   get:
   *     summary: Get all classes
   *     tags: [Classes]
   *     responses:
   *       200:
   *         description: An array of classes
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Class'
   *       401:
   *         description: Unauthorized access
   */
  .get(isteacher, controller.getAllClasses)
  /**
   * @swagger
   * /class:
   *   post:
   *     summary: Create a new class
   *     tags: [Classes]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Class'
   *     responses:
   *       201:
   *         description: The created class object
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Class'
   *       400:
   *         description: Bad request
   */
  .post(isAdmin, insertValidator, validationResult, controller.insertClass);

router.route("/class/:id")
  /**
   * @swagger
   * /class/{id}:
   *   get:
   *     summary: Get a class by ID
   *     tags: [Classes]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The ID of the class
   *     responses:
   *       200:
   *         description: A class object
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Class'
   *       404:
   *         description: Class not found
   */
  .get(isteacher, controller.getClassById)
  /**
   * @swagger
   * /class/{id}:
   *   patch:
   *     summary: Update a class by ID
   *     tags: [Classes]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The ID of the class
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Class'
   *     responses:
   *       200:
   *         description: Update successful
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Message'
   *       404:
   *         description: Class not found
   *       400:
   *         description: Bad request
   *
   *   delete:
   *     summary: Delete a class by ID
   *     tags: [Classes]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The ID of the class
   *     responses:
   *       200:
   *         description: Deletion successful
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Message'
   *       404:
   *         description: Class not found
   */
  .delete(isAdmin, deleteValidator, validationResult, controller.deleteClass)
  .patch(isAdmin, updateValidator, validationResult, controller.updateClass);

/**
 * @swagger
 * /class/child/{id}:
 *   get:
 *     summary: Get children of a class
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the class
 *     responses:
 *       200:
 *         description: An array of children
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: The name of the class
 *                 childrenInfo:
 *                   type: array
 *                   description: Information about children in the class
 *                   items:
 *                     $ref: '#/components/schemas/Child'
 *       404:
 *         description: Class not found
 */

/**
 * @swagger
 * /class/teacher/{id}:
 *   get:
 *     summary: Get supervisor and class name by class ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the class
 *     responses:
 *       200:
 *         description: Supervisor and class name
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 class:
 *                   type: string
 *                   description: The name of the class
 *                 supervisor:
 *                   type: object
 *                   description: Description of the supervisor object
 */

module.exports = router;
