# pylint: disable=missing-docstring, wrong-import-order, invalid-name, no-self-use
import grpc
import protos.secondrpc_pb2 as secondrpc_pb2
import protos.secondrpc_pb2_grpc as secondrpc_pb2_grpc

from handler.event_provider import EventCode
from handler.text_selection import primary_selection


class Client:
    def __init__(self):
        channel = grpc.insecure_channel('localhost:1235')
        self.stub = secondrpc_pb2_grpc.SecondRpcStub(channel)

    def popUp(self, text, x, y):
        self.stub.PopUp.future(secondrpc_pb2.PopData(text=text, x=x, y=y))

    def process(self, event_code, context):
        if event_code == EventCode.DOUBLE_CLICK:
            text = primary_selection.get()
            if text == "":
                return
            x, y = context
            print("DOUBLE_CLICK at ({},{}) {}".format(x, y, text))
            self.popUp(text=text, x=x, y=y)

    def start(self):
        print("Client started listening port 1235")

    def stop(self):
        print("Client stopped")
