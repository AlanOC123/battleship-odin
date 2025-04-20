import eventHub from "../../core/factories/eventHubFactory";

export default function attachLaunchBtnListener() {
    const btn = document.getElementById('launch-game');
    if (!btn) throw new Error("Launch button not found");

    btn.onclick = () => {
        eventHub.emit('Launch Button Clicked', {});
    };
};
