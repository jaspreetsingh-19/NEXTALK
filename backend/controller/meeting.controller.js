
const meeting = require("../models/meeting.model");
const { v4: uuidv4 } = require('uuid');

async function createMeeting(req, res) {
    try {
        const { hostId } = req.body
        const meetingId = uuidv4().split("-")[0]

        const newMeeting = new meeting({
            meetingId: meetingId,
            host: hostId,
            date: new Date()
        })

        await newMeeting.save()
        return res.status(201).json({ meetingId });

    }
    catch (e) {
        console.error("Error creating meeting:", e);
        return res.status(500).json({ error: "Server error" });
    }


}


async function joinMeetingById(req, res) {

    try {
        const { meetingId } = req.params
        const foundMeeting = await meeting.findOne({ meetingId: meetingId.toUpperCase() })
        if (!foundMeeting) {
            return res.status(404).json({ error: "Meeting not found" });
        }
        return res.status(200).json({ message: "Meeting exists", meeting });
    } catch (e) {
        console.error("Error joining meeting:", e);
        return res.status(500).json({ error: "Server error" });
    }
}

module.exports = { createMeeting, joinMeetingById }