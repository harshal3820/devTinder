const express = require('express');
const UserRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const USER_SAFE_DATA = 'firstName lastName skills age profileUrl about gender'

UserRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate('fromUserId', USER_SAFE_DATA);

        res.json({
            message: "Data fetched sccessfully",
            data: connectionRequests,
        })

    } catch (err) {
        res.status(400).send("ERROR: " + err.message)
    }

})

UserRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id, status: "accepted" },
                { toUserId: loggedInUser._id, status: "accepted" },
            ]
        }).populate("fromUserId", USER_SAFE_DATA)
            .populate("toUserId", USER_SAFE_DATA);

        const data = connectionRequests.map((request) => {
            if (request.fromUserId._id.equals(loggedInUser._id)) {
                return request.toUserId;
            }
            return request.fromUserId;
        });

        res.json({
            message: "Data fetched successfully",
            data,
        })

    } catch (err) {
        res.status(400).send("ERROR: " + err.message)
    }
})

module.exports = UserRouter;