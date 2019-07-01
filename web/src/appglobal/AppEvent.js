const AppEvent = {}
let events = {}

AppEvent.showEvents = ()=>{
    console.log(events)
}
AppEvent.fireEvent = (event, param) => {
    if (
        events[event] &&
        events[event].length &&
        events[event].length > 0
    ) {
        setTimeout(() => {
            for (let key in events[event]) {
                events[event][key]["__listener"](param);
            }
        }, 10);
    }
}
AppEvent.on = (event, listener, name) => {
    if (!events[event]) {
        events[event] = [];
    }
    let listenerWrapper = undefined;
    let idx = undefined;
    if (name) {
        listenerWrapper = {
            __name: name,
            __listener: listener
        };
        for (let key in events[event]) {
            if (events[event][key]["__name"] === name) {
                idx = key;
                break;
            }
        }
    } else {
        listenerWrapper = {
            __listener: listener
        };
    }

    if (idx) {
        events[event][idx] = listenerWrapper;
    } else {
        events[event].push(listenerWrapper);
    }
}

AppEvent.off = (event, name) => {
    if (!events[event]) {
        return;
    }
    if (
        events[event] &&
        events[event].length &&
        events[event].length > 0
    ) {
        let idx = null;
        for (let key in events[event]) {
            if (events[event][key]["__name"] === name) {
                idx = key;
                break;
            }
        }
        events[event].splice(idx, 1);
    }
}


export default AppEvent