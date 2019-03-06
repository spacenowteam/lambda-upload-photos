import AWS from "aws-sdk"
import Boom from "boom"
import * as config from './config'

let s3Service = new AWS.S3({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
  Bucket: config.BucketName
});

export const getObject = key =>
  new Promise((resolve, reject) => {
    const params = { Bucket: config.BucketName, Key: key };
    if (!key) reject(Boom.notFound());
    s3Service.getObject(params, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });

export const putObject = (key, body, ContentType) =>
  new Promise((resolve, reject) => {
    const params = {
      Bucket: config.BucketName,
      ContentType,
      Key: key,
      Body: body
    };
    if (!key) reject(Boom.notFound());
    s3Service.putObject(params, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
