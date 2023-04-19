import { HealthModule } from 'src/api/health/health.module';
import { routes } from 'src/api/routes';
import { SampleModule } from 'src/api/sample/sample.module';

describe('Test existing routes', () => {
  it('should exist route "" => HealthModule', () => {
    expect(routes).toContainEqual({
      path: '',
      module: HealthModule,
    });
  });

  // you should add here all the routes you want to test
  it('should exist route "/api/sample" => SampleModule', () => {
    expect(routes).toContainEqual({
      path: 'api',
      children: [
        {
          path: 'sample',
          module: SampleModule,
        },
      ],
    });
  });
});
