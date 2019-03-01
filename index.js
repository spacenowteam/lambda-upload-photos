const AWS     = require('aws-sdk');
const fs      = require('fs');
const path    = require('path');
const multer  = require('multer');
const sharp   = require('sharp');
const config  = require('./config')

const s3 = new AWS.S3();

let s3bucket = s3({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
  Bucket: config.Bucket
})

var storage = multer.memoryStorage({
  destination: function(req, file, callback) {
      callback(null, '');
  }
});

var multipleUpload = multer({ storage: storage }).array('file');
var upload = multer({ storage: storage }).single('file');

//configuring parameters
var params = () => ({
  Bucket: BucketPath,
  Key: item.originalname,
  Body: item.buffer,
  ACL: 'public-read',
  Body : fs.createReadStream(filePath),
  Key : Date.now()+"_"+path.basename(filePath)
})

exports.handler = (req, res) => {

  let files = req.files;

  files.map((file) => {

    s3.upload(params, function (err, data) {
      if (err) {
        console.log("Error", err);
      }
      //success
      if (data) {
        console.log("Uploaded in:", data.Location);
      }
    });

  })

  // small - 101 * 67
  sharp(files[0].path)
    .rotate()
    .resize(101, null)
    .crop(sharp.strategy.entropy)
    .toFile(fileuploadDir + 'small_' + files[0].filename, function(err) {
      console.log("Error from resizing files", err);
  });

  // x_small - 216 * 144
  sharp(files[0].path)
  .rotate()
  .resize(216, null)
  .crop(sharp.strategy.entropy)
  .toFile(fileuploadDir + 'x_small_' + files[0].filename, function(err) {
    console.log("Error from resizing files", err);
  });

  // x_medium - 450 * 300  
  sharp(files[0].path)
    .rotate()
    .resize(450, null)
    .crop(sharp.strategy.entropy)
    .toFile(fileuploadDir + 'x_medium_' + files[0].filename, function(err) {
      console.log("Error from resizing files", err);
  });

  // x_large - 900 * 650
  sharp(files[0].path)
    .rotate()
    .resize(900, null)
    .crop(sharp.strategy.entropy)
    .toFile(fileuploadDir + 'x_large_' + files[0].filename, function(err) {
      console.log("Error from resizing files", err);
  });

  // xx_large - 1280 * 960
  sharp(files[0].path)
    .rotate()
    .resize(1280, null)
    .crop(sharp.strategy.entropy)
    .toFile(fileuploadDir + 'xx_large_' + files[0].filename, function(err) {
      console.log("Error from resizing files", err);
  });

}