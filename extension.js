const St = imports.gi.St;
const Main = imports.ui.main;
const Mainloop = imports.mainloop;

const Horizontal = { left : 0, center : 1, right : 2 }
const Vertical = { top : 0, center : 1, bottom : 2 }

let clockLabel;
let refreshInterval = 10;
let offsetX = 0;
let offsetY = 0;
let alignH = Horizontal.left;
let alignV = Vertical.bottom;

function init() {
}

function enable() {
    if (!clockLabel) {
        clockLabel = new St.Label({ style_class: 'overlayClockLabel', text: "00:00" });
        Main.uiGroup.add_actor(clockLabel);
    }

    let monitor = Main.layoutManager.primaryMonitor;
    clockLabel.set_position(monitor.x + Math.floor((monitor.width - clockLabel.width) / 2 * alignH + offsetX),
                            monitor.y + Math.floor((monitor.height - clockLabel.height) / 2 * alignV + offsetY));

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
        setTimer();
    }
}

function setTimer() {
    Mainloop.timeout_add_seconds(refreshInterval, function(){
        updateClock();
    });
}
