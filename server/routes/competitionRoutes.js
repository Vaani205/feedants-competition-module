const express = require("express");

const {
  getCompetitions,
  getCompetition,
  registerForCompetition,
  checkRegistration,
} = require("../controllers/competitionController");

const router = express.Router();
router.get("/", getCompetitions);

router.get("/:id", getCompetition);

router.post("/:id/register", registerForCompetition);

router.get("/:id/registration", checkRegistration);

module.exports = router;