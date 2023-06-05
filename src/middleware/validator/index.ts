import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { STATUS_CODES } from 'http';

export function validate(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ status: STATUS_CODES[400] });
}
