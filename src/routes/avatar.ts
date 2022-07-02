import { Router } from 'express';
import multer from 'multer';
import { avatarFail, createAvatar, getAvatar } from '../controllers/avatar';

const avatarRouter = Router();

const upload = multer({
   limits: { fileSize: 1000000 }, // 1MB
   fileFilter(req, file, callback) {
      if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
         return callback(new Error('Please upload an image file'));
      }

      callback(null, true);
   },
});

avatarRouter.post('/upload/:id', upload.single('avatar'), createAvatar, avatarFail);

avatarRouter.get('/:id', getAvatar);

export default avatarRouter;
