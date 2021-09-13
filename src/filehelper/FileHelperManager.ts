import {createSocket} from "dgram";
import * as net from "net";
import * as os from "os";
import NekoTogether from "../NekoTogether";
import * as fs from "fs";
import Tools from "../common/Tools";

export default class FileHelperManager {

    private port = 37000

    constructor() {
        FileHelperManager.init()

        let server = net.createServer()
        server.on("error", (err) => {
            // @ts-ignore
            if (err.code === "EADDRINUSE") {
                this.port++
                server.listen(this.port)
            }

        })

        server.on("connection", (socket) => {
            socket.on('data', (data) => {
                NekoTogether.instance.transferManager.send(data.toString())
            })
        })

        server.on("listening", () => {
            console.log("FileHelper launch successfully! (port:" + this.port + ")")
            this.savePort()
        })
        server.listen(this.port)
    }

    private static init() {
        switch (process.platform){
            case "darwin":
                let path = NekoTogether.instance.config.dataPath + "/FileHelper"
                if (!fs.existsSync(path)) {
                    fs.mkdirSync(path)
                }

                let fhAppPath = NekoTogether.instance.app.getAppPath() + "/assets/FileHelper/FileHelper-Mac"
                fs.copyFileSync(fhAppPath, path + "/FileHelper")

                let servicePath = os.homedir() + "/Library/Services"
                Tools.copy(NekoTogether.instance.app.getAppPath() + "/assets/FileHelper/share.workflow", servicePath + "/通过喵唧快传分享.workflow")
                break;
        }
    }

    private savePort() {
        switch (process.platform) {
            case "darwin":
                let path = NekoTogether.instance.config.dataPath + "/FileHelper/helper.port"
                if (fs.existsSync(path)) {
                    fs.rmSync(path)
                }
                fs.writeFileSync(path, this.port.toString())
                break;
        }
    }

}
