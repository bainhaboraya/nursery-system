const jwt = require("jsonwebtoken");
const teacherSchema = require("../Model/TeacherModel");

const admin = {
  username: "bainhalaa",
  password: "123456",
  role: "admin"
};

exports.login = (req, res, next) => {
  if (
    req.body.username === admin.username &&
    req.body.password === admin.password
  ) {
    const token = jwt.sign(
      {
        _id: admin.username,
        role: admin.role
      },
      process.env.SECRETKEY,
      { expiresIn: "48h" }
    );
    res.status(200).json({ token });
  } else {
    teacherSchema
      .findOne({
        fullName: req.body.fullName,
        password: req.body.password
      })
      .then((teacher) => {
        if (!teacher) {
          throw new Error("Invalid full name or password");
        }
        const token = jwt.sign(
          {
            _id: teacher._id,
            role: "teacher"
          },
          process.env.SECRETKEY,
          { expiresIn: "48h" }
        );
        res.status(200).json({ token });
      })
      .catch((error) => {
        res.status(401).json({ message: error.message });
      });
  }
};