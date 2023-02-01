import { INestApplication } from '@nestjs/common';
import { OpenAPIObject, DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { stringify as YamlStringify } from 'json-to-pretty-yaml';
import { writeFileSync } from 'fs';
import * as openapiConfigValues from '../openapi/config.json';

const openApiSpecificationWriteFiles = (document: OpenAPIObject) => {
  writeFileSync(__dirname + '/../../openapi/openapi-specification.yaml', YamlStringify(document));
  writeFileSync(__dirname + '/../../openapi/openapi-specification.json', JSON.stringify(document, null, 2));
};

export const openApiDocumentationSetup = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle(openapiConfigValues.app_name)
    .setDescription(openapiConfigValues.app_description)
    .setVersion(openapiConfigValues.app_version)
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/spec', app, document);
  openApiSpecificationWriteFiles(document);
};
