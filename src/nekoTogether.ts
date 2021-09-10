import Discover from './network/discover'
import Config from './config'
import ClientManager from "./client/clientManager"
import CommunicationManager from "./communication/CommunicationManager";

export default class NekoTogether {

    public static instance: NekoTogether
    public readonly config: Config
    public readonly discover: Discover
    public readonly clientManager: ClientManager
    public readonly communicationManager: CommunicationManager

    constructor() {
        NekoTogether.instance = this;
        this.config = new Config();
        this.communicationManager = new CommunicationManager()
        this.discover = new Discover()
        this.clientManager = new ClientManager()
    }

}

export function run() {
    new NekoTogether()
}


