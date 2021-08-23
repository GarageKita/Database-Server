if (process.env.NODE_ENV != "production") require("dotenv").config();
const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./routes/index')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/', routes)

app.use((err, req, res, next) => {
  let statusCode = 500
  switch (err.name) {
    case "SequelizeValidationError":
      err.message = err.errors.map(el => el.message)
      statusCode = 400
      break;

    case "SequelizeForeignKeyConstraintError":
      err.message = "Tag or product is not found"
    case "notFound":
      statusCode = 404
      break;

    case "unauthorized":
      err.message = "User does not have permission"
      statusCode = 401
      break;

    case "badRequest":
    case "JsonWebTokenError":
      statusCode = 400
      break;

    default:
      break;
  }
  console.log("--------------------------------------ERROR--------------------------------------")
  console.log(err)
  console.log(err.message)
  console.log("--------------------------------------ERROR--------------------------------------")
  res.status(statusCode).json({ message: err.message });
});

module.exports = app