const bcrypt = require('bcrypt');
const teacherSchema = require('../Model/TeacherModel');
const classSchema = require('../Model/ClassModel');
exports.getAllTeachers = async (req, res, next) => {
  try {
    const teachers = await teacherSchema.find();
    res.status(200).json(teachers);
  } catch (error) {
    next(error);
  }
};
exports.getTeacherById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const teacher = await teacherSchema.findById(id);
    if (!teacher) {
      return res.status(404).json({ error: "Teacher isn't found" });
    }
    res.status(200).json(teacher);
  } catch (error) {
    next(error);
  }
};

exports.insertTeacher = async (req, res, next) => {
  try {
    const { password } = req.body;
    req.body.password = await bcrypt.hash(password, 10);
    req.body.img = req.file.filename;
    
    const savedTeacher = await teacherSchema.create(req.body);
    
    res.status(201).json(savedTeacher);
  } catch (error) {
    next(error);
  }
};


exports.updateTeacher = async (req, res, next) => {
  try {
    const id = req.body._id;
    const teacher = await teacherSchema.findById(id);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashedPassword;
    }

    if (req.file && req.file.filename) {
      req.body.img = req.file.filename;
    }

    const updatedTeacher = await teacherSchema.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json({ teacher: updatedTeacher });
  } catch (error) {
    next(error);
  }
};
exports.changePassword = async (req, res, next) => {
  try {
    const { teacherId, newPassword } = req.body;
    const teacher = await teacherSchema.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    teacher.password = hashedPassword;
    await teacher.save();
    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    next(error);
  }
};

exports.getAllSupervisors = async (req, res, next) => {
  try {
    const classes = await classSchema.find({}).populate({
      path: 'supervisor',
      select: 'fullName',
    });
    const supervisors = classes.map((item) => item.supervisor);
    res.status(200).json({ supervisors });
  } catch (error) {
    next(error);
  }
};

exports.deleteTeacher = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedTeacher = await teacherSchema.findByIdAndDelete(id);
    if (!deletedTeacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    res.status(200).json({ message: "Deletion successful" });
  } catch (error) {
    next(error);
  }
};