# pylint: disable=missing-docstring, wrong-import-order, invalid-name
import grpc
import secondrpc_pb2
import secondrpc_pb2_grpc

from event_provider import EventCode
from text_selection import get_selected_text

_ONE_DAY_IN_SECONDS = 60 * 60 * 24


class Client:
    def __init__(self):
        channel = grpc.insecure_channel('localhost:1235')
        self.stub = secondrpc_pb2_grpc.SecondRpcStub(channel)

    def popUp(self, text, x, y):
        self.stub.PopUp(secondrpc_pb2.PopData(text=text, x=x, y=y))

    def process(self, event_code, context):
        if event_code == EventCode.DOUBLE_CLICK:
            text = get_selected_text()
            x, y = context
            print("DOUBLE_CLICK at ({},{}) {}".format(x, y, text))
            self.popUp(text=text, x=x, y=y)

    def start(self):
        print("Client started listening port 1235")

    def stop(self):
        print("Client stopped")
