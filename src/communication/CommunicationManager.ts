import * as net from "net";
import ClientInfo from "./ClientInfo";
import Client from "./Client";
import NekoTogether from "../NekoTogether";
import PacketClientALOHA from "./packet/PacketClientALOHA";
import * as events from "events";

export default class CommunicationManager extends events.EventEmitter {

    public SERVER_PORT = 36002
    private server: net.Server
    private clients: Client[] = []

    constructor() {
        super()
        this.server = net.createServer(() => {

        })
    }

    public init(): Promise<any> {
        return new Promise((resolve, reject) => {
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
                resolve(null)
                console.log("Server launch successfully! (port:" + this.SERVER_PORT + ")")
            })

            this.server.on('connection', socket => {
                Client.fromSocket(socket).then(client => {
                    this.clients.push(client)
                    this.emit("new_client", client)
                })
            })
        })
    }

    connect(newClient: ClientInfo): void {
        //Check client if is self
        if (newClient.id === NekoTogether.instance.config.clientId) return;

        // The client which its id is smaller, it should connect bigger one
        if (newClient.id > NekoTogether.instance.config.clientId) {
            for (let client of this.clients) {
                if (newClient.id === client.getInfo().id) return
            }
            let socket = new net.Socket()
            let client = new Client(socket, newClient)
            this.clients.push(client)
            socket.connect(Number(newClient.port), newClient.ip.toString(), null)
            client.send(
                new PacketClientALOHA(
                    NekoTogether.instance.config.clientId,
                    NekoTogether.instance.config.CLIENT_VERSION,
                    NekoTogether.instance.config.clientName,
                    NekoTogether.instance.config.PROTOCOL_VERSION
                )
            )
            this.emit("new_client", client)
            console.log("发现客户端上线：")

            // send debug info to console
            client.getInfo().printInfo()
        }
    }

    public getClients(): Client[] {
        return this.clients
    }

    public getClient(id: string): Client {
        return this.clients.filter((client) => client.getInfo().id === id).pop()
    }

}
