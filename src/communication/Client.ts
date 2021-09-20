import * as net from "net";
import MessageHandler from "./MessageHandler";
import Packet from "./packet/Packet";
import ClientInfo from "./ClientInfo";
import PacketClientALOHA from "./packet/PacketClientALOHA";
import * as events from "events";

export default class Client extends events.EventEmitter {

    private readonly messageHandler: MessageHandler
    private readonly packetHopeMap = {}
    private static readonly globalPacketListener = {}
    private info: ClientInfo

    public static fromSocket(socket: net.Socket) {
        return new Promise<Client>((resolve, reject) => {
            let client = new Client(socket)
            client.on("created", () => resolve(client))
        })
    }

    constructor(socket: net.Socket, info?: ClientInfo) {
        super()
        this.messageHandler = new MessageHandler(socket)
        if (info) this.info = info
        this.messageHandler.whenPacket((packet: Packet) => {
            if (packet instanceof PacketClientALOHA) {
                this.info = new ClientInfo(
                    packet.id,
                    socket.remoteAddress,
                    socket.remotePort.toString(),
                    packet.name,
                    packet.version,
                    packet.protocolVersion
                )
                console.log("发现新客户端上线:")
                this.info.printInfo()
                this.emit("created")
            } else {
                if (this.packetHopeMap[packet.typeName]) {
                    this.packetHopeMap[packet.typeName]();
                    this.packetHopeMap[packet.typeName] = null;
                }
                if (Client.globalPacketListener[packet.typeName]) {
                    for (let listener of Client.globalPacketListener[packet.typeName]) {
                        listener(this, packet)
                    }
                }
            }
        })
    }

    getInfo(): ClientInfo {
        return this.info
    }

    send(packet: Packet) {
        this.messageHandler.send(packet)
    }

    /**
     * Register a listener with a specific type of packet, the listener just will be called once
     */
    hopePacket(typeName: string, func: Function) {
        this.packetHopeMap[typeName] = func
    }

    /**
     * Register a listener with a specific type of packet, the listener will be called util it was removed
     */
    public static globalListenPacket(typeName: string, func: Function) {
        if (!Client.globalPacketListener[typeName]) Client.globalPacketListener[typeName] = []
        Client.globalPacketListener[typeName].push(func)
    }


}
