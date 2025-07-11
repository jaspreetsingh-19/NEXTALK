let express = require("express")
const { createMeeting, joinMeetingById } = require("../controller/meeting.controller")
const mRouter = express.Router()

mRouter.post("/create", createMeeting)
mRouter.get("/:meetingId", joinMeetingById)

module.exports = mRouter