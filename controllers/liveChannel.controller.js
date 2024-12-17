const LiveChannel = require("../models/livechannel.model");

// Create a new live channel
const createLiveChannel = async (req, res) => {
  try {
    const { name, livestream } = req.body;
    console.log(req.body); // Log the body for debugging

    if (!name || !livestream) {
      return res.status(400).send({ message: "Name and Livestream are required" });
    }

    const newChannel = new LiveChannel({
      name,
      livestream,
    });

    const savedChannel = await newChannel.save();
    res.status(201).json(savedChannel);
  } catch (error) {
    console.error("Error creating live channel:", error.message);
    res.status(500).send({ message: "An error occurred while creating the channel" });
  }
};

// Fetch all live channels
const getLiveChannels = async (req, res) => {
  try {
    const channels = await LiveChannel.find({});
    res.status(200).json(channels);
  } catch (error) {
    console.error("Error fetching live channels:", error.message);
    res.status(500).send({ message: "An error occurred while fetching channels" });
  }
};

// Delete a live channel
const deleteLiveChannel = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedChannel = await LiveChannel.findByIdAndDelete(id);

    if (!deletedChannel) {
      return res.status(404).send({ message: "Channel not found" });
    }

    res.status(200).send({ message: "Channel deleted successfully", deletedChannel });
  } catch (error) {
    console.error("Error deleting live channel:", error.message);
    res.status(500).send({ message: "An error occurred while deleting the channel" });
  }
};


module.exports = { createLiveChannel, getLiveChannels, deleteLiveChannel };
