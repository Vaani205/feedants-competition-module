const mongoose = require("mongoose");

const competitionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    category: String,

    type: String,

    prizePool: {
      type: Number,
      default: 0
    },

    entryFee: {
      type: Number,
      default: 0
    },

    totalSpots: {
      type: Number,
      required: true
    },

    bookedSpots: {
      type: Number,
      default: 0
    },

    registrationStart: Date,
    registrationEnd: Date,
    submissionStart: Date,
    submissionEnd: Date,
    resultDate: Date,

    status: {
      type: String,
      enum: [
        "upcoming",
        "registration_open",
        "registration_closed",
        "submission_open",
        "submission_closed",
        "completed"
      ],
      default: "upcoming"
    },

    judge: {
      name: String,
      title: String,
      experience: String,
      image: String,
      introVideo: String
    },

    previousWinners: [
      {
        name: String,
        position: String,
        prize: String,
        image: String
      }
    ],

    about: String,

    judgingParameters: [String],

    rules: [String],

    rewards: [
      {
        position: String,
        title: String,
        amount: Number
      }
    ],

    disclaimer: String,

    referralReward: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Competition", competitionSchema);