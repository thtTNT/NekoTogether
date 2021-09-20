import Packet from "./Packet";

export default class PacketTransmissionRequest implements Packet {

    public static readonly NAME: string = "TRANSMISSION_REQUEST"
    public readonly typeName: string = PacketTransmissionRequest.NAME
    public readonly fileName: string
    public readonly fileSize: number

    public static fromJSON(data: Object) {
        return new PacketTransmissionRequest(
            data["fileName"],
            data["fileSize"]
        )
    }


    constructor(fileName: string, fileSize: number) {
        this.fileName = fileName
        this.fileSize = fileSize
    }

}
