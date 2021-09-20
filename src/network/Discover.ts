import {createSocket} from 'dgram'
import NekoTogether from "../NekoTogether";
import ClientInfo from "../communication/ClientInfo";
import * as ip from "ip";
import * as os from "os";

export default class Discover {

    private listenPort: number = 36001

    constructor() {
        let server = createSocket("udp4")
        server.on("error", (err) => {
            // @ts-ignore
            if (err.code === "EADDRINUSE") {
                console.log("Discover Service launch error. (Port in use)")
                if (this.listenPort <= 36003) {
                    server.bind(++this.listenPort)
                }
            }

        })

        server.on("message", (msg, remoteInfo) => {
            let data = JSON.parse(msg.toString())
            if (!data) return;
            let client = new ClientInfo(
                data.client.id,
                remoteInfo.address,
                data.port,
                data.client.name,
                data.client.version,
                data.client.protocol_version
            )

            // notify clientManager accept new client
            NekoTogether.instance.communicationManager.connect(client)
        })

        server.on("listening", () => {
            console.log("Discover service launch successfully! (port:" + this.listenPort + ")")
        })
        server.bind(this.listenPort)

    }

    public broadcast() {
        // Send Part
        let socket = createSocket("udp4")

        let availableNetwork = []
        for (let inter of Object.values(os.networkInterfaces())) {
            for (let network of Object.values(inter)) {
                if (network["internal"]) continue;
                if (network["family"] !== 'IPv4') continue;
                availableNetwork.push(network)
            }
        }

        this.sendPacket(socket, availableNetwork).then(r => () => {
        })
    }

    private async sendPacket(socket, availableNetwork) {
        while (true) {
            const message = Buffer.from(JSON.stringify({
                port: NekoTogether.instance.communicationManager.SERVER_PORT,
                client: {
                    id: NekoTogether.instance.config.clientId,
                    name: NekoTogether.instance.config.clientName,
                    version: NekoTogether.instance.config.CLIENT_VERSION,
                    protocol_version: NekoTogether.instance.config.PROTOCOL_VERSION
                }
            }))

            for (let network of availableNetwork) {
                let sub = ip.cidrSubnet(network.cidr)
                let first = ip.toLong(sub.firstAddress)
                let last = ip.toLong(sub.lastAddress)
                for (let i = first; i <= last; i++) {
                    for (let port = 36001; port <= 36003; port++) {
                        socket.send(message, 0, message.length, port, ip.fromLong(i), (error, bytes) => {
                        })
                        await new Promise((resolve, reject) => {
                            setTimeout(() => resolve(null), 20)
                        })
                    }
                }
            }
        }
    }
}

