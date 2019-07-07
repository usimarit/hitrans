# pylint: disable=missing-docstring, wrong-import-order

import grpc
from file import create_file, get_config, write_config
import time

from concurrent import futures
import firstrpc_pb2_grpc
import firstrpc_pb2

_ONE_DAY_IN_SECONDS = 60 * 60 * 24


class HitransServicer(firstrpc_pb2_grpc.FirstRpcServicer):
    def CreateConfigFile(self, request, context):
        create_file()
        return firstrpc_pb2.Empty()

    def GetConfigFile(self, request, context):
        data = get_config()
        conf = firstrpc_pb2.Configurations(
            trans_url=data['configurations']['trans_url'],
            source_lang=data['configurations']['source_lang'],
            target_lang=data['configurations']['target_lang'],
            api_key=data['configurations']['api_key'],
            model=data['configurations']['model'],
            version=data['configurations']['version']
        )
        text_sel = firstrpc_pb2.TextSelection(
            double_click=data['settings']['text_selection']['double_click'],
            finished_selection=data['settings']['text_selection']['finished_selection']
        )
        sets = firstrpc_pb2.Settings(
            text_selection=text_sel,
            shortcut=data['settings']['shortcuts']
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
                'shortcuts': request.settings.shortcut
            }
        })
        write_config(data)
        return firstrpc_pb2.Empty()


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    firstrpc_pb2_grpc.add_FirstRpcServicer_to_server(
        HitransServicer(), server
    )
    server.add_insecure_port('[::]:1234')
    print("Server started at port 1234")
    server.start()
    try:
        while True:
            time.sleep(_ONE_DAY_IN_SECONDS)
    except KeyboardInterrupt:
        server.stop(0)


if __name__ == "__main__":
    serve()
