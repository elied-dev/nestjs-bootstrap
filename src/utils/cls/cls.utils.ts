import { createNamespace, getNamespace, Namespace } from 'cls-hooked';
import { omit } from 'lodash';

export class ClsUtils {
  static getNs(name = 'app'): Namespace {
    const ns = getNamespace(name);
    return ns || createNamespace(name);
  }

  static getAll(namespace = 'app') {
    return omit(getNamespace(namespace)?.active, ['_ns_name', 'id']);
  }

  static get(key: string, namespace = 'app') {
    return this.getNs(namespace).get(key);
  }

  static set(key: string, value: any, namespace = 'app') {
    return this.getNs(namespace).set(key, value);
  }
}
