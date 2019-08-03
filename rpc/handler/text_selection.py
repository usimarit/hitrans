# pylint: disable=missing-docstring, wrong-import-order
import os
import platform


class PrimarySelection:
    def __init__(self):
        self.plat = platform.system()

    def get(self):
        if self.plat == 'Linux':
            return self.get_on_linux()
        if self.plat == 'Darwin':  # MacOS
            return ""
        if self.plat == "Windows":
            return ""
        return ""

    def get_on_linux(self):
        return os.popen('xclip -o').read()


primary_selection = PrimarySelection()
