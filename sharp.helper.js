import sharp from 'sharp';

export const sharpImageConverter = async (_image, params) => {
  const { width } = params
  const modifiedImage = await sharp(_image)
    .resize(width ? parseInt(width, 10) : undefined)
    .crop()
    .toBuffer()
  return modifiedImage
}