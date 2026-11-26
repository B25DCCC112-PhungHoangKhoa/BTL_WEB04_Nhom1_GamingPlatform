import { Router } from 'express';
import { GameController } from '../controllers/gameController.js';
import { AuthMiddleware } from '../middlewares/authMiddleware.js';
import { UploadMiddleware } from '../middlewares/uploadMIddleware.js';

const router = Router();
// Kiểm tra xác thực và quyền admin cho tất cả các route trong router này
router.use(AuthMiddleware.verifyToken, AuthMiddleware.isAdmin);
// ADMIN: GAMES MANAGEMENT (/api/admin/games)
router.post('/games', UploadMiddleware.single('thumbnail'), GameController.createGame);
router.put('/games/:id', UploadMiddleware.single('thumbnail'), GameController.updateGame);
router.delete('/games/:id', GameController.deleteGame);


export default router;