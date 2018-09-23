import http from "http";
import Server from "./server";
import { normalize } from "path";

class App {
    constructor(private port?: number) {
        this.port = this.normalizeport(process.env.port || 3333);
    }

    async initializeApp(){
        try {
            const serverApp = Server.serverApp;
            const app = http.createServer(serverApp).listen(this.port, () => {
                this.onListen(app.address);
            })
            
        } catch (error) {
            this.error(error);
        }
    }

    onListen(address: any){
        console.log(`Listening on ${this.port}`);
    }

    error(error: any){
        if (error.syscall !== "listen" || error.code !== "EACCES" || error.code !== "EADDRINUSE") {
            throw error;
        }
    }

    normalizeport(num: any){
        const port = parseInt(num, 10);
        
        return isNaN(port) ? num : port;
    } 
}

new App().initializeApp();
