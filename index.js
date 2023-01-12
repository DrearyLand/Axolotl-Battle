const express = require("express")
const cors = require("cors")

const app = express()

app.use(express.static('public'))
app.use(cors())
app.use(express.json())

const players = []

class Player {
    constructor(id){
        this.id = id
    }

    assignAxolotl(axolotl) {
        this.axolotl = axolotl
    }

    updatePosition(x,y) {
        this.x = x
        this.y = y
    }

    assignAttacks(attacks) {
        this.attacks = attacks
    }
}

class Axolotl {
    constructor(name) {
        this.name = name
    }
}

app.get("/join", (req, ans) => {
    const id = `${Math.random()}`

    const player = new Player(id)

    players.push(player)

    ans.setHeader("Access-Control-Allow-Origin", "*")

    ans.send(id)

})

app.post("/axolotl/:playerID", (req, ans) => {
    const playerID = req.params.playerID || ""
    const name = req.body.axolotl || ""
    const axolotl = new Axolotl(name)
    
    const playerIndex = players.findIndex((player) => playerID === player.id)

    if (playerIndex >= 0) {
        players[playerIndex].assignAxolotl(axolotl)
    }

    console.log(players)
    console.log(playerID)
    ans.end()
})

app.post("/axolotl/:playerID/position", (req, ans) => {
    const playerID = req.params.playerID || ""
    const x = req.body.x || 0
    const y = req.body.y || 0


    const playerIndex = players.findIndex((player) => playerID === player.id)

    if (playerIndex >= 0) {
        players[playerIndex].updatePosition(x,y)
    }

    const enemies = players.filter((player) => playerID !== player.id)

    ans.send({
        enemies
    })
})

app.post("/axolotl/:playerID/attacks", (req, ans) => {
    const playerID = req.params.playerID || ""
    const attacks = req.body.attacks || []
    
    const playerIndex = players.findIndex((player) => playerID === player.id)

    if (playerIndex >= 0) {
        players[playerIndex].assignAttacks(attacks)
    }
    ans.end()
})

app.get("/axolotl/:playerID/attacks", (req,ans) => {
    const playerID = req.params.playerID || ""
    const player = players.find((player) => player.id === playerID)

    ans.send({
        attacks: player.attacks || []
    })
})

app.listen(8080, () => {
    console.log("Server Working")
})