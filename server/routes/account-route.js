
// routes/accountRoutes.js
import express from 'express';
import { protect } from '../middleware/auth-middleware.js';
import {
  createAccount, updateAccount, deleteAccount, getAccount
} from '../controller/account-controller.js';

const router = express.Router();

router.get("/read", protect, getAccount)
router.post('/create', protect, createAccount);    // create account (user must be logged in)
router.put('/update', protect, updateAccount);     // update
router.delete('/delete', protect, deleteAccount);  // delete

export default router;