import * as net from "net";
import MessageHandler from "./MessageHandler";
import Packet from "./packet/Packet";

export default class Client {

    private readonly messageHandler: MessageHandler

    constructor(socket: net.Socket) {
        this.messageHandler = new MessageHandler(socket)
        this.messageHandler.whenPacket((packet: Packet) => {
            console.log("接收到数据包: " + packet.typeName)
        })
    }

}
