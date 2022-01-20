import {
  find,
  flatten,
  isString,
  isUndefined,
  values
} from 'min-dash';

import {
  getTemplateId,
  getTemplateVersion
} from './Helper';

import { isAny } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

/** @typedef {import('../../types').TemplateDescriptor} TemplateDescriptor */

/**
 * Registry for element templates.
 */
export default class ElementTemplates {
  constructor() {
    this._templates = {};
  }

  /**
   * Get template with given ID and optional version or for element.
   *
   * @param {String|any} id
   * @param {number|string} [version]
   *
   * @return {TemplateDescriptor}
   */
  get(id, version) {
    const templates = this._templates;

    let element;

    if (isUndefined(id)) {
      return null;
    } else if (isString(id)) {

      if (isUndefined(version)) {
        version = '_';
      }

      if (templates[ id ] && templates[ id ][ version ]) {
        return templates[ id ][ version ];
      } else {
        return null;
      }
    } else {
      element = id;

      return this.get(getTemplateId(element), getTemplateVersion(element));
    }
  }

  /**
   * Get default template for given element.
   *
   * @param {any} element
   *
   * @return {TemplateDescriptor}
   */
  getDefault(element) {
    return find(this.getAll(), function(template) {
      return isAny(element, template.appliesTo) && template.isDefault;
    }) || null;
  }

  /**
   * Get all templates (with given ID).
   *
   * @param {string} [id]
   *
   * @return {Array<TemplateDescriptor>}
   */
  getAll(id) {
    if (!isUndefined(id) && this._templates[ id ]) {
      return values(this._templates[ id ]);
    }

    return flatten(values(this._templates).map(values));
  }

  /**
   * Set templates.
   *
   * @param {Array<TemplateDescriptor>} templates
   */
  set(templates) {
    this._templates = {};

    templates.forEach((template) => {
      const id = template.id,
            version = isUndefined(template.version) ? '_' : template.version;

      if (!this._templates[ id ]) {
        this._templates[ id ] = {};
      }

      this._templates[ id ][ version ] = template;
    });
  }
}
