import os

def get_selected_text():
    return os.popen('xclip -o').read()
