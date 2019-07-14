from enum import Enum


class EventCode(Enum):
    DOUBLE_CLICK = 1


class EventProvider:
    def __init__(self):
        self.subscribers = {
            # event_code: [sub]
        }

    def notify(self, event_code, context):
        """
        @param: event, event code enum
        """
        for sub in self.subscribers[event_code]:
            sub.process(event_code, context)

    def subsribe(self, event_code, sub):
        self.subscribers.setdefault(event_code, []).append(sub)

    def unsubscribe(self, event_code, sub):
        self.subscribers[event_code].remove(sub)
