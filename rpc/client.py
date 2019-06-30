from pynput import mouse
import grpc
from text_selection import get_selected_text
from config import CLT_ADDR
import time

import hitrans_client_pb2
import hitrans_client_pb2_grpc


def client():
    with grpc.insecure_channel('localhost:1235') as channel:
        stub = hitrans_client_pb2_grpc.Hitrans_ClientStub(channel)

        def on_click(x, y, button, pressed):
            if not pressed:
                text = get_selected_text()
                if (text == ''):
                    return
                print(text)
                stub.PopUp(hitrans_client_pb2.PopData(
                    text=text,
                    x=x,
                    y=y
                ))

        print("client starting at port 1235")
        with mouse.Listener(on_click=on_click) as listener:
            listener.join()


if __name__ == '__main__':
    client()
