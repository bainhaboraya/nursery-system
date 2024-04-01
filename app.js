const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,path.join(__dirname,"images"))
  },
  filename:(req,file,cb)=>{
    cb(null,new Date().toLocaleDateString().replace(/\//g,"-")+"-"+file.originalname)
  }
})
const fileFilter=(req,file,cb)=>{
  if(file.mimetype=="image/jpeg"||
     file.mimetype=="image/jpg"||
     file.mimetype=="image/png")
     cb(null,true)
  else
  cb(null,false)
}
require('dotenv').config();
const teacherRoute = require("./Routes/teacherRoute");
const ChildRoute=require("./Routes/childRoute");
const classRoute=require("./Routes/classRoute")
const login=require("./Routes/authentication")
const authenticationMW = require("./Midelwares/authenticationMw");
const changePassword=require("./Routes/changepassword");
const docsRoute = require("./Routes/docsRoute")
swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require("swagger-ui-express");
const app = express();
const port = process.env.PORT || 8080;
// Swagger Options
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Title',
      version: '1.0.0',
      description: 'Description of your API'
    },
    basePath: '/',
  },
  apis: ['./Routes/*.js'], // Specify the path to your route files
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Serve Swagger UI
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/images",express.static(path.join(__dirname,"images")))
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(multer({storage,fileFilter}).single("img"))
app.use(login);
app.use(docsRoute);
app.use(authenticationMW );
app.use(teacherRoute);
app.use(ChildRoute);
app.use(classRoute);
app.use(changePassword);



mongoose.connect(process.env.URL)
    .then(()=>{
        console.log("connected successfuly.............");
        app.listen(port, ()=>{
            console.log(`port number ${port}`);
        });
    })
    .catch((error)=>console.log(`error in connection${error}`));
     
    app.use((request,response,next)=>{
    console.log(request.url,request.method);
    next();
});

app.use((request, response, next) => {
  response.status(404).json({ data: "Not Found" });
});

app.use((error, request, response, next) => {
  //console.error(error.stack);
  response.status(500).json({ data: error.stack });
});
