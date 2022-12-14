import { ClsKeys } from './../../utils/cls/cls.constants';
import { FastifyReply, FastifyRequest } from 'fastify';
import { AppLogger } from '../logger/pino.logger';
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { ClsUtils } from '../../utils/cls/cls.utils';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    this.catchException(exception, host, { status });
  }

  catchException(exception: any, host: ArgumentsHost, { status }: { status: number }) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    const { method, url } = request;

    const startRequestTime = ClsUtils.get(ClsKeys.START_REQUEST_TIME) || process.hrtime.bigint();
    const endRequestTime = process.hrtime.bigint();
    ClsUtils.set(ClsKeys.END_REQUEST_TIME, endRequestTime);

    const requestId = ClsUtils.get(ClsKeys.REQUEST_ID);

    const formattedException =
      exception instanceof HttpException
        ? exception
        : {
            type: exception.type,
            message: exception.message,
            stack: exception.stack,
            response: {
              statusCode: status,
              message: exception.message,
            },
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
      message: exception.response?.message || exception.message,
    });
  }
}
