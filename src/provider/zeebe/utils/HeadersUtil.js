import {
  getBusinessObject,
  is
} from 'bpmn-js/lib/util/ModelUtil';

import {
  getExtensionElementsList
} from './ExtensionElementsUtil';
import { isZeebeServiceTask } from './ZeebeServiceTaskUtil';

export function areHeadersSupported(element) {
  return is(element, 'bpmn:UserTask') || isZeebeServiceTask(element);
}

/**
 * Get first zeebe:TaskHeaders element for a specific element.
 *
 * @param  {any} element
 *
 * @return {any} a zeebe:TaskHeader element
 */
export function getTaskHeaders(element) {
  const businessObject = getBusinessObject(element);

  return getExtensionElementsList(businessObject, 'zeebe:TaskHeaders')[0];
}

/**
 * Retrieve all zeebe:Header elements for a specific element.
 *
 * @param  {any} element
 *
 * @return {Array<any>} a list of zeebe:Header elements
 */
export function getHeaders(element) {
  const taskHeaders = getTaskHeaders(element);

  return taskHeaders ? taskHeaders.get('values') : [];
}
