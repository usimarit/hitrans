# pylint: disable=missing-docstring, wrong-import-order
from client import Client
from server import Server
import time

_ONE_DAY_IN_SECONDS = 60 * 60 * 24


def main():
    c = Client()
    c.start()
    s = Server()
    s.start()
    try:
        while True:
            time.sleep(_ONE_DAY_IN_SECONDS)
    except KeyboardInterrupt:
        s.stop()
        c.stop()


if __name__ == "__main__":
    main()
