const asyncHandler = require("express-async-handler");
const Status = require("../models/StudentStatus");

const getStatus = asyncHandler(async (req, res) => {
  Status.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

const createStatus = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error("Please add required field!");
  }

  const status = await Status.create(req.body);
  if (status) {
    res.status(201).json({
      _id: status.id,
      regular: status.regular,
      partTime: status.partTime,
    });
  } else {
    throw new Error("Invalid status data");
  }
});

module.exports = {
  getStatus,
  createStatus,
};
