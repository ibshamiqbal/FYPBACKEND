const LiveChannel = require("../models/livechannel.model");

const createLiveChannel = async (req, res) => {
  try {
    const { name, livestream, origin, referer } = req.body;

    // Log the incoming request body
    console.log("Request Body Received:", req.body);

    // Input validation: Ensure all fields are present
    if (!name || !livestream || !origin || !referer) {
      console.log("Validation Error: Missing required fields");
      return res.status(400).json({ message: "All fields (name, livestream, origin, referer) are required" });
    }

    // Create and save a new channel
    const newChannel = new LiveChannel({ name, livestream, origin, referer });
    const savedChannel = await newChannel.save();

    console.log("LiveChannel Saved Successfully:", savedChannel);
    res.status(201).json(savedChannel);
  } catch (error) {
    console.error("Error creating live channel:", error.message);
    res.status(500).json({ message: "An error occurred while creating the channel" });
  }
};

const getLiveChannels = async (req, res) => {
  try {
    // Fetch channels with a limit and handling for performance
    const channels = await LiveChannel.find({})
      .select("name livestream origin referer") // Select specific fields for response
      .limit(100) // Limit the number of records returned
      .maxTimeMS(5000); // Set maximum execution time to 5 seconds

    res.status(200).json(channels);
  } catch (error) {
    console.error("Error fetching live channels:", error.message);

    // Handle timeout errors specifically
    if (error.code === 50) {
      return res.status(503).json({ message: "Server timeout: Query took too long" });
    }

    res.status(500).json({ message: "An error occurred while fetching channels" });
  }
};

const deleteLiveChannel = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format (e.g., MongoDB ObjectId)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid channel ID format" });
    }

    // Attempt to delete the channel by ID
    const deletedChannel = await LiveChannel.findByIdAndDelete(id);

    if (!deletedChannel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    res.status(200).json({ message: "Channel deleted successfully", deletedChannel });
  } catch (error) {
    console.error("Error deleting live channel:", error.message);
    res.status(500).json({ message: "An error occurred while deleting the channel" });
  }
};

module.exports = { createLiveChannel, getLiveChannels, deleteLiveChannel };
