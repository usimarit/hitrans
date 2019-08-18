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
            return self.get_on_mac()
        if self.plat == "Windows":
            return self.get_on_windows()
        return ""

    def get_on_linux(self):
        return os.popen('xclip -o').read()

    def get_on_mac(self):
        return ""

    def get_on_windows(self):
        from win32gui import GetForegroundWindow, PyGetString
        from win32process import GetWindowThreadProcessId, AttachThreadInput
        from win32api import GetCurrentThreadId, GetFocus, SendMessage
        from win32con import WM_GETTEXT, WM_GETTEXTLENGTH
        from array import array

        def GetText(activeCtrlId):
            buffer_len = SendMessage(activeCtrlId, WM_GETTEXTLENGTH, 0, 0) + 1
            buffer = array('b', b'\x00\x00' * buffer_len)
            SendMessage(activeCtrlId, WM_GETTEXT, buffer_len, buffer)
            text = PyGetString(buffer.buffer_info()[0], buffer_len - 1)
            return text

        def get_text_from_focused_control():
            try:
                activeWinPtr = GetForegroundWindow()
                activeThreadId, _ = GetWindowThreadProcessId(activeWinPtr)
                currentThreadId = GetCurrentThreadId()
                if activeThreadId != currentThreadId:
                    AttachThreadInput(activeThreadId, currentThreadId, True)
                activeCtrlId = GetFocus()
                return GetText(activeCtrlId)
            except Exception:
                print("HUHU")
                return ""
        
        return get_text_from_focused_control()


primary_selection = PrimarySelection()
