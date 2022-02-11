const express = require("express");
const imgModel = require("./model.js");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const app = express();

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.set("view engine", "ejs");

const  storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads");
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + "-" + Date.now());
	}
});

const upload = multer({storage : storage });

app.get('/', (req, res) => {
    imgModel.find({}, (err, images) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('imagesPage', { images: images });
        }
    });
});

app.post("/", upload.single('image'), (req, res, next)=>{
	var obj = {
		name: req.body.name,
		desc: req.body.desc,
		img: {
			data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename )),
			contentType : "image/png"
		}
	}
	imgModel.create(obj, (err, item) => {
		if(err){
			console.log(err)
		}else{
			res.redirect("/")
		}
	})
});

app.listen(4200,()=>{
	console.log("Server started on port 4200");
})
