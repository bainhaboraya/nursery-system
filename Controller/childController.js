const childSchema = require("../Model/ChildModel");

exports.getAllChildren = async (req, res, next) => {
  try {
    const children = await childSchema.find();
    res.status(200).json(children);
  } catch (error) {
    next(error);
  }
};

exports.getChildById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const child = await childSchema.findById(id);
    if (!child) {
      return res.status(404).json({ message: 'Child not found' });
    }
    res.status(200).json(child);
  } catch (error) {
    next(error);
  }
};

exports.insertChild = async (req, res, next) => {
  try {
    if (req.body._id !== undefined) {
      return res.status(400).json({ message: 'ID is auto-incremented' });
    }
    req.body.img = req.file.filename;
    const newChild = new childSchema(req.body);
    const savedChild = await newChild.save();
    res.status(201).json(savedChild);
  } catch (error) {
    next(error);
  }
};

exports.updateChild = async (req, res, next) => {
  try {
    const id = req.body._id;
    if (req.file && req.file.filename) {
      req.body.img = req.file.filename;
    }
    const updatedChild = await childSchema.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedChild) {
      return res.status(404).json({ message: 'Child not found' });
    }
    res.status(200).json({ message: 'Update successful' });
  } catch (error) {
    next(error);
  }
};

exports.deleteChild = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedChild = await childSchema.findByIdAndDelete(id);
    if (!deletedChild) {
      return res.status(404).json({ message: 'Child not found' });
    }
    res.status(200).json({ message: 'Deletion successful' });
  } catch (error) {
    next(error);
  }
};
