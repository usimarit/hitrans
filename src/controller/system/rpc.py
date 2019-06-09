import zerorpc
import gevent, signal
from mouse import get_mouse_coordinates
from text_selection import get_selected_text

class HitransPythonApi():
    def getMousePosition(self):
        return get_mouse_coordinates()

    def getSelectedText(self):
        return get_selected_text()


port = 1234
addr = 'tcp://127.0.0.1:' + str(port)
s = zerorpc.Server(HitransPythonApi())
s.bind(addr)

print("Server running on port 1234")
gevent.signal(signal.SIGTERM, s.stop)
gevent.signal(signal.SIGINT, s.stop)  # ^C

s.run()
