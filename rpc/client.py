# pylint: disable=missing-docstring, wrong-import-order, invalid-name
from pynput import mouse
import grpc
from text_selection import get_selected_text

import secondrpc_pb2
import secondrpc_pb2_grpc


def client():
    def on_click(x, y, button, pressed):
        channel = grpc.insecure_channel('localhost:1235')
        stub = secondrpc_pb2_grpc.SecondRpcStub(channel)
        if not pressed:
            text = get_selected_text()
            if text == '':
                return
            print(text)
            stub.PopUp(secondrpc_pb2.PopData(text=text, x=x, y=y))
    print("Client started to listen port 1235")
    with mouse.Listener(on_click=on_click) as listener:
        listener.join()


if __name__ == '__main__':
    client()
