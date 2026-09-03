import { Request, Response, NextFunction } from "express";

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  console.error(err);
  res.status(500).json({ message: "Erro interno do servidor" });
}

export function notFound(req: Request, res: Response) {
  res.status(404).json({ message: `Rota ${req.method} ${req.originalUrl} não existe` });
}
