import Client from "./client";

export default class ClientManager {

    private clients: Client[] = []

    accept(newClient: Client): void {
        for (let client of this.clients) {
            if (newClient.id === client.id) return
        }
        this.clients.push(newClient)
        console.log("发现客户端上线：")
        console.log("客户端ID: " + newClient.id)
        console.log("ip地址: " + newClient.ip)
        console.log("通讯端口: " + newClient.port)
        console.log("客户端版本: " + newClient.version)
        console.log("客户端通讯协议: " + newClient.protocolVersion)
    }
}
