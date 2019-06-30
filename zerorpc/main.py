import multiprocessing
from server import server
from client import client

if __name__ == '__main__':
    p1 = multiprocessing.Process(name="hitrans_backend_server", target=server)
    p2 = multiprocessing.Process(name='hitrans_backend_client', target=client)
    p1.start()
    p2.start()
