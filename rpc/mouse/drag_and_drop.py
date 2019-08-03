from pynput import mouse
from datetime import datetime
from handler.event_provider import EventCode, provider


class DragAndDrop(object):
    def __init__(self):
        self.lasttime = datetime.now()

    def is_activated(self):
        pass


def on_click(x, y, button, pressed):
    pass

drag_and_drop_listener = mouse.Listener(on_click=on_click)
