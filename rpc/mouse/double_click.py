# pylint: disable=missing-docstring, wrong-import-order
from pynput import mouse
from datetime import datetime
from handler.event_provider import provider, EventCode


class DoubleClick:
    def __init__(self):
        self.lasttime = datetime.now()

    def is_activated(self):
        now = datetime.now()
        deltatime = now - self.lasttime
        self.lasttime = now
        return deltatime.microseconds < 200000


double_click = DoubleClick()


def on_double_click(x, y, button, pressed):
    if pressed or button != mouse.Button.left or not double_click.is_activated():
        return
    provider.notify(EventCode.DOUBLE_CLICK, (x, y))


double_click_listener = mouse.Listener(on_click=on_double_click)
