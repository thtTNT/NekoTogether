import Discover from './network/Discover'
import CommunicationManager from "./communication/CommunicationManager";
import FileHelperManager from "./filehelper/FileHelperManager";
import {App} from 'electron';
import TransferManager from "./transfer/TransferManager";
import UIManager from "./ui/UIManager";
import Config from "./config/Config";

export default class NekoTogether {

    public static instance: NekoTogether
    public readonly app: App
    public readonly config: Config
    public readonly discover: Discover
    public readonly communicationManager: CommunicationManager
    public readonly fileHelperManager: FileHelperManager
    public readonly transferManager: TransferManager
    public readonly uiManager: UIManager

    constructor(app) {
        NekoTogether.instance = this;
        this.app = app
        this.config = new Config();
        this.communicationManager = new CommunicationManager()
        this.discover = new Discover()
        this.fileHelperManager = new FileHelperManager()
        this.transferManager = new TransferManager()
        this.uiManager = new UIManager()
        this.init()
    }

    public init() {
        this.communicationManager.init().then(
            () => this.discover.broadcast())

    }


}

export function run(app: App) {
    new NekoTogether(app)
}


