import * as net from "net";
import MessageHandler from "./MessageHandler";
import Packet from "./packet/Packet";
import ClientInfo from "./ClientInfo";
import PacketClientALOHA from "./packet/PacketClientALOHA";

export default class Client {

    private readonly messageHandler: MessageHandler
    private info: ClientInfo

    constructor(socket: net.Socket, info?: ClientInfo) {
        this.messageHandler = new MessageHandler(socket)
        if (info) this.info = info
        this.messageHandler.whenPacket((packet: Packet) => {
            if (packet instanceof PacketClientALOHA) {
                this.info = new ClientInfo(
                    packet.id,
                    socket.address(),
                    socket.remotePort,
                    packet.version,
                    packet.protocolVersion
                )
            }
        })
    }

    getInfo(): ClientInfo {
        return this.info
    }

    send(packet: Packet) {
        this.messageHandler.send(packet)
    }


}
