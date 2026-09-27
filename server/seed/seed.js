const mongoose = require("mongoose");
require("dotenv").config();

const Competition = require("../models/Competition");

const seedData = {
  title: "Creative Design Challenge",
  category: "Design",
  type: "Online Competition",
  prizePool: 50000,
  entryFee: 0,
  totalSpots: 100,
  bookedSpots: 23,

  registrationStart: new Date(Date.now() - 24 * 60 * 60 * 1000),
  registrationEnd: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),

  submissionStart: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
  submissionEnd: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),

  resultDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),

  status: "registration_open",

  judge: {
    name: "Ananya Sharma",
    title: "Senior Product Designer",
    experience: "8+ years of design experience",
    image: "https://i.pravatar.cc/200?img=47",
    introVideo: "https://example.com/video"
  },

  previousWinners: [
    {
      name: "Riya Mehta",
      position: "1st",
      prize: "₹25,000",
      image: "https://i.pravatar.cc/150?img=32"
    },
    {
      name: "Arjun Kumar",
      position: "2nd",
      prize: "₹15,000",
      image: "https://i.pravatar.cc/150?img=12"
    },
    {
      name: "Neha Singh",
      position: "3rd",
      prize: "₹10,000",
      image: "https://i.pravatar.cc/150?img=44"
    }
  ],

  about:
    "Participate in our creative design challenge and showcase your design skills. Create an innovative solution and compete with talented designers.",

  judgingParameters: [
    "Creativity",
    "Visual Design",
    "User Experience",
    "Originality",
    "Presentation"
  ],

  rules: [
    "Submit only original work.",
    "One submission per participant.",
    "Follow the competition brief.",
    "Late submissions will not be accepted.",
    "The judge's decision will be final."
  ],

  rewards: [
    {
      position: "1st",
      title: "Winner",
      amount: 25000
    },
    {
      position: "2nd",
      title: "Runner Up",
      amount: 15000
    },
    {
      position: "3rd",
      title: "Second Runner Up",
      amount: 10000
    }
  ],

  disclaimer:
    "By participating, you agree to follow the competition rules and terms.",

  referralReward: 100
};

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await Competition.deleteMany({});

    const competition = await Competition.create(seedData);

    console.log("Competition created successfully");
    console.log("Competition ID:", competition._id);

    await mongoose.disconnect();
  } catch (error) {
    console.error("Seed error:", error.message);
    process.exit(1);
  }
}

seed();