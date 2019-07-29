# pylint: disable=missing-docstring, wrong-import-order

import grpc
import firstrpc_pb2
import firstrpc_pb2_grpc

from concurrent import futures
from file import (
    create_config_file,
    get_config,
    write_config
)


class HitransServicer(firstrpc_pb2_grpc.FirstRpcServicer):
    def CreateConfigFile(self, request, context):
        create_config_file()
        return firstrpc_pb2.Empty()

    def GetConfigFile(self, request, context):
        data = get_config()
        conf = firstrpc_pb2.Configurations(
            **data['configurations']
        )
        text_sel = firstrpc_pb2.TextSelection(
            **data['settings']['text_selection']
        )
        shortcut = firstrpc_pb2.Shortcut(
            **data['settings']['shortcut']
        )
        sets = firstrpc_pb2.Settings(
            text_selection=text_sel,
            shortcut=shortcut
        )
        return firstrpc_pb2.ConfigData(
            configurations=conf,
            settings=sets
        )

    def WriteConfigFile(self, request, context):
        data = dict({
            'configurations': {
                'trans_url': request.configurations.trans_url,
                'target_lang': request.configurations.target_lang,
                'source_lang': request.configurations.source_lang,
                'api_key': request.configurations.api_key,
                'model': request.configurations.model,
                'version': request.configurations.version
            },
            'settings': {
                'text_selection': {
                    'double_click': request.settings.text_selection.double_click,
                    'finished_selection': request.settings.text_selection.finished_selection
                },
                'shortcut': {
                    'alt': request.settings.shortcut.alt,
                    'shift': request.settings.shortcut.shift,
                    'ctrl': request.settings.shortcut.ctrl
                }
            }})
        write_config(data)
        return firstrpc_pb2.Empty()


class Server:
    def __init__(self):
        self.server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
        firstrpc_pb2_grpc.add_FirstRpcServicer_to_server(
            HitransServicer(), self.server
        )
        self.server.add_insecure_port('[::]:1234')

    def start(self):
        print("Server started at port 1234")
        self.server.start()

    def stop(self):
        print("Server stopped at port 1234")
        self.server.stop(0)
