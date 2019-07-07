# pylint: disable=missing-docstring, wrong-import-order
import pymouse

def get_mouse_coordinates_xorg():
    return pymouse.PyMouse().position()
