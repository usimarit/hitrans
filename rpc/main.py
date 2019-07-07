# pylint: disable=missing-docstring, wrong-import-order
import multiprocessing
from client import client
from server import serve

def main():
    serv = multiprocessing.Process("Hitrans Server Process", target=serve)
    clnt = multiprocessing.Process("Hitrans Client Process", target=client)
    serv.start()
    clnt.start()
