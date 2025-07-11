let mongoose = require("mongoose");
let schema = mongoose.Schema;
let meetingSchema = new schema({
    meetingId: { type: String, required: true, unique: true, uppercase: true, },

    host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
})
let meeting = mongoose.model("meeting", meetingSchema);
module.exports = meeting;