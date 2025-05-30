import { SelectEntry } from '@bpmn-io/properties-panel';

import {
  useService
} from '../../../hooks';

import { ListenerType, Retries } from './shared/Listener';

// ensure types are in logical order
export const EVENT_TYPE = [
  'creating',
  'assigning',
  'updating',
  'completing',
  'canceling',
];

export const EVENT_TO_LABEL = {
  creating: 'Creating',
  assigning: 'Assigning',
  updating: 'Updating',
  completing: 'Completing',
  canceling: 'Canceling',
};

export function TaskListenerEntries(props) {

  const {
    idPrefix,
    listener
  } = props;

  return [
    {
      id: idPrefix + '-eventType',
      component: EventType,
      idPrefix,
      listener,
      eventTypes: EVENT_TYPE
    },
    {
      id: idPrefix + '-listenerType',
      component: ListenerType,
      idPrefix,
      listener
    },
    {
      id: idPrefix + '-retries',
      component: Retries,
      idPrefix,
      listener
    }
  ];
}

function EventType(props) {
  const {
    idPrefix,
    element,
    listener,
    eventTypes
  } = props;

  const modeling = useService('modeling');
  const translate = useService('translate');

  const getOptions = () => {
    return eventTypes.map(eventType => ({
      value: eventType,
      label: translate(EVENT_TO_LABEL[eventType])
    }));
  };

  const setValue = (value) => {
    modeling.updateModdleProperties(element, listener, {
      eventType: value
    });
  };

  const getValue = () => {
    return listener.get('eventType');
  };

  return SelectEntry({
    element,
    id: idPrefix + '-eventType',
    label: translate('Event type'),
    getValue,
    setValue,
    getOptions
  });
}


