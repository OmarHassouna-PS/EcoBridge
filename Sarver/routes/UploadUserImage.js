const express = require('express');
const router = express.Router();
const { authPage } = require("../middleware/AuthPage");
const { ProtectionToken } = require("../middleware/ProtectionToken");
const Controller = require("../controllers/UploadImagesController");
const multer = require('multer');
const upload = multer({ storage:multer.memoryStorage()});

router.put('/upload_avatar_image', ProtectionToken, authPage(['company', 'station']), upload.single('image'), Controller.updateUserAvatar);

router.get('/get_user_avatar', ProtectionToken, authPage(['company', 'station']), Controller.getUserAvatar);

module.exports = router;
