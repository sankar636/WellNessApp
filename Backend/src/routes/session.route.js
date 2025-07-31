import { Router } from "express";
import { getPublicSession, getUserSessions, getSession, saveSessionDraft, saveSessionPublic } from "../controller/session.controller.js";
import { body } from "express-validator";
import verifyJWT from "../middleware/auth.middleware.js";



const router = Router();

// Public route - doesn't require authentication
router.route('/')
    .get(
        getPublicSession
    );

// All routes below require authentication
router.use(verifyJWT);

router.route('/my-sessions')
    .get(
        getUserSessions
    );

router.route('/my-sessions/:id')
    .get(
        getSession
    );

router.route('/my-sessions/save-draft')
    .post(
        [
            body('title').notEmpty().withMessage('Title is required'),
            body('tags').notEmpty().withMessage('Tags are required'),
            body('json_file_url').isURL().withMessage('Invalid JSON file URL'),
        ],
        saveSessionDraft
    );

router.route('/my-sessions/publish')
    .post(
        [
            body('sessionId').notEmpty().withMessage('Session ID is required'),
        ],
        saveSessionPublic
    );

export default router;