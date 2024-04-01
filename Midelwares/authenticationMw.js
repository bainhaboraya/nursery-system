const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    let token = req.get("authorization").split(" ")[1];
    let decoded_token = jwt.verify(token, process.env.SECRETKEY);
    req.token = decoded_token;
    next();
  } catch (error) {
    error.message = "not Authenticated";
    next(error);
  }
};
module.exports.isAdmin=(req, res, next)=>{
    if(req.token.role == 'admin'){
        next();
    }else{
        throw new Error(' not authorized ');
    }
}

module.exports.isteacher = (req, res, next)=>{
    if(req.token.role == 'teacher'){
        next();
    }else{
        throw new Error(' not authorized');
    }
}
