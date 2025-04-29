const { User } = require("../models");

const getUsers = async (req, reply) => {
  try {
    const users = await User.find();
    reply.send(users);
  } catch (error) {
    reply.status(500).send(error);
  }
};

const getUser = async (req, reply) => {
  try {
    const user = await User.findById(req.params.id);
    reply.send(user);
  } catch (error) {
    reply.status(500).send(error);
  }
};

const createUser = async (req, reply) => {
  try {
    const user = new User(req.body);
    const result = await user.save();
    reply.send(result);
  } catch (error) {
    reply.status(500).send(error);
  }
};

const updateUser = async (req, reply) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    reply.send(user);
  } catch (error) {
    reply.status(500).send(error);
  }
};

const deleteUser = async (req, reply) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    reply.status(203).send("");
  } catch (error) {
    reply.status(500).send(error);
  }
};

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };
