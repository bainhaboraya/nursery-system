const express = require("express");
const controller = require("./../Controller/teacherController");
const validationResult = require("./../Midelwares/validations/validatorResult");
const { insertValidator, updateValidator, deleteValidator} = require("./../Midelwares/validations/teacherValidator");
const {isAdmin,isteacher} = require("./../Midelwares/authenticationMw");
const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     teacher:
 *       type: object
 *       properties:
 *         fullName:
 *           type: string
 *           description: The teacher full name
 *         email:
 *           type: string
 *           description: The teacher email
 *         password:
 *           type: string
 *           description: The teacher password
 *         img:
 *           type: string
 *           format: binary
 *           description: The teacher image
 *     Message:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: the message description
 *             
 */

router.route("/teacher")
  .get(isAdmin,controller.getAllTeachers)
  
/**
 * @swagger
 * /teacher:
 *   get:
 *     summary: Returns the list of all the teachers
 *     tags : [Teachers]
 *     responses:
 *       200:
 *         description: The list of the teachers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/teacher'
 *       401:
 *         description: unauthnticated error
 */
router.route("/teacher/:id")
  .get(isteacher,controller.getTeacherById)

/**
 * @swagger
 * /teacher/{id}:
 *   get:
 *     summary: Get the teacher by id
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The teacher id
 *     responses:
 *       200:
 *         description: The teacher data by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/teacher'
 *       404:
 *         description: The teacher id was not found
 */
.post(isAdmin,insertValidator, validationResult, controller.insertTeacher)
/**
 * @swagger
 * /teacher:
 *   post:
 *     summary: add a new teacher
 *     tags: [Teachers]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/teacher'
 *     responses:
 *       201:
 *         description: The teacher was successfully added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       500:
 *         description: internal server error
 */

.patch(isAdmin,updateValidator, validationResult, controller.updateTeacher);

router.route("/teachers/supervisors").get(controller.getAllSupervisors)
/**
 * @swagger
 * /teacher/{id}:
 *   patch:
 *     summary: update teacher data
 *     tags: [Teachers]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *            type: object
 *            properties:
 *              _id:
 *               type: string
 *               description: the teacher id
 *              fullName:
 *               type: string
 *               description: The teacher full name
 *              email:
 *               type: string
 *               description: The teacher email
 *              password:
 *               type: string
 *               description: The teacher password
 *              img:
 *               type: string
 *               format: binary
 *               description: The teacher image
 *     responses:
 *       201:
 *         description: The teacher was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       404:
 *         description: The teacher id was not found
 *       500:
 *         description: internal server error
 */
.delete(isAdmin,deleteValidator, validationResult, controller.deleteTeacher)
/**
 * @swagger
 * /teacher/{id}:
 *   delete:
 *     summary: delete a teacher from the db
 *     tags: [Teachers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type : object
 *               properties:
 *                    _id:
 *                      type: string
 *                      description : the teacher id
 *     responses:
 *       200:
 *         description: The teacher was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *               
 *       404:
 *         description: The teacher id was not found
 *       500:
 *         description: internal server error
 */

/**
 * @swagger
 * /teacher/change-password:
 *   post:
 *     summary: change the password
 *     tags: [Teachers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              properties:
 *                  _id:
 *                      type: string
 *                      description: the user id
 *                  password:
 *                      type: string
 *                      description: the new password
 *     responses:
 *       200:
 *         description: The password was successfully changed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       404:
 *         description: user not found         
 *       500:
 *         description: internal server error
 */







module.exports = router;
