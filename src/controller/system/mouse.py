from Xlib import display

def get_mouse_coordinates():
    data = display.Display().screen().root.query_pointer()._data
    return data['root_x'], data['root_y']
