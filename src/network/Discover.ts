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
                if (this.listenPort <= 36010) {
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
                data.client.version,
                data.client.protocol_version
            )

            // notify clientManager accept new client
            NekoTogether.instance.communicationManager.accept(client)
        })

        server.on("listening", () => {
            console.log("Discover service launch successfully! (port:" + this.listenPort + ")")
        })
        server.bind(this.listenPort)

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

        setInterval(() => {
            const message = Buffer.from(JSON.stringify({
                port: NekoTogether.instance.communicationManager.SERVER_PORT,
                client: {
                    id: NekoTogether.instance.config.clientId,
                    version: NekoTogether.instance.config.CLIENT_VERSION,
                    protocol_version: NekoTogether.instance.config.PROTOCOL_VERSION
                }
            }))

            for (let network of availableNetwork) {
                let sub = ip.cidrSubnet(network.cidr)
                let first = ip.toLong(sub.firstAddress)
                let last = ip.toLong(sub.lastAddress)
                for (let i = first; i <= last; i++) {
                    for (let port = 36001; port <= 36010; port++) {
                        socket.send(message, 0, message.length, port, ip.fromLong(i), (error, bytes) => {
                        })
                    }
                }
            }
        }, 1000)


    }

}

