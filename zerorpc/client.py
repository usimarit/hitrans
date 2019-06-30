from pynput import mouse
import zerorpc
from text_selection import get_selected_text
from config import CLT_ADDR
import time


def client():
    clt = zerorpc.Client(CLT_ADDR)

    def on_click(x, y, button, pressed):
        if not pressed:
            text = get_selected_text()
            if (text == ''):
                return
            print(text)
            clt.popUp(text, x, y)

    print("client starting at port 1235")
    with mouse.Listener(on_click=on_click) as listener:
        listener.join()
