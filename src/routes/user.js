const express = require('express');
const UserRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const USER_SAFE_DATA = 'firstName lastName skills age photoUrl about gender';
const User = require('../models/user');

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

UserRouter.get("/feed", userAuth, async (req, res) => {
    try{
        const loggedInUser = req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1) * limit;    

        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id },
            ]
        }).select("fromUserId toUserId");

        const hideUsersFromFeed = new Set();
        connectionRequests.forEach((request) => {
            hideUsersFromFeed.add(request.fromUserId.toString());
            hideUsersFromFeed.add(request.toUserId.toString());
        }
    );
        const users = await User.find({
            $and: [
                {_id: { $nin: Array.from(hideUsersFromFeed)}},
                {_id: { $ne: loggedInUser._id }},
            ]
        })
        .select(USER_SAFE_DATA)
        .skip(skip)
        .limit(limit);

        res.json({ data : users});

    } catch(err){
        res.status(400).send("ERROR: " + err.message)
    }
})

module.exports = UserRouter;