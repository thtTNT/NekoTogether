import {createSocket} from 'dgram'
import NekoTogether from "../nekoTogether";
import Client from "../client/client";

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
            let client = new Client(
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

        let socket = createSocket("udp4")
        socket.bind(() => {
            socket.setBroadcast(true)
        })
        let message = Buffer.from(JSON.stringify({
            port: "unknown",
            client: {
                id: NekoTogether.instance.config.clientId,
                version: NekoTogether.instance.config.CLIENT_VERSION,
                protocol_version: NekoTogether.instance.config.PROTOCOL_VERSION
            }
        }))
        setInterval(() => {
            socket.send(message, 0, message.length, 36001, '255.255.255.255', (error, bytes) => {
            })
        }, 1000)

        server.bind(36001)
    }

}

