const St = imports.gi.St;
const Main = imports.ui.main;
const Mainloop = imports.mainloop;

const REFRESH_INTERVAL = 10;
let clockLabel;

function init() {
}

function enable() {
    if (!clockLabel) {
        clockLabel = new St.Label({ style_class: 'overlayClockLabel', text: "00:00" });
        Main.uiGroup.add_actor(clockLabel);
    }

    let monitor = Main.layoutManager.primaryMonitor;
    clockLabel.set_position(monitor.x + Math.floor(11),
                            monitor.y + Math.floor(monitor.height - clockLabel.height));

    updateClock();
}

function disable() {
    Main.uiGroup.remove_actor(clockLabel);
    clockLabel = null;
}

function updateClock() {
    if (clockLabel) {
        let clockDate = new Date();
        let dateFormat = _("%H:%M");
        clockLabel.text = clockDate.toLocaleFormat(dateFormat);
        set_timer();
    }
}

function set_timer() {
    Mainloop.timeout_add_seconds(REFRESH_INTERVAL, function(){
        updateClock();
    });
}
