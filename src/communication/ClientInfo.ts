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

}
