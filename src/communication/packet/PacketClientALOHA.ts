import Packet from "./Packet";

export default class PacketClientALOHA implements Packet {

    public readonly typeName: string = "CLIENT_ALOHA"
    public readonly id: string
    public readonly version: string
    public readonly name: string
    public readonly protocolVersion: number


    public static fromJSON(data: Object) {
        return new PacketClientALOHA(
            data["id"],
            data["version"],
            data["name"],
            data["protocolVersion"]
        )
    }

    constructor(id: string, version: string, name: string, protocolVersion: number) {
        this.id = id
        this.version = version
        this.name = name
        this.protocolVersion = protocolVersion
    }


}
