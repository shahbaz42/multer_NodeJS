const mongoose = require("mongoose");

// connect to the database
mongoose.connect("mongodb://127.0.0.1:27017/images",
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to the DB");
    }
  }
);

// create a imageSschema
const imageSchema = new mongoose.Schema({
  name: String,
  desc: String,
	img : {
		data: Buffer,
		contentType: String
	}
});

// create a model
module.exports =  mongoose.model("Image", imageSchema); 
