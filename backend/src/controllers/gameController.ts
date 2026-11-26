import type { Request, Response, NextFunction } from 'express';
import { Game } from '../models/Game.js';
import { Service } from '../models/Service.js';
import type { CreateGameRequestBody, UpdateGameRequestBody } from '../types/index.js';

const parseBoolean = (val: unknown, defaultVal = true): boolean => {
  if (val === undefined || val === null) return defaultVal;
  if (typeof val === 'boolean') return val;
  if (typeof val === 'string') return val.trim().toLowerCase() === 'true';
  return Boolean(val);
};

export class GameController {
  private static generateSlug(str: string): string {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }

  public static async getGames(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const filter = req.query.all === 'true' ? {} : { isActive: true };
      const games = await Game.find(filter).sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        count: games.length,
        games
      });
    } catch (error) {
      next(error);
    }
  }

  public static async getGameBySlug(
    req: Request<{ slug: string }>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { slug } = req.params;
      const game = await Game.findOne({ slug: slug.toLowerCase() });

      if (!game) {
        res.status(404).json({
          success: false,
          message: 'Không tìm thấy thông tin game'
        });
        return;
      }

      const services = await Service.find({ gameId: game._id, isActive: true });

      res.status(200).json({
        success: true,
        game,
        services
      });
    } catch (error) {
      next(error);
    }
  }
}

export default GameController;