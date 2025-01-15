const { Mongoose, default: mongoose } = require("mongoose");
const LiveChannel = require("../models/livechannel.model");

const createLiveChannel = async (req, res) => {
  try {
    const { name, livestream, origin, referer, useragent } = req.body;

    console.log("Request Body:", req.body); // Log the incoming request

    if (!name || !livestream || !origin || !referer || !useragent) {
      console.log("Validation Error: Missing required fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    const newChannel = new LiveChannel({ name, livestream, origin, referer, useragent });
    const savedChannel = await newChannel.save();

    console.log("Saved Channel:", savedChannel); // Log the saved document
    res.status(201).json(savedChannel);
  } catch (error) {
    console.error("Error creating live channel:", error.message);
    res.status(500).json({ message: "Error creating channel", error: error.message });
  }
};

const getLiveChannels = async (req, res) => {
  try {
    const channels = await LiveChannel.find({})
      .select("name livestream origin referer useragent") // Include useragent in the response
      .limit(100)
      .maxTimeMS(5000);

    res.status(200).json(channels);
  } catch (error) {
    console.error("Error fetching live channels:", error.message);

    if (error.code === 50) {
      return res.status(503).json({ message: "Server timeout: Query took too long" });
    }

    res.status(500).json({ message: "An error occurred while fetching channels" });
  }
};

const deleteLiveChannel = async (req, res) => {
  const { id } = req.params;

  console.log('ID to delete:', id); // Debugging log

  try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
          console.log('Invalid ID format'); // Debugging log
          return res.status(400).json({ message: "Invalid channel ID format" });
      }

      const deletedChannel = await LiveChannel.findByIdAndDelete(id);

      console.log('Deleted Channel:', deletedChannel); // Debugging log

      if (!deletedChannel) {
          return res.status(404).send({ message: 'Channel not found' });
      }

      res.status(200).send({
          message: 'Channel deleted successfully',
          deletedChannel,
      });
  } catch (error) {
      console.error('Error deleting channel:', error.message);
      res.status(500).send({
          message: 'An error occurred while deleting the channel',
          error: error.message,
      });
  }
};


module.exports = { createLiveChannel, getLiveChannels, deleteLiveChannel };
