var express = require("express");
const sequenceGenerator = require("./sequenceGenerator");
const Message = require("../models/message");
var router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    // call the Message model find() method to get all messages in the collection
    const messages = await Message.find();

    res.status(200).json(messages);
  } catch (error) {
    console.log("Fetching messages failed:", error);
    // res.status(500).send("failed to fetch messages");
    res.status(500).json({
      message: "failed to fetch messages",
      error: error,
    });
  }
});

router.post("/", (req, res, next) => {
  const maxMessageId = sequenceGenerator.nextId("messages");
  console.log(req.body);

  const message = new Message({
    id: maxMessageId,
    subject: req.body?.subject,
    msgText: req.body?.msgText,
    sender: req.body?.sender,
  });

  message
    .save()
    .then((createdMessage) => {
      res.status(201).json({
        message: "Message added successfully",
        messageData: createdMessage,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "An error occurred",
        error: error,
      });
    });
});

router.put("/:id", (req, res, next) => {
  Message.findOne({ id: req.params.id })
    .then((message) => {
      message.subject = req.body?.subject;
      message.msgText = req.body?.msgText;
      message.sender = req.body?.sender;

      Message.updateOne({ id: req.params.id }, message)
        .then((result) => {
          res.status(204).json({
            message: "Message updated successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Message not found.",
        error: { message: "Message not found" },
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Message.findOne({ id: req.params.id })
    .then((message) => {
      Message.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({
            message: "Message deleted successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Message not found.",
        error: { message: "Message not found" },
      });
    });
});

module.exports = router;
