import { ClsKeys } from './cls.constants';
import { FastifyRequest, FastifyReply } from 'fastify';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { ClsUtils } from './cls.utils';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class ClsMiddleware implements NestMiddleware {
  use(req: FastifyRequest, res: FastifyReply, next: any) {
    const namespace = ClsUtils.getNs();
    namespace.run(() => {
      ClsUtils.set(ClsKeys.REQUEST_ID, uuidV4());

      next();
    });
  }
}
