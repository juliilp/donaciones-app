import { v2 as cloudinary } from "cloudinary";

// CLOUDINARY_CLOUD_NAME = "dnlxeeahh"
// CLOUDINARY_API_KEY = "392866783884946"
// CLOUDINARY_API_SECRET = "4vEaXi9M8-z28p8RjpmXa2x9c6s"

cloudinary.config({
  cloud_name: "dnlxeeahh",
  api_key: "392866783884946",
  api_secret: "4vEaXi9M8-z28p8RjpmXa2x9c6s",
});

async function uploadImagen(image: string) {
  const result = await cloudinary.uploader.upload(image, {
    folder: "donaciones-app",
  });
  return result;
}

async function deleteImagen(publicId: string) {
  return await cloudinary.uploader.destroy(publicId);
}

export { uploadImagen, deleteImagen };
