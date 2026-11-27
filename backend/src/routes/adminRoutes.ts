import { Router } from 'express';
import { GameController } from '../controllers/gameController.js';
import { AuthMiddleware } from '../middlewares/authMiddleware.js';
import { UploadMiddleware } from '../middlewares/uploadMiddleware.js';
import { OrderController } from '../controllers/orderController.js';
import { ReviewController } from '../controllers/reviewController.js';
const router = Router();
// Kiểm tra xác thực và quyền admin cho tất cả các route trong router này
router.use(AuthMiddleware.verifyToken, AuthMiddleware.isAdmin);
// ADMIN: GAMES MANAGEMENT (/api/admin/games)
router.post('/games', UploadMiddleware.single('thumbnail'), GameController.createGame);
router.put('/games/:id', UploadMiddleware.single('thumbnail'), GameController.updateGame);
router.delete('/games/:id', GameController.deleteGame);
// ==========================================
// ADMIN: ORDERS MANAGEMENT (/api/admin/orders)
// ==========================================
router.get('/orders', OrderController.getAllOrders);
router.get('/orders/:id', OrderController.getOrderById);
router.patch('/orders/:id/status', UploadMiddleware.single('proofImage'), OrderController.updateOrderStatus);
router.patch('/orders/:id/confirm-refund', UploadMiddleware.single('refundProof'), OrderController.confirmRefund);

// ==========================================
// ADMIN: REVIEWS MANAGEMENT (/api/admin/reviews)
// ==========================================
router.delete('/reviews/:id', ReviewController.deleteReview);

export default router;