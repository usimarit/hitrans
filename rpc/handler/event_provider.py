# pylint:disable=missing-docstring

from enum import Enum
from file.file import get_config


class EventCode(Enum):
    DOUBLE_CLICK = 1
    DRAG_AND_DROP = 2
    SHORTCUT = 3


class EventProvider:
    def __init__(self):
        self.events = set()
        self.update_events()

    def attach(self, sub):
        self.subscriber = sub

    def notify(self, event_code, context):
        """
        @param: event, event code enum
        """
        if event_code in self.events:
            self.subscriber.process(context)

    def subscribe(self, event_code):
        self.events.add(event_code)

    def update_events(self):
        config = get_config()
        self.events.clear()
        # Shortcut event will always be active, only triggered when a key
        # combination is match
        self.subscribe(EventCode.SHORTCUT)
        try:
            if config['settings']['text_selection']['double_click']:
                self.subscribe(EventCode.DOUBLE_CLICK)
            if config['settings']['text_selection']['finished_selection']:
                self.subscribe(EventCode.DRAG_AND_DROP)
        except TypeError:
            pass


provider = EventProvider()
