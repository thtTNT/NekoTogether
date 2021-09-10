import {createSocket} from 'dgram'
import NekoTogether from "../nekoTogether";
import ClientInfo from "../client/clientInfo";
import * as ip from "ip";
import * as os from "os";
import * as net from "net";
import * as process from "process";

export default class Discover {

    constructor() {
        let server = createSocket("udp4")
        server.on("error", (err) => {
            console.log("发现服务启动失败")
            server.close()
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
            NekoTogether.instance.clientManager.accept(client)
        })

        server.on("listening", () => {
            console.log("发现服务启动完成")
        })
        server.bind(36001)

        // Send Part
        let socket = createSocket("udp4")
        let message = Buffer.from(JSON.stringify({
            port: NekoTogether.instance.communicationManager.SERVER_PORT,
            client: {
                id: NekoTogether.instance.config.clientId,
                version: NekoTogether.instance.config.CLIENT_VERSION,
                protocol_version: NekoTogether.instance.config.PROTOCOL_VERSION
            }
        }))

        let availableNetwork = []
        for (let inter of Object.values(os.networkInterfaces())) {
            for (let network of Object.values(inter)) {
                if (network["internal"]) continue;
                if (network["family"] !== 'IPv4') continue;
                availableNetwork.push(network)
            }
        }

        setInterval(() => {
            for (let network of availableNetwork) {
                let sub = ip.cidrSubnet(network.cidr)
                let first = ip.toLong(sub.firstAddress)
                let last = ip.toLong(sub.lastAddress)
                for (let i = first; i <= last; i++) {
                    socket.send(message, 0, message.length, 36001, ip.fromLong(i), (error, bytes) => {
                    })
                }
            }
        }, 1000)


    }

}

