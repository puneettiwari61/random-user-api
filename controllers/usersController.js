var User = require("../models/users");

module.exports = {
  getUserProfile: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.json({ success: true, user });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  },
  saveUser: async (req, res) => {
    try {
      const user = await User.create(req.body.user);
      res.json({ success: true, user });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  },
  updateUser: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body.user);
      res.json({ success: true, user });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  },
  getUsersList: async (req, res) => {
    try {
      const users = await User.find({})
        .limit(10)
        .sort({ createdAt: -1 })
        // .select("createdAt password updatedAt")
        .exec();
      res.json({ success: true, users });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  },
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json({ success: true });
    } catch (err) {
      console.log(err);
      res.json({ success: false, err });
    }
  },
};
