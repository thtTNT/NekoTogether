import * as net from "net";
import ClientInfo from "./ClientInfo";
import Client from "./Client";
import NekoTogether from "../NekoTogether";
import PacketClientALOHA from "./packet/PacketClientALOHA";

export default class CommunicationManager {

    public SERVER_PORT = 36002
    private server: net.Server
    private clients: Client[] = []

    constructor() {
        this.server = net.createServer(() => {

        })
        this.server.listen(this.SERVER_PORT)
        this.server.on("error", (error) => {
            // @ts-ignore
            if (error.code === "EADDRINUSE") {
                console.log("Server launch error. (Port in use)")
                this.SERVER_PORT = Math.ceil(Math.random() * 40000 + 10000)
                this.server.listen(this.SERVER_PORT)
            }
        })

        this.server.on("listening", () => {
            console.log("Server launch successfully! (port:" + this.SERVER_PORT + ")")
        })


    }

    accept(newClient: ClientInfo): void {
        //Check client if is self
        if (newClient.id === NekoTogether.instance.config.clientId) return;

        // The client which its id is smaller, it should connect bigger one
        if (newClient.id > NekoTogether.instance.config.clientId) {
            for (let client of this.clients) {
                if (newClient.id === client.getInfo().id) return
            }
            console.log("发现客户端上线：")
            console.log("客户端ID: " + newClient.id)
            console.log("ip地址: " + newClient.ip)
            console.log("通讯端口: " + newClient.port)
            console.log("客户端版本: " + newClient.version)
            console.log("客户端通讯协议: " + newClient.protocolVersion)
            let socket = new net.Socket()
            let client = new Client(socket, newClient)
            this.clients.push(client)
            socket.connect(Number(newClient.port), newClient.ip.toString(), null)
            client.send(
                new PacketClientALOHA(
                    NekoTogether.instance.config.clientId,
                    NekoTogether.instance.config.CLIENT_VERSION,
                    NekoTogether.instance.config.PROTOCOL_VERSION
                )
            )
        }
    }

}
