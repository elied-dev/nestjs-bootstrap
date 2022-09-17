import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ClsUtils } from './cls.utils';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class ClsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const namespace = ClsUtils.getNs();
    namespace.run(() => {
      ClsUtils.set('requestId', uuidV4());

      next();
    });
  }
}
