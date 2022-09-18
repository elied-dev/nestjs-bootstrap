import { FastifyReply, FastifyRequest } from 'fastify';
import { AppLogger } from '../logger/pino.logger';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ClsUtils } from '../../utils/cls/cls.utils';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    this.catchException(exception, host, { status });
  }

  catchException(
    exception: any,
    host: ArgumentsHost,
    { status }: { status: number },
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    const { method, url } = request;

    const startRequestTime = ClsUtils.get('startRequestTime');
    const endRequestTime = Date.now();
    ClsUtils.set('endRequestTime', endRequestTime);

    const requestId = ClsUtils.get('requestId');

    const formattedException =
      exception instanceof HttpException
        ? exception
        : {
            type: exception.type,
            message: exception.message,
            stack: exception.stack,
          };

    AppLogger.error(
      {
        requestId,
        startRequestTime,
        endRequestTime,
        exception: formattedException,
        duration: endRequestTime - startRequestTime,
      },
      `Request error ${requestId} - ${method} ${url}`,
    );

    response.code(status).send({
      statusCode: status,
      timestamp: new Date().toISOString(),
      description: exception.message,
      path: request.url,
      requestId,
    });
  }
}
