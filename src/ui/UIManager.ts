import Client from "../communication/Client";
import {app, BrowserWindow, ipcMain} from 'electron'
import CommunicationManager from "../communication/CommunicationManager";
import NekoTogether from "../NekoTogether";

export default class UIManager {

    constructor() {
        ipcMain.on("getClientList", (event) => {
            event.sender.send(JSON.stringify(NekoTogether.instance.communicationManager.getClients()))
        })
    }

    public selectClient(): Client {
        let window = new BrowserWindow({
            width: 800,
            height: 600,
            frame: false,
            show: false,
            center: true,
            hasShadow: true,
            webPreferences: {
                nativeWindowOpen: false,
                nodeIntegration: true,
                contextIsolation: false
            },
        })

        window.loadFile(app.getAppPath() + "/assets/ui/SelectClient.html")
        ipcMain.on("resize", (event, data) => {
            window.setSize(data.width, data.height)
            window.show()
            window.center()
            window.webContents.openDevTools()
        })

        return null
    }
}
