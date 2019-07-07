# pylint: disable=missing-docstring, wrong-import-order, invalid-name
from pynput import mouse
import grpc
from text_selection import get_selected_text

import secondrpc_pb2
import secondrpc_pb2_grpc

from datetime import datetime

_ONE_DAY_IN_SECONDS = 60 * 60 * 24

lasttime = datetime.now()


class Client:
    def __init__(self):
        channel = grpc.insecure_channel('localhost:1235')
        self.stub = secondrpc_pb2_grpc.SecondRpcStub(channel)

    def popUp(self, text, x, y):
        self.stub.PopUp(secondrpc_pb2.PopData(text=text, x=x, y=y))

    def on_click(self, x, y, button, pressed):
        global lasttime
        if not pressed and button == mouse.Button.left:
            now = datetime.now()
            deltatime = now - lasttime
            if deltatime.microseconds / 1000 >= 300:
                lasttime = now
                return
            lasttime = now
            text = get_selected_text()
            if text == '':
                return
            print(text)
            self.popUp(text=text, x=x, y=y)

    def start(self):
        print("Client started listening port 1235")
        self.listener = mouse.Listener(on_click=self.on_click)
        self.listener.start()

    def stop(self):
        self.listener.stop()
