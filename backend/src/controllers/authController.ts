import type { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import type { RegisterRequestBody, LoginRequestBody } from '../types/index.js';

export class AuthController {
  public static async register(
    req: Request<Record<string, never>, unknown, RegisterRequestBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name, email, password, phoneNumber } = req.body;

      if (!name || !email || !password) {
        res.status(400).json({
          success: false,
          message: 'Họ tên, email và mật khẩu là bắt buộc'
        });
        return;
      }

      if (password.length < 6) {
        res.status(400).json({
          success: false,
          message: 'Mật khẩu phải có tối thiểu 6 ký tự'
        });
        return;
      }

      const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
      if (existingUser) {
        res.status(400).json({
          success: false,
          message: 'Email này đã được sử dụng'
        });
        return;
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        phoneNumber: phoneNumber ? phoneNumber.trim() : null,
        role: 'client'
      });

      const jwtSecret = process.env.JWT_SECRET || 'default_jwt_secret';
      const token = jwt.sign(
        {
          id: newUser._id.toString(),
          role: newUser.role
        },
        jwtSecret,
        { expiresIn: '7d' }
      );

      res.status(201).json({
        success: true,
        token,
        user: {
          id: newUser._id.toString(),
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          phoneNumber: newUser.phoneNumber
        }
      });
    } catch (error) {
      next(error);
    }
  }
}
export default AuthController;