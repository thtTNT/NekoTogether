import Discover from './network/discover'
import Config from './config'
import ClientManager from "./client/ClientManager";

export default class NekoTogether {

    public static instance: NekoTogether;
    public config: Config
    public discover: Discover
    public clientManager: ClientManager

    constructor() {
        NekoTogether.instance = this;
        this.config = new Config();
        this.discover = new Discover()
        this.clientManager = new ClientManager()
    }

}

export function run() {
    new NekoTogether()
}


