import { ClsUtils } from 'src/utils/cls/cls.utils';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { NotFoundException, ArgumentsHost } from '@nestjs/common';
import { createMock } from '@golevelup/ts-jest';

describe('Test HttpExceptionFilter', () => {
  it('should catch exception', () => {});
});

describe('Test HttpExceptionFilter', () => {
  const mockArgumentHost = createMock<ArgumentsHost>();
  const httpExceptionFilter = new HttpExceptionFilter();

  it('should catch 404 exception', () => {
    ClsUtils.getNs().run(() => {
      httpExceptionFilter.catch(new NotFoundException(), mockArgumentHost);
    });
  });

  it('should catch not http exception', () => {
    ClsUtils.getNs().run(() => {
      httpExceptionFilter.catch(new Error(), mockArgumentHost);
    });
  });

  it('should fail without CLS', () => {
    let hasFailed = false;
    try {
      httpExceptionFilter.catch(new NotFoundException(), mockArgumentHost);
    } catch (e) {
      hasFailed = true;
    }
    expect(hasFailed).toBeTruthy();
  });
});
