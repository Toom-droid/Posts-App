import Post from "../models/Post.js";
import { uploadImage, deleteImage } from "../libs/cloudinary.js";
import fs from "fs-extra";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPost = async (
  { files, body: { title, description } },
  res
) => {
  try {
    let image;

    if (files?.image) {
      const result = await uploadImage(files.image.tempFilePath);
      await fs.remove(files.image.tempFilePath);
      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }
    const newPost = new Post({ title, description, image });
    await newPost.save();

    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (
  { params: { id }, body: { title, description } },
  res
) => {
  try {
    const updatedPost = { title, description };
    const post = await Post.findByIdAndUpdate(id, updatedPost, { new: true });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async ({ params: { id } }, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) return res.sendStatus(404);
    if (deletedPost.image.public_id) {
      await deleteImage(deletedPost.image.public_id);
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPost = async ({ params: { id } }, res) => {
  try {
    const post = await Post.findById(id);
    if (!post) return res.sendStatus(404);
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
