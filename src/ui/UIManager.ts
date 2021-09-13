import Client from "../communication/Client";
import {app, BrowserWindow, ipcMain, webContents} from 'electron'
import CommunicationManager from "../communication/CommunicationManager";
import NekoTogether from "../NekoTogether";
import ClientInfo from "../communication/ClientInfo";

export default class UIManager {

    constructor() {
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

            // Register a event send clientList to window once it update

            window.webContents.send("clientList", NekoTogether.instance.communicationManager.getClients().map((client) => client.getInfo()))
            NekoTogether.instance.communicationManager.on("new_client", () => {
                window.webContents.send("clientList", NekoTogether.instance.communicationManager.getClients().map((client) => client.getInfo()))
            })
        })

        return null
    }

}
