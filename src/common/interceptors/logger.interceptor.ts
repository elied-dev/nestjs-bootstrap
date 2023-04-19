import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Observable, tap } from 'rxjs';
import { appConfig } from 'src/config';
import { ClsKeys } from 'src/utils/cls/cls.constants';
import { ClsUtils } from 'src/utils/cls/cls.utils';
import { PinoLoggerService } from 'src/utils/logger/pino-logger.service';

export class LoggerInterceptor implements NestInterceptor {
  private logger = PinoLoggerService.AppLogger;

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: FastifyRequest = context.switchToHttp().getRequest();

    //  exclude logging for specific paths
    const excludePaths = appConfig.logConfig.excludedPaths;
    if (excludePaths.includes(req.routerPath)) {
      return next.handle();
    }

    const startRequestTime = process.hrtime.bigint();
    ClsUtils.set(ClsKeys.START_REQUEST_TIME, startRequestTime);

    const { method, url } = req;
    const requestId = ClsUtils.get(ClsKeys.REQUEST_ID);

    this.logger.info({ ...requestInfo(req), startRequestTime }, `Request START (${requestId}) --> ${method} ${url}`);
    return next.handle().pipe(
      tap(() => {
        const res: FastifyReply = context.switchToHttp().getResponse();
        const endRequestTime = process.hrtime.bigint();
        ClsUtils.set(ClsKeys.END_REQUEST_TIME, endRequestTime);
        this.logger.info(
          {
            ...responseInfo(req, res),
            ...requestInfo(req),
            startRequestTime,
            endRequestTime,
            requestDuration: `${Number((endRequestTime - startRequestTime) / 1000000n)} ms`,
          },
          `Request END (${requestId}) --> ${method} ${url}`,
        );
      }),
    );
  }
}

const responseInfo = (req: FastifyRequest, res: FastifyReply) => {
  const { statusCode } = res;
  return {
    res: { statusCode },
    ...requestInfo(req),
  };
};

const requestInfo = (req: FastifyRequest) => {
  const { method, body, url, params, query } = req;
  return {
    req: { method, url, body, params, query },
  };
};
