import {createSocket} from 'dgram'
import NekoTogether from "../nekoTogether";

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
            console.log(data)
            console.log("发现客户端上线：")
            console.log("ip地址: " + remoteInfo.address)
            console.log("通讯端口: " + data.port)
            console.log("客户端ID: " + data.client.id)
            console.log("客户端版本: " + data.client.version)
            console.log("客户端通讯协议: " + data.client.protocol_version)
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

