import type { FastifyReply, FastifyRequest } from 'fastify';

export interface AppErrorPayload {
  error: string;
  message: string;
  statusCode: number;
}

export class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 400, error = 'Bad Request') {
    super(message);
    this.statusCode = statusCode;
    this.name = 'AppError';
    Object.defineProperty(this, 'error', { value: error });
  }
}

export function sendError(reply: FastifyReply, statusCode: number, message: string, error = 'Bad Request'): FastifyReply {
  return reply.code(statusCode).send({ error, message, statusCode } satisfies AppErrorPayload);
}

export function notFound(reply: FastifyReply, message = 'Not found'): FastifyReply {
  return sendError(reply, 404, message, 'Not Found');
}

export function unauthorized(reply: FastifyReply, message = 'Unauthorized'): FastifyReply {
  return sendError(reply, 401, message, 'Unauthorized');
}

export function badRequest(reply: FastifyReply, message: string): FastifyReply {
  return sendError(reply, 400, message);
}

declare module 'fastify' {
  interface FastifyRequest {
    // populated by auth plugin on authenticated requests
    userId?: number;
    sessionId?: string;
    mailboxPassword?: string;
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { sub: number; sid: string; email: string };
    user: { sub: number; sid: string; email: string };
  }
}

export type AuthedRequest = FastifyRequest & {
  user: { sub: number; sid: string; email: string };
};
