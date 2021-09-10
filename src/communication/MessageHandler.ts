import * as net from "net";
import PacketClientALOHA from "./packet/PacketClientALOHA";

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
        this.socket.on("data", (msg) => {
            // @ts-ignore
            for (let chr of msg.buffer) {
                switch (this.state) {
                    case State.WAIT_LENGTH:
                        if (chr == '{' || chr == "[") {
                            this.length = Number.parseInt(this.buffer)
                            this.state = State.WAIT_CONTENT
                            this.buffer = chr
                        } else {
                            this.buffer += chr
                        }
                        break;
                    case State.WAIT_CONTENT:
                        this.buffer += chr
                        length--;
                        if (length == 0) {
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
        switch (packet.type) {
            case "CLIENT_ALOHA":
                this._whenPacket(PacketClientALOHA.fromJSON(packet))
        }
    }

}
