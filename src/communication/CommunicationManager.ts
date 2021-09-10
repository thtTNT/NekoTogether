import * as net from "net";

export default class CommunicationManager {

    public readonly SERVER_PORT = 36002
    private server: net.Server

    constructor() {
        this.server = net.createServer(() => {

        })
        this.server.listen(this.SERVER_PORT)
    }

}
