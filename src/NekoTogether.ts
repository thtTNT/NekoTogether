import Discover from './network/Discover'
import Config from './config'
import CommunicationManager from "./communication/CommunicationManager";
import FileHelperManager from "./filehelper/FileHelperManager";
import { App } from 'electron';

export default class NekoTogether {

    public static instance: NekoTogether
    public readonly app : App
    public readonly config: Config
    public readonly discover: Discover
    public readonly communicationManager: CommunicationManager
    public readonly fileHelperManager: FileHelperManager

    constructor(app) {
        NekoTogether.instance = this;
        this.app = app
        this.config = new Config();
        this.communicationManager = new CommunicationManager()
        this.discover = new Discover()
        this.fileHelperManager = new FileHelperManager()
    }


}

export function run(app : App) {
    new NekoTogether(app)
}


