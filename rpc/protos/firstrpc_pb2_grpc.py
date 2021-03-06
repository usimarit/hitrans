# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
import grpc

from protos import firstrpc_pb2 as protos_dot_firstrpc__pb2


class FirstRpcStub(object):
  # missing associated documentation comment in .proto file
  pass

  def __init__(self, channel):
    """Constructor.

    Args:
      channel: A grpc.Channel.
    """
    self.CreateConfigFile = channel.unary_unary(
        '/firstrpc.FirstRpc/CreateConfigFile',
        request_serializer=protos_dot_firstrpc__pb2.Empty.SerializeToString,
        response_deserializer=protos_dot_firstrpc__pb2.Empty.FromString,
        )
    self.GetConfigFile = channel.unary_unary(
        '/firstrpc.FirstRpc/GetConfigFile',
        request_serializer=protos_dot_firstrpc__pb2.Empty.SerializeToString,
        response_deserializer=protos_dot_firstrpc__pb2.ConfigData.FromString,
        )
    self.WriteConfigFile = channel.unary_unary(
        '/firstrpc.FirstRpc/WriteConfigFile',
        request_serializer=protos_dot_firstrpc__pb2.ConfigData.SerializeToString,
        response_deserializer=protos_dot_firstrpc__pb2.Empty.FromString,
        )


class FirstRpcServicer(object):
  # missing associated documentation comment in .proto file
  pass

  def CreateConfigFile(self, request, context):
    # missing associated documentation comment in .proto file
    pass
    context.set_code(grpc.StatusCode.UNIMPLEMENTED)
    context.set_details('Method not implemented!')
    raise NotImplementedError('Method not implemented!')

  def GetConfigFile(self, request, context):
    # missing associated documentation comment in .proto file
    pass
    context.set_code(grpc.StatusCode.UNIMPLEMENTED)
    context.set_details('Method not implemented!')
    raise NotImplementedError('Method not implemented!')

  def WriteConfigFile(self, request, context):
    # missing associated documentation comment in .proto file
    pass
    context.set_code(grpc.StatusCode.UNIMPLEMENTED)
    context.set_details('Method not implemented!')
    raise NotImplementedError('Method not implemented!')


def add_FirstRpcServicer_to_server(servicer, server):
  rpc_method_handlers = {
      'CreateConfigFile': grpc.unary_unary_rpc_method_handler(
          servicer.CreateConfigFile,
          request_deserializer=protos_dot_firstrpc__pb2.Empty.FromString,
          response_serializer=protos_dot_firstrpc__pb2.Empty.SerializeToString,
      ),
      'GetConfigFile': grpc.unary_unary_rpc_method_handler(
          servicer.GetConfigFile,
          request_deserializer=protos_dot_firstrpc__pb2.Empty.FromString,
          response_serializer=protos_dot_firstrpc__pb2.ConfigData.SerializeToString,
      ),
      'WriteConfigFile': grpc.unary_unary_rpc_method_handler(
          servicer.WriteConfigFile,
          request_deserializer=protos_dot_firstrpc__pb2.ConfigData.FromString,
          response_serializer=protos_dot_firstrpc__pb2.Empty.SerializeToString,
      ),
  }
  generic_handler = grpc.method_handlers_generic_handler(
      'firstrpc.FirstRpc', rpc_method_handlers)
  server.add_generic_rpc_handlers((generic_handler,))
