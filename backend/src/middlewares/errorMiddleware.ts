import type {Request, Response, NextFunction} from 'express';

export interface AppError extends Error {
  statusCode?: number;
  code?: number;
  errors?: Record<string, { message: string }>;
}
class ErrorMiddleware {
  public static notFoundHandler(req: Request, res: Response, _next: NextFunction): void {
    res.status(404).json({
      success: false,
      message: `Không tìm thấy tài nguyên: ${req.method} ${req.originalUrl}`
    });
  }
  public static errorHandler(err: AppError, req: Request, res: Response, _next: NextFunction): void {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Lỗi máy chủ nội bộ";
    
    // Lỗi Mongoose duplicate key (code 11000)
    if (err.code === 11000) {
        statusCode = 400;
        message = "Dữ liệu trùng lặp. Vui lòng kiểm tra lại.";
    }

    // Lỗi mongoose CastError (ví dụ: ObjectId không hợp lệ)
    if (err.name === "CastError") {
        statusCode = 400;
        message = "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.";
    }

    // Lỗi validation từ Mongoose
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.";
    }

    // Multer limit error
    if (err.name === "MulterError") {
        statusCode = 400;
        message = `Lỗi tải lên tệp, ${err.message}`;
    }
    console.error(`[Error] ${statusCode} - ${message}`);
    
    res.status(statusCode).json({
      success: false,
      message: message,
      errors: err.errors || undefined
    });
  }
}

export default ErrorMiddleware;