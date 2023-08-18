import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "djtl4nyln",
  api_key: "992751766957253",
  api_secret: "YL_RnZRLSK_BksMnFEhK3NQQlTc",
});

export const uploadImage = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "posts",
  });
};

export const deleteImage = async (id) => {
  return await cloudinary.uploader.destroy(id);
};
