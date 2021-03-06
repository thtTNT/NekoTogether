import * as net from "net";
import PacketClientALOHA from "./packet/PacketClientALOHA";
import Packet from "./packet/Packet";
import * as encoding from 'encoding'
import PacketTransmissionRequest from "./packet/PacketTransmissionRequest";

enum State {
    WAIT_LENGTH,
    WAIT_CONTENT
}

export default class MessageHandler {

    private socket: net.Socket
    private buffer: string = ""
    private length: number = 0
    private state: State = State.WAIT_LENGTH
    private _whenPacket: Function


    constructor(socket: net.Socket) {
        this.socket = socket
        this.socket.on("data", (msg) => {
            // @ts-ignore
            for (let chr of msg.toString()) {
                switch (this.state) {
                    case State.WAIT_LENGTH:
                        if (chr == '{' || chr == "[") {
                            this.length = Number.parseInt(this.buffer) - 1
                            this.state = State.WAIT_CONTENT
                            this.buffer = chr
                        } else {
                            this.buffer += chr
                        }
                        break;
                    case State.WAIT_CONTENT:
                        this.buffer += chr
                        this.length--;
                        if (this.length == 0) {
                            this.handleData()
                            this.state = State.WAIT_LENGTH
                            this.buffer = ""
                        }
                }
            }
        })
    }

    whenPacket(func: Function) {
        this._whenPacket = func
    }

    handleData() {
        let packet = JSON.parse(this.buffer)
        console.debug("Receive packet: ")
        console.log(packet)
        switch (packet.typeName) {
            case "CLIENT_ALOHA":
                this._whenPacket(PacketClientALOHA.fromJSON(packet))
                break
            case PacketTransmissionRequest.NAME:
                this._whenPacket(PacketTransmissionRequest.fromJSON(packet))
                break
        }
    }

    send(packet: Packet) {
        let data = JSON.stringify(packet)
        this.socket.write(data.length.toString())
        this.socket.write(data, "utf8")
    }

}
