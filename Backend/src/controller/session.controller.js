import Sessions from "../models/sessions.model.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

import { validationResult } from "express-validator";

const getPublicSession = AsyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const sessions = await Sessions.find({ status: 'published' }).populate('user_id', 'email').sort({ createdAt: -1 })

    if (!sessions) {
        throw new ApiError(400, 'No public session Found')
    }

    return res.status(200).json(
        new ApiResponse(200, "Published Sessions", sessions)
    )
})

const getUserSessions = AsyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const mySessions = await Sessions.find({ user_id: req.user._id }).sort({ createdAt: -1 })

    const drafts = mySessions.filter(s => s.status === 'draft')
    const published = mySessions.filter(s => s.status === 'published')
    console.log(`mySessions-${mySessions} draft-${drafts} published-${published}`);
    
    if (!mySessions) {
        throw new ApiError(400, 'No my session')
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            "My Sessions",
            {
                mySessions,
                drafts,
                published
            }
        )
    )
})

//get single session
const getSession = AsyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.user);
    
    const session = await Sessions.findOne({
        _id: req.params.id,
        user_id: req.user._id
    })

    if (!session) {
        throw new ApiError(400, 'Session Not Found')
    }
    return res.status(200).json(
        new ApiResponse(200, "session", session)
    )
})

const saveSessionDraft = AsyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { sessionId, title, tags, json_file_url } = req.body
    // console.log(req.body);    
    const tagsArray = typeof tags === 'string' ? tags.split(',').map(tag => tag.trim()) : tags;
    if (!title || !tags || !json_file_url) {
        throw new ApiError(400, "title, tags and json_file_url are required")
    }
    // console.log(req.user._id);    
    let session;
    if (sessionId) {
        session = await Sessions.findOneAndUpdate(
            { _id: sessionId, user_id: req.user._id },
            { title, tags: tagsArray, json_file_url, status: "draft", updated_at: Date.now() },
            { new: true }
        );
        // console.log(session);        
    } else {
        session = await Sessions.create({
            user_id: req.user._id,
            title,
            tags: tagsArray,
            json_file_url
        });
    }

    return res.status(200).json(
        new ApiResponse(200, "Draft Saved", session)
    )
})

const saveSessionPublic = AsyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log("request.body",req.body);
    const { sessionId } = req.body
    
    const session = await Sessions.findOneAndUpdate(
        { _id: sessionId, user_id: req.user._id },
        { status: "published", updated_at: Date.now() },
        { new: true }
    );

    if (!session) {
        throw new ApiError(400, "Session not found")
    }

    return res.status(200).json(
        new ApiResponse(200, "session published", session)
    )
})

export {
    getPublicSession,
    getUserSessions,
    getSession,
    saveSessionDraft,
    saveSessionPublic
}