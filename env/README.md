# Environment Files

This folder should contain any environment file with the following syntax:

```nodejs
(${region})?.${environment}.env
```

Could be `dev.env` or `use1.production.env` etc...

Should contain the following env variables (the values are only examples):

```bash
NODE_ENV="development"
APP_PORT="3000"

LOG_LEVEL="info"
LOG_PRETTIFY="true"
LOG_EXCLUDED_PATHS="/,/health,/liveness,/readiness"

METRICS_PORT="9999"
METRICS_PREFIX=""
```
