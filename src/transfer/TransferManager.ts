import NekoTogether from "../NekoTogether";
import PacketTransmissionRequest from "../communication/packet/PacketTransmissionRequest";
import * as fs from "fs";
import * as path from "path";
import Client from "../communication/Client";
import * as console from "console";
import {Notification} from 'electron'

export default class TransferManager {

    constructor() {
        Client.globalListenPacket(PacketTransmissionRequest.NAME, (client, packet) => {
            let packetTransmissionRequest = packet as PacketTransmissionRequest
            let notification = new Notification({
                title: "喵唧快传-接收文件",
                silent: false,
                body: "\"" + client.getInfo().name + "\"正在向您发送文件\"" + packetTransmissionRequest.fileName + "\""
            })
            notification.show()
        })
    }

    public send(filePath: string) {
        // check if file exists
        if (!fs.existsSync(filePath)) return;

        console.log("prepare send file: " + filePath)
        NekoTogether.instance.uiManager.selectClient()
            .then(client => {

                if (!fs.existsSync(filePath)) return;

                console.log("selected client: " + client.getInfo().name);
                client.send(new PacketTransmissionRequest(
                    path.basename(filePath),
                    fs.statSync(filePath).size
                ))
            })
    }


}
