
import Boom from 'boom'
import { putObject, getObject } from './aws.helper'
import { sharpImageConverter } from './sharp.helper'

const bucketUrl = `http://spacenow-listing-photos.s3-website-us-east-1.amazonaws.com`

const mediaOptimise = app => {

  app.get('/media/optimise', async (req, res) => {
    try {
      const { query } = req
      const { url } = query
      const acceptedFileExtensions = /\.(jpg|jpeg|png)$/i
      const acceptedTasks = ['width']
      // check the original request url
      if (!url) throw Boom.notFound()
      // check the file extension
      if (!acceptedFileExtensions.test(url)) throw Boom.notFound()
      // check the tasks
      const [rawFilename, fileExtension] = url.split('.')

      console.log("Raw Filename", rawFilename)
      console.log("file Extension", fileExtension)

      const splittedFilenameByTasks = rawFilename.split('--')
      // if we don't have tasks
      if (splittedFilenameByTasks.length === 1) throw Boom.notFound()
      // checking tasks
      const tasks = {}
      splittedFilenameByTasks.splice(1)
        .forEach((task) => {
          const [key, value] = task.split('-')
          // if we have unknown tasks
          if (!acceptedTasks.includes(key)) throw Boom.notFound();
          tasks[key] = value
          return
        });
      // download the original image
      const originalFilename = `${splittedFilenameByTasks[0]}.${fileExtension}`
      const fetchedFileDataFromAWS = await getObject(originalFilename)
      // create buffer
      const { Body, ContentType } = fetchedFileDataFromAWS
      const image = new Buffer.from(Body)
      // filesystem tasks
      const convertedImageBuffer = await sharpImageConverter(image, tasks)
      // upload to the s3
      await putObject(url, convertedImageBuffer, ContentType);
      // redirect to the new image url
      return res.redirect(`${bucketUrl}/${url}`);
    } catch (_err) {
      console.log("Error", _err);
    }
  })
}

export default mediaOptimise;