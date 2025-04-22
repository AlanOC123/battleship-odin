import eventHub from "../../../../eventHub";
import launchPageHTML from '../../../pages/launchPage/launchPageString';

const onCancelButtonClicked = () => eventHub.emit({ name: 'Page Changed', type: 'ui', src: 'CancelBtn' }, { page: launchPageHTML, loaded: 'Launch Page Loaded' });

export default onCancelButtonClicked;
