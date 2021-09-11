import Packet from "./Packet";

export default class PacketClientALOHA implements Packet {

    public readonly typeName: string = "CLIENT_ALOHA"
    public readonly id: string
    public readonly version: string
    public readonly protocolVersion: Number


    public static fromJSON(data: Object) {
        return new PacketClientALOHA(
            data["id"],
            data["version"],
            data["protocolVersion"]
        )
    }

    constructor(id: string, version: string, protocolVersion: Number) {
        this.id = id
        this.version = version
        this.protocolVersion = protocolVersion
    }


}
