const AWS     = require('aws-sdk');
const fs      = require('fs');
const path    = require('path');
const multer  = require('multer');
const sharp   = require('sharp');

const s3 = new AWS.S3();

let s3bucket = s3({
  accessKeyId: 'AKIAIBIZS3EAQ7D3KFRQ',
  secretAccessKey: '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',
  Bucket: 'spacenow-listing-photos'
});

//configuring parameters
var params = {
  Body : fs.createReadStream(filePath),
  Key : "folder/"+Date.now()+"_"+path.basename(filePath)
};

var multipleUpload = multer({ storage: storage }).array('file');
var upload = multer({ storage: storage }).single('file');

s3.upload(params, function (err, data) {
  //handle error
  if (err) {
    console.log("Error", err);
  }
  //success
  if (data) {
    console.log("Uploaded in:", data.Location);
  }
});

exports.handler = (req, res) = {

  const file = req.files;

}