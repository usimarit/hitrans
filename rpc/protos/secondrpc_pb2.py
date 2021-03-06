# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: protos/secondrpc.proto

import sys
_b=sys.version_info[0]<3 and (lambda x:x) or (lambda x:x.encode('latin1'))
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor.FileDescriptor(
  name='protos/secondrpc.proto',
  package='secondrpc',
  syntax='proto3',
  serialized_options=None,
  serialized_pb=_b('\n\x16protos/secondrpc.proto\x12\tsecondrpc\"\x07\n\x05\x45mpty\"-\n\x07PopData\x12\x0c\n\x04text\x18\x01 \x01(\t\x12\t\n\x01x\x18\x02 \x01(\x05\x12\t\n\x01y\x18\x03 \x01(\x05\x32<\n\tSecondRpc\x12/\n\x05PopUp\x12\x12.secondrpc.PopData\x1a\x10.secondrpc.Empty\"\x00\x62\x06proto3')
)




_EMPTY = _descriptor.Descriptor(
  name='Empty',
  full_name='secondrpc.Empty',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=37,
  serialized_end=44,
)


_POPDATA = _descriptor.Descriptor(
  name='PopData',
  full_name='secondrpc.PopData',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='text', full_name='secondrpc.PopData.text', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='x', full_name='secondrpc.PopData.x', index=1,
      number=2, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='y', full_name='secondrpc.PopData.y', index=2,
      number=3, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=46,
  serialized_end=91,
)

DESCRIPTOR.message_types_by_name['Empty'] = _EMPTY
DESCRIPTOR.message_types_by_name['PopData'] = _POPDATA
_sym_db.RegisterFileDescriptor(DESCRIPTOR)

Empty = _reflection.GeneratedProtocolMessageType('Empty', (_message.Message,), {
  'DESCRIPTOR' : _EMPTY,
  '__module__' : 'protos.secondrpc_pb2'
  # @@protoc_insertion_point(class_scope:secondrpc.Empty)
  })
_sym_db.RegisterMessage(Empty)

PopData = _reflection.GeneratedProtocolMessageType('PopData', (_message.Message,), {
  'DESCRIPTOR' : _POPDATA,
  '__module__' : 'protos.secondrpc_pb2'
  # @@protoc_insertion_point(class_scope:secondrpc.PopData)
  })
_sym_db.RegisterMessage(PopData)



_SECONDRPC = _descriptor.ServiceDescriptor(
  name='SecondRpc',
  full_name='secondrpc.SecondRpc',
  file=DESCRIPTOR,
  index=0,
  serialized_options=None,
  serialized_start=93,
  serialized_end=153,
  methods=[
  _descriptor.MethodDescriptor(
    name='PopUp',
    full_name='secondrpc.SecondRpc.PopUp',
    index=0,
    containing_service=None,
    input_type=_POPDATA,
    output_type=_EMPTY,
    serialized_options=None,
  ),
])
_sym_db.RegisterServiceDescriptor(_SECONDRPC)

DESCRIPTOR.services_by_name['SecondRpc'] = _SECONDRPC

# @@protoc_insertion_point(module_scope)
