import * as fastify from "fastify"
import fetch from 'node-fetch'
import fs from 'fs'
const server: fastify.FastifyInstance = fastify.default({ logger: true })
const servers: Array<string> = [
    "https://slimeserver2.herokuapp.com",
    "https://sl-aliceblue.herokuapp.com",
    "https://sl-azure.herokuapp.com",
    "https://sl-crimson.herokuapp.com",
    "https://sl-firebrick.herokuapp.com",
    "https://sl-magenta.herokuapp.com",
    "https://sl-indigo.glitch.me",
    "https://sl-ivory.glitch.me",
    "https://sl-linen.glitch.me",
    "https://sl-navy.herokuapp.com",
    "https://sl-sienna.glitch.me",
    "https://sl-slateblue.glitch.me",
    "https://sl-thistle.glitch.me"
]
let latency: any = {}
let users: any = {}
const alfabet = ["a", "2", "e", "1", "f", "4", "d", "5", "c", "6", "a", "9", "d", "0", "b", "3", "6", "c", "8", "c", "4", "c", "1", "b", "a", "5", "e", "3", "1", "5", "6", "7", "1", "4", "5", "b", "e", "f", "f", "f", "1", "3", "4", "7", "9", "a", "e", "1", "d", "b", "2", "6", "b", "7", "7"]

setInterval(
    () => {
        servers.forEach(async server => {
            const b4fetch: number = new Date().getTime()
            fetch(server).then(
                () => {
                    const l: number = new Date().getTime() - b4fetch
                    latency[server] = l / 2
                }
            )
        });
    },
    1000
)


server.get(
    "/",
    async (req, res) => {
        const stream = fs.createReadStream('./view/index.html')
        res.type('text/html').send(stream)
    }
)

server.get(
    "/route",
    async (req, res) => {
        const arr = [
            { latency: latency['https://slimeserver2.herokuapp.com'], name: "https://slimeserver2.herokuapp.com" },
            { latency: latency['https://sl-azure.herokuapp.com'], name: "https://sl-azure.herokuapp.com" },
            { latency: latency['https://sl-crimson.herokuapp.com'], name: "https://sl-crimson.herokuapp.com" },
            { latency: latency['https://sl-magenta.herokuapp.com'], name: "https://sl-magenta.herokuapp.com" },
            { latency: latency["https://sl-firebrick.herokuapp.com"], name: "https://sl-firebrick.herokuapp.com" }
        ]
        arr.sort(function (a, b) { return a.latency - b.latency })
        if (req.query.nomor == undefined || req.query.nomor == null) {
            return `NullPointerException: Query is not an instance of object`
        }

        users[req.query.nomor] = 'https://slimeserver2.herokuapp.com'
        res.send("https://slimeserver2.herokuapp.com")
    }
)
server.get(
    "/latency",
    async (req, res) => {
        res.send(JSON.stringify(latency))
    }
)

server.get(
    "/user",
    async (req, res) => {
        if (req.query.token == undefined || req.query.token == null) {
            return `NullPointerException: Query is instance of null`
        }
        const time = `${new Date().getFullYear() * new Date().getSeconds()}${new Date().getDate() * new Date().getSeconds()}${new Date().getHours() * new Date().getSeconds()}${new Date().getMinutes() * new Date().getSeconds()}${new Date().getSeconds() * new Date().getSeconds()}`
        let token = ""
        time.split("").forEach(t => {
            const a:number = Number.parseInt(t)
            token = token + alfabet[a]
        })
        if(token == req.query.token){
            res.send(JSON.stringify(users))
        }
    }
)
const PORT: any = process.env.PORT || "5000"

server.listen(
    PORT,
    "0.0.0.0"
)