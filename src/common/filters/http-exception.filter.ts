import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ClsKeys } from 'src/utils/cls/cls.constants';
import { ClsUtils } from 'src/utils/cls/cls.utils';
import { PinoLoggerService } from 'src/utils/logger/pino-logger.service';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = PinoLoggerService.AppLogger;

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
        ? { ...exception, stack: exception.stack }
        : {
            type: exception.type,
            message: exception.message,
            stack: exception.stack,
            response: {
              statusCode: status,
              message: exception.message,
            },
          };

    this.logger.error(
      {
        startRequestTime,
        endRequestTime,
        exception: formattedException,
        requestDuration: `${Number((endRequestTime - startRequestTime) / 1000000n)} ms`,
      },
      `Request ERROR (${requestId}) --> ${method} ${url}`,
    );

    response.code(status).send();
  }
}
