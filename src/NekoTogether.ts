import Discover from './network/Discover'
import Config from './config'
import CommunicationManager from "./communication/CommunicationManager";

export default class NekoTogether {

    public static instance: NekoTogether
    public readonly config: Config
    public readonly discover: Discover
    public readonly communicationManager: CommunicationManager

    constructor() {
        NekoTogether.instance = this;
        this.config = new Config();
        this.communicationManager = new CommunicationManager()
        this.discover = new Discover()
    }

}

export function run() {
    new NekoTogether()
}


