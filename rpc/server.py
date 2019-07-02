# pylint: disable=missing-docstring, wrong-import-order

import grpc
from file import create_file, get_config, write_config

from concurrent import futures
import hitrans_pb2_grpc
import hitrans_pb2


class HitransServicer(hitrans_pb2_grpc.HitransServicer):
    def CreateConfigFile(self, request, context):
        create_file()
        return hitrans_pb2.Empty()

    def GetConfigFile(self, request, context):
        data = get_config()
        conf = hitrans_pb2.Configurations(
            trans_url=data.configurations.trans_url,
            source_lang=data.configurations.source_lang,
            target_lang=data.configurations.target_lang,
            api_key=data.configurations.api_key,
            model=data.configurations.model,
            version=data.configurations.version
        )
        text_sel = hitrans_pb2.TextSelection(
            double_click=data.settings.text_selection.double_click,
            finished_selection=data.settings.text_selection.finished_selection
        )
        sets = hitrans_pb2.Settings(
            text_selection=text_sel,
            shortcut=data.settings.shortcuts
        )
        return hitrans_pb2.ConfigData(
            conf=conf,
            set=sets
        )

    def WriteConfigFile(self, request, context):
        data = dict({
            'configurations': {
                'trans_url': request.conf.trans_url,
                'source_lang': request.conf.source_lang,
                'target_lang': request.conf.target_lang,
                'api_key': request.conf.api_key,
                'model': request.conf.model,
                'version': request.conf.version
            },
            'settings': {
                'text_selection': {
                    'double_click': request.set.text_selection.double_click,
                    'finished_selection': request.set.text_selection.finished_selection
                },
                'shortcuts': request.set.shortcut
            }
        })
        write_config(data)
        return hitrans_pb2.Empty()


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    hitrans_pb2_grpc.add_HitransServicer_to_server(
        HitransServicer(), server
    )
    server.add_insecure_port('[::]:1234')
    server.start()
