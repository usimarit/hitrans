# pylint: disable=missing-docstring
from pynput import keyboard
from file.file import get_config
from handler.event_provider import provider, EventCode


class KeyboardShortcut:
    def __init__(self):
        # key combination to check
        self.combination = set()
        # current pressed key combination
        self.current = set()
        self.update_key_combination()

    def update_key_combination(self):
        self.combination.clear()
        config = get_config()
        try:
            if config['settings']['shortcut']['alt']:
                self.combination.add(keyboard.Key.alt)
            if config['settings']['shortcut']['ctrl']:
                self.combination.add(keyboard.Key.ctrl)
            if config['settings']['shortcut']['shift']:
                self.combination.add(keyboard.Key.shift)
        except TypeError:
            pass
        # Only add key combination when at least 1 function key is set
        if self.combination:
            if keyboard.Key.shift in self.combination:
                self.combination.add(keyboard.KeyCode(char='B'))
            else:
                self.combination.add(keyboard.KeyCode(char='b'))

    def add_current_active_key(self, key):
        self.current.add(key)

    def remove_current_active_key(self, key):
        self.current.discard(key)


keyboard_shortcut = KeyboardShortcut()


def on_shortcut_press(key):
    if key in keyboard_shortcut.combination:
        keyboard_shortcut.add_current_active_key(key)
        if all(k in keyboard_shortcut.current for k in keyboard_shortcut.combination):
            print("All modifiers active!")
            # provider.notify(EventCode.SHORTCUT, (x, y))


def on_shortcut_release(key):
    keyboard_shortcut.remove_current_active_key(key)


shortcut_listener = keyboard.Listener(
    on_press=on_shortcut_press, on_release=on_shortcut_release)
