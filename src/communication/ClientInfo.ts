export default class ClientInfo {

    public readonly id: string
    public readonly ip: String
    public readonly port: String
    public readonly version: String
    public readonly protocolVersion: number
    public readonly name: string

    constructor(id: string, ip: string, port: string, name: string, version: string, protocolVersion: number) {
        this.id = id
        this.ip = ip
        this.port = port
        this.name = name
        this.version = version
        this.protocolVersion = protocolVersion
    }

    public printInfo() {
        console.log("客户端ID: " + this.id)
        console.log("ip地址: " + this.ip)
        console.log("通讯端口: " + this.port)
        console.log("客户端名称: " + this.name)
        console.log("客户端版本: " + this.version)
        console.log("客户端通讯协议: " + this.protocolVersion)
    }

}
