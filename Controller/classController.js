
const mongoose = require("mongoose");
const classModel = require("./../Model/ClassModel");
const childModel = require("./../Model/ChildModel");

// Get all classes with supervisor and children populated
exports.getAllClasses = async (req, res, next) => {
  try {
    const classes = await classModel.find({})
      .populate({
         path: 'supervisor',
          select: { fullName: 1 }
         })
      .populate({
         path: 'children',
          select: {  fullName: 1 }
         });
    res.status(200).json({ data: classes });
  } catch (err) {
    next(err);
  }
};

// Get a class by its ID with supervisor and children populated
exports.getClassById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const singleClass = await classModel.findById(id)
      .populate({
         path: 'supervisor',
          select: { fullName: 1 }
         })
      .populate({ 
        path: 'children',
         select: { fullName: 1 }
         });
    if (!singleClass) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.status(200).json({ data: singleClass });
  } catch (err) {
    next(err);
  }
};

// Create a new class
// Create a new class
exports.insertClass = async (req, res, next) => {
  try {
    if (req.body._id !== undefined) {
      return res.status(400).json({ message: "You cannot send the ID as it is auto-incremented" });
    }

    const duplicateChildIds = await checkDuplicateChildren(req.body.children);
    if (duplicateChildIds.length > 0) {
      return res.status(400).json({ message: `Children ${duplicateChildIds.join(', ')} don't belonge to any class` });
    }

    const newClass = new classModel(req.body);
    const savedClass = await newClass.save();
    res.status(200).json({ data: savedClass });
  } catch (err) {
    next(err);
  }
};


// Update a class
exports.updateClass = async (req, res, next) => {
  try {
    const id = req.body._id;
    const updatedClass = await classModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedClass) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.status(200).json({ message: "Update successful" });
  } catch (err) {
    next(err);
  }
};

// Delete a class
exports.deleteClass = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedClass = await classModel.findByIdAndDelete(id);
    if (!deletedClass) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.status(200).json({ message: "Delete successful" });
  } catch (err) {
    next(err);
  }
};

// Get children of a class
exports.getClassChildren = async (req, res, next) => {
  try {
    const classID = req.params.id;
    const classInfo = await classModel.findById(classID);
    if (!classInfo) {
      return res.status(404).json({ message: "Class not found" });
    }
    const className = classInfo.name;
    const childrenIds = classInfo.children;
    const childrenInfo = await childModel.find({ _id: { $in: childrenIds } });
    if (!childrenInfo || childrenInfo.length === 0) {
      return res.status(404).json({ message: "No children found for this class" });
    }
    res.status(200).json({ name: className, childrenInfo });
  } catch (err) {
    next(err);
  }
};

// Get supervisor and class name by class ID
exports.getTeacherClass = async (req, res, next) => {
  try {
    const classID = req.params.id;
    const classInfo = await classModel.findById(classID).populate('supervisor');
    if (!classInfo) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.status(200).json({ class: classInfo.name, supervisor: classInfo.supervisor });
  } catch (err) {
    next(err);
  }
};

// Function to check for duplicate children
async function checkDuplicateChildren(childrenAdding) {
  const duplicateChildIds = [];
  for (const childId of childrenAdding) {
    const existingChild = await childModel.findById(childId);
    if (!existingChild) {
      duplicateChildIds.push(childId);
    }
  }
  return duplicateChildIds;
}

