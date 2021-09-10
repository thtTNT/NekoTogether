export default class Client {

    public readonly id: String
    public readonly ip: String
    public readonly port: String
    public readonly version: String
    public readonly protocolVersion: number

    constructor(id, ip, port, version, protocolVersion) {
        this.id = id
        this.ip = ip
        this.port = port
        this.version = version
        this.protocolVersion = protocolVersion
    }

}
