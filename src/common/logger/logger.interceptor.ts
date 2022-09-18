import { appConfig } from '../../config/index';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { FastifyRequest, FastifyReply } from 'fastify';
import { ClsUtils } from 'src/utils/cls/cls.utils';
import { AppLogger } from './pino.logger';

export class LoggerInterceptor implements NestInterceptor {
  private logger = AppLogger;
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: FastifyRequest = context.switchToHttp().getRequest();

    //  exclude logging for specific paths
    const excludePaths = appConfig.logConfig.excludedPaths;
    if (excludePaths.includes(req.routerPath)) {
      return next.handle();
    }

    const startRequestTime = Date.now();
    ClsUtils.set('startRequestTime', startRequestTime);

    const { method, url } = req;
    const requestId = ClsUtils.get('requestId');

    this.logger.info(
      { ...requestInfo(req), startRequestTime },
      `Request started ${requestId} - ${method} ${url}`,
    );

    return next.handle().pipe(
      tap((data) => {
        const res: FastifyReply = context.switchToHttp().getResponse();

        const endRequestTime = Date.now();
        ClsUtils.set('endRequestTime', endRequestTime);

        this.logger.info(
          {
            ...responseInfo(req, res, data),
            startRequestTime,
            endRequestTime,
            duration: endRequestTime - startRequestTime,
          },
          `Request completed ${requestId} - ${method} ${url}`,
        );
      }),
    );
  }
}

const defaultInfo = () => {
  return {
    requestId: ClsUtils.get('requestId'),
  };
};

const requestInfo = (req: FastifyRequest) => {
  const { method, body, url, params, headers, query } = req;
  return {
    ...defaultInfo(),
    req: { method, url, body, params, query, headers },
  };
};

const responseInfo = (req: FastifyRequest, res: FastifyReply, data: any) => {
  const { statusCode } = res;
  return {
    ...defaultInfo(),
    res: { statusCode, data },
    ...requestInfo(req),
  };
};
