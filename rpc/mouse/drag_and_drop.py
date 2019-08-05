from pynput import mouse
from datetime import datetime
from handler.event_provider import EventCode, provider


class DragAndDrop(object):
    def __init__(self):
        self.pressing = False
        self.releasing = False

    def is_activated(self, x, y):
        return self.releasing and self.pressing and (x != self.x) and (y != self.y)

    def press(self, x, y):
        self.x = x
        self.y = y
        self.pressing = True

    def release(self):
        self.releasing = True

    def reset(self):
        self.pressing = False
        self.releasing = False


drag_and_drop = DragAndDrop()


def on_click(x, y, button, pressed):
    if button != mouse.Button.left:
        return
    if not pressed:
        drag_and_drop.release()
        if drag_and_drop.is_activated(x, y):
            provider.notify(EventCode.DRAG_AND_DROP, (x, y))
        drag_and_drop.reset()
    drag_and_drop.press(x, y)


drag_and_drop_listener = mouse.Listener(on_click=on_click)
