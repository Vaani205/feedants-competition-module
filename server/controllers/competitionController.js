const mongoose = require("mongoose");
const Competition = require("../models/Competition");
const Registration = require("../models/Registration");
const User = require("../models/User");

const getCompetitions = async (req, res) => {
  try {
    const competitions = await Competition.find();

    res.json({
      success: true,
      data: competitions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCompetition = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid competition ID",
      });
    }

    const competition = await Competition.findById(id);

    if (!competition) {
      return res.status(404).json({
        success: false,
        message: "Competition not found",
      });
    }

    res.json({
      success: true,
      data: competition,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const registerForCompetition = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, name, email } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid competition ID",
      });
    }

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    const competition = await Competition.findById(id);

    if (!competition) {
      return res.status(404).json({
        success: false,
        message: "Competition not found",
      });
    }

    const now = new Date();

    if (
      competition.registrationStart &&
      now < competition.registrationStart
    ) {
      return res.status(400).json({
        success: false,
        message: "Registration has not started yet",
      });
    }

    if (
      competition.registrationEnd &&
      now > competition.registrationEnd
    ) {
      return res.status(400).json({
        success: false,
        message: "Registration has closed",
      });
    }

    if (competition.bookedSpots >= competition.totalSpots) {
      return res.status(400).json({
        success: false,
        message: "No spots available",
      });
    }

    let user;

    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      user = await User.findById(userId);
    }

    if (!user) {
      user = await User.findOne({ email });

      if (!user) {
        user = await User.create({
          name,
          email,
        });
      }
    }

    const alreadyRegistered = await Registration.findOne({
      userId: user._id,
      competitionId: competition._id,
    });

    if (alreadyRegistered) {
      return res.status(409).json({
        success: false,
        message: "You are already registered",
      });
    }

    const registration = await Registration.create({
      userId: user._id,
      competitionId: competition._id,
    });

    competition.bookedSpots += 1;
    await competition.save();

    res.status(201).json({
      success: true,
      message: "Successfully registered",
      data: {
        registration,
        spotsRemaining:
          competition.totalSpots - competition.bookedSpots,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Already registered",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const checkRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;

    if (!userId) {
      return res.json({
        success: true,
        registered: false,
      });
    }

    const registration = await Registration.findOne({
      competitionId: id,
      userId,
    });

    res.json({
      success: true,
      registered: !!registration,
      data: registration || null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getCompetitions,
  getCompetition,
  registerForCompetition,
  checkRegistration,
};