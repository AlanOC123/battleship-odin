import onLaunchButtonClicked from "../btnClicks/onLaunchButtonClicked";

const onLaunchPageLoaded = () => {
    const btn = document.getElementById('launch-game');
    if (!btn) throw new Error("Invalid call of function");

    btn.onclick = onLaunchButtonClicked;
};

export default onLaunchPageLoaded;
