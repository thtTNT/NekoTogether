import Client from "../communication/Client";
import {app, BrowserWindow, ipcMain, webContents} from 'electron'
import CommunicationManager from "../communication/CommunicationManager";
import NekoTogether from "../NekoTogether";
import ClientInfo from "../communication/ClientInfo";

export default class UIManager {

    constructor() {
    }

    public selectClient(): Promise<Client> {
        return new Promise<Client>((resolve, reject) => {
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

            const newClientHandler = () => {
                window.webContents.send("clientList", NekoTogether.instance.communicationManager.getClients().map((client) => client.getInfo()))
            }

            window.loadFile(app.getAppPath() + "/assets/ui/SelectClient.html")
            ipcMain.once("resize", (event, data) => {
                window.setSize(data.width, data.height)
                window.show()
                window.center()
                window.webContents.openDevTools()

                // Register a event send clientList to window once it update

                window.webContents.send("clientList", NekoTogether.instance.communicationManager.getClients().map((client) => client.getInfo()))
                NekoTogether.instance.communicationManager.on("new_client", newClientHandler)
            })

            ipcMain.once("select_client", (event, data) => {
                let client = NekoTogether.instance.communicationManager.getClient(data.id)
                if (client) resolve(client)
                window.close()
            })

            window.on("close", () => {
                NekoTogether.instance.communicationManager.removeListener("new_client", newClientHandler)
                reject()
            })
        })
    }

}
