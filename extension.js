const St = imports.gi.St;
const Main = imports.ui.main;
const Mainloop = imports.mainloop;

const REFRESH_INTERVAL = 10;
let text;

function _showClock() {
    let clockDate = new Date();
    let dateFormat = _("%H:%M");
    if (!text) {
        text = new St.Label({ style_class: 'overlayclock-label', text: "" });
        Main.uiGroup.add_actor(text);
    }
    text.text = clockDate.toLocaleFormat(dateFormat);

    let monitor = Main.layoutManager.primaryMonitor;

    text.set_position(monitor.x + Math.floor(5),
                      monitor.y + Math.floor(monitor.height - text.height));

    set_timer();
}

function init() {
    _showClock();
}

function enable() {
    _showClock();
}

function disable() {
    Main.uiGroup.remove_actor(text);
    text = null;
}

function set_timer() {
    Mainloop.timeout_add_seconds(REFRESH_INTERVAL, function(){
      _showClock();
    });
}
