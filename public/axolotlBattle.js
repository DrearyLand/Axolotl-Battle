const selectAttackSection = document.getElementById('select-attack')
const restartSection = document.getElementById('restart')
const buttonAxolotlPlayer = document.getElementById('button-axolotl')
restartSection.style.display = 'none'
const restartButton = document.getElementById('restart-button')

const selectAxolotlSection = document.getElementById('select-axolotl')
const spanPlayerAxolotl = document.getElementById('player-axolotl')

const spanEnemyAxolotl = document.getElementById('enemy-axolotl')

const spanPlayerLives = document.getElementById('player-lives')
const spanEnemyLives = document.getElementById('enemy-lives')

const sectionMessages = document.getElementById('result')
const playerAttacks = document.getElementById('player-attacks')
const enemyAttacks = document.getElementById('enemy-attacks')
const cardsContainer = document.getElementById('cardsContainer')
const attacksContainer = document.getElementById('attacksContainer')

const playerImgContainer = document.getElementById('player-img')
const enemyImgContainer = document.getElementById('enemy-img')
const gameAttacks = document.getElementById('battle-log-result')

const sectionViewMap = document.getElementById('view-map')
const map = document.getElementById('map')

let playerID = null
let enemyID = null
let axolotls = []
let enemyAxolotls = []
let playerAttack = []
let enemyAttack = []
let axolotlsOptions
let inputLeucistic
let inputChimera
let inputMosaic 
let playerAxolotl
let playerAxolotlObject
let axolotlAttacks
let enemyAxolotlAttacks
let fireButton
let waterButton 
let earthButton  
let buttons = []
let indexPlayerAttack
let indexEnemyAttack
let playerWins = 0
let enemyWins = 0
let playerLives = 3
let enemyLives = 3
let canvas = map.getContext("2d")
let interval
let backgroundMap = new Image()
backgroundMap.src = './assets/swamp.jpg'
let heightWeSeek
let mapWidth = window.innerWidth - 30
const maxWidthMap = 600

if (mapWidth > maxWidthMap) {
    mapWidth = maxWidthMap - 30
}

heightWeSeek = mapWidth * 600 / 800

map.width = mapWidth
map.height = heightWeSeek


class Axolotl {
    constructor(name, photo, life, id = null) {
        this.id = id
        this.name = name
        this.photo = photo
        this.live = life
        this.attacks = []
        this.width = 40
        this.height = 40
        this.x = random(0, map.width - this.width)
        this.y = random(0, map.height - this.height)
        this.mapPhoto = new Image()
        this.mapPhoto.src = photo
        this.velocityX = 0
        this.velocityY = 0
    }
    paintAxolotl() {
        canvas.drawImage(
            this.mapPhoto,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }
}

let leucistic = new Axolotl('Leucistic', './assets/leucistic.png', 5)

let chimera = new Axolotl('Chimera', './assets/chimera.png', 5)

let mosaic = new Axolotl('Mosaic', './assets/mosaic.png', 5, )

const leucisticAttacks = [
    { name: '💧', id: 'water-button'},
    { name: '💧', id: 'water-button'},
    { name: '💧', id: 'water-button'},
    { name: '🔥', id: 'fire-button'},
    { name: '🌱', id: 'earth-button'}
]

leucistic.attacks.push(...leucisticAttacks)

const chimeraAttacks = [
    { name: '🌱', id: 'earth-button'},
    { name: '🌱', id: 'earth-button'},
    { name: '🌱', id: 'earth-button'},
    { name: '💧', id: 'water-button'},
    { name: '🔥', id: 'fire-button'}
]

chimera.attacks.push(...chimeraAttacks)

const mosaicAttacks = [
    { name: '🔥', id: 'fire-button'},
    { name: '🔥', id: 'fire-button'},
    { name: '🔥', id: 'fire-button'},
    { name: '💧', id: 'water-button'},
    { name: '🌱', id: 'earth-button'}
]

mosaic.attacks.push(...mosaicAttacks)

axolotls.push(leucistic,chimera,mosaic)

function startGame() {

    selectAttackSection.style.display = 'none'
    sectionViewMap.style.display = 'none'

    axolotls.forEach((axolotl) => {
        axolotlsOptions = `
        <input type="radio" name="axolotl" id=${axolotl.name} />
        <label class="axolotl-card" for=${axolotl.name}>
            <p>${axolotl.name}</p>
            <img src=${axolotl.photo} alt=${axolotl.name}>
        </label>
        `
        cardsContainer.innerHTML += axolotlsOptions

        inputLeucistic = document.getElementById('Leucistic')
        inputChimera = document.getElementById('Chimera')
        inputMosaic = document.getElementById('Mosaic')

    })

    buttonAxolotlPlayer.addEventListener('click', selectAxolotlPlayer)

    restartButton.addEventListener('click', restartGame)

    joinToGame()
}

function joinToGame() {
    fetch("http://192.168.0.5:8080/join")
        .then(function (ans) {
            if (ans.ok) {
                ans.text()
                    .then(function (answer) {
                        console.log(answer)
                        playerID = answer
                    })
            }
        })
}

function selectAxolotlPlayer(){

    if(inputLeucistic.checked) {
        spanPlayerAxolotl.innerHTML = inputLeucistic.id
        playerAxolotl = inputLeucistic.id
        playerImgContainer.innerHTML = `<img class="axolotl-img" src="./assets/leucistic.png" alt="Leucistic"></img>`
    } else if(inputChimera.checked) {
        spanPlayerAxolotl.innerHTML = inputChimera.id
        playerAxolotl = inputChimera.id
        playerImgContainer.innerHTML = `<img class="axolotl-img" src="./assets/chimera.png" alt="Leucistic"></img>`
    } else if(inputMosaic.checked) {
        spanPlayerAxolotl.innerHTML = inputMosaic.id
        playerAxolotl = inputMosaic.id     
        playerImgContainer.innerHTML = `<img class="axolotl-img" src="./assets/mosaic.png" alt="Leucistic"></img>`
    }
    else {
        alert('Select a Axolotl!')
        return
    }

    selectAxolotlSection.style.display = 'none'

    selectAxolotl(playerAxolotl)

    extractAttacks(playerAxolotl)
    sectionViewMap.style.display = 'flex'
    startMap()
}

function selectAxolotl(playerAxolotl) {
    fetch(`http://192.168.0.5:8080/axolotl/${playerID}`, {
    method: "post",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        axolotl: playerAxolotl
    })
    })
}

function extractAttacks(playerAxolotl) {
    let attacks
    for (let i = 0; i < axolotls.length; i++) {
        if (playerAxolotl == axolotls[i].name){
            attacks = axolotls[i].attacks
        }
    }
    showAttacks(attacks)
}

function showAttacks(attacks) {
    attacks.forEach((attack) => {
        axolotlAttacks = `<button id=${attack.id} class="attack-button AButton">${attack.name}</button>`
        attacksContainer.innerHTML += axolotlAttacks
    })
    
    fireButton = document.getElementById('fire-button')
    waterButton = document.getElementById('water-button')
    earthButton = document.getElementById('earth-button')
    buttons = document.querySelectorAll('.AButton')

}

function attackSequence() {
    buttons.forEach((button) => {
        button.addEventListener('click',(e) => {
            if (e.target.textContent === '🔥') {
                playerAttack.push('Fire')
                console.log(playerAttack)
                button.style.background = '#112f58'
                button.disabled = true
            } else if (e.target.textContent === '💧') {
                playerAttack.push('Water')
                console.log(playerAttack)
                button.style.background = '#112f58'
                button.disabled = true
            } else {
                playerAttack.push('Earth')
                console.log(playerAttack)
                button.style.background = '#112f58'
                button.disabled = true
            }
            if (playerAttack.length === 5) {
                sendAttacks()
            }
        })
    })
}

function sendAttacks() {
    fetch(`http://192.168.0.5:8080/axolotl/${playerID}/attacks`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        } ,
        body: JSON.stringify({
            attacks: playerAttack
        })
    })

    interval = setInterval(obtainAttacks, 50)
}

function obtainAttacks() {
    fetch(`http://192.168.0.5:8080/axolotl/${enemyID}/attacks`)
        .then(function (ans) {
            if (ans.ok) {
                ans.json()
                .then(function ({attacks}){
                    if (attacks.length === 5) {
                        enemyAttack = attacks
                        combat()
                    }
                })
            }
        })
}


function selectEnemyAxolotl(enemy) {
    // let randomAxolotl = random(0,axolotls.length-1)

    spanEnemyAxolotl.innerHTML = enemy.name
    enemyImgContainer.innerHTML = `<img class="axolotl-img" src=${enemy.photo} alt="${enemy.name}"></img>`
    enemyAxolotlAttacks = enemy.attacks
    
    attackSequence()
}

function randomEnemyAttack(){
    console.log(enemyAxolotlAttacks)
    let randomAttack = random(0,enemyAxolotlAttacks.length - 1)

    if(randomAttack == 1 || randomAttack == 0){
        enemyAttack.push('Fire')
    } else if(randomAttack == 3 || randomAttack == 4){
        enemyAttack.push('Water')
    } else {
        enemyAttack.push('Earth')
    }
    console.log(enemyAttack)
    startFight()
}

function startFight() {
    if (playerAttack.length == 5) {
        combat()
    }
}

function indexBothOponents(player, enemy) {
    indexPlayerAttack = playerAttack[player]
    indexEnemyAttack = enemyAttack[enemy]
}

function combat(){
    clearInterval(interval)

    for (let i = 0; i < playerAttack.length; i++) {
        if (playerAttack[i] == enemyAttack[i]) {
            indexBothOponents(i, i)
            createMessage("Draw")
        } else if (playerAttack[i]== 'Fire' && enemyAttack[i] == 'Earth') {
            indexBothOponents(i, i)
            createMessage("You Won")
            playerWins++
            spanPlayerLives.innerHTML = playerWins
        } else if (playerAttack[i]== 'Water' && enemyAttack[i] == 'Fire') {
            indexBothOponents(i, i)
            createMessage("You Won")
            playerWins++
            spanPlayerLives.innerHTML = playerWins
        } else if (playerAttack[i]== 'Earth' && enemyAttack[i] == 'Water') {
            indexBothOponents(i, i)
            createMessage("You Won")
            playerWins++
            spanPlayerLives.innerHTML = playerWins
        } else {
            indexBothOponents(i, i)
            createMessage("You Lost")
            enemyWins++
            spanEnemyLives.innerHTML = enemyWins
        }
    }

    checkWins()

}

function checkWins(){
    if(playerWins == enemyWins) {
        createFinalMessage("DRAW")
    } else if (playerWins > enemyWins){
        createFinalMessage("VICTORY")
    } else {
        createFinalMessage("DEFEAT")
    }

}

function createMessage(combatResult){

    let newPlayerAttack = document.createElement('p')
    let newEnemyAttack = document.createElement('p')

    sectionMessages.innerHTML = combatResult
    newPlayerAttack.innerHTML = indexPlayerAttack
    newEnemyAttack.innerHTML = indexEnemyAttack
    gameAttacks.innerHTML += `<p>${combatResult}</p>`

    playerAttacks.appendChild(newPlayerAttack)
    enemyAttacks.appendChild(newEnemyAttack)

}

function createFinalMessage(finalResult){
    
    sectionMessages.innerHTML = finalResult
    
    restartSection.style.display = 'block'
}

function restartGame(){
    location.reload()
}

function random(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min)
}

function paintCanvas() {

    playerAxolotlObject.x += playerAxolotlObject.velocityX
    playerAxolotlObject.y += playerAxolotlObject.velocityY 
    canvas.clearRect(0,0, map.width, map.height)
    canvas.drawImage(
        backgroundMap,
        0,
        0,
        map.width,
        map.width
    )
    playerAxolotlObject.paintAxolotl()

    sendPosition( playerAxolotlObject.x, playerAxolotlObject.y)

    enemyAxolotls.forEach(function (axolotl) {
        axolotl.paintAxolotl()
        reviewCollision(axolotl)
    })
}

function sendPosition(x, y) {
    fetch(`http://192.168.0.5:8080/axolotl/${playerID}/position`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (ans) {
        if (ans.ok) {
            ans.json()
                .then(function ({enemies}) {
                    console.log(enemies)
                    enemyAxolotls = enemies.map(function (enemy){
                        let enemyAxolotl = null
                        const axolotlName = enemy.axolotl.name || ""
                        if (axolotlName === "Leucistic") {
                            enemyAxolotl = new Axolotl('Leucistic', './assets/leucistic.png', 5, enemy.id)
                        } else if ( axolotlName === "Chimera") {
                            enemyAxolotl = new Axolotl('Chimera', './assets/chimera.png', 5, enemy.id)
                        } else if (axolotlName === "Mosaic") {
                            enemyAxolotl = new Axolotl('Mosaic', './assets/mosaic.png', 5, enemy.id)
                        }

                        enemyAxolotl.x = enemy.x
                        enemyAxolotl.y = enemy.y

                        return enemyAxolotl
                    })
                })
        }
    })
}

function moveRight() {
    playerAxolotlObject.velocityX = 5
}

function moveLeft() {
    playerAxolotlObject.velocityX = -5
}

function moveDown() {
    playerAxolotlObject.velocityY = 5
}

function moveUp() {
    playerAxolotlObject.velocityY = -5
}

function stopMovement() {
    playerAxolotlObject.velocityX = 0
    playerAxolotlObject.velocityY = 0
}

function keyPressed(event) {
    switch (event.key) {
        case 'ArrowUp':
            moveUp()
            break
        case 'ArrowDown':
            moveDown()
            break
        case 'ArrowRight':
            moveRight()
            break
        case 'ArrowLeft':
            moveLeft()
            break
        default:
            break
    }
}

function startMap() {
    // map.width = 843
    // map.height = 596    
    playerAxolotlObject = obtainAxolotlObject(playerAxolotl)
    console.log(playerAxolotlObject, playerAxolotl);
    interval = setInterval(paintCanvas, 50)

    window.addEventListener('keydown', keyPressed)
    window.addEventListener('keyup', stopMovement)
}

function obtainAxolotlObject() {
    for (let i = 0; i < axolotls.length; i++) {
        if (playerAxolotl == axolotls[i].name){
            return axolotls[i]
        }
    }
}

function reviewCollision(enemy) {
    const upEnemy = enemy.y
    const downEnemy = enemy.y + enemy.height
    const rightEnemy = enemy.x + enemy.width
    const leftEnemy = enemy.x

    const upAxolotl = 
        playerAxolotlObject.y
    const downAxolotl =     
        playerAxolotlObject.y + playerAxolotlObject.height
    const rightAxolotl = 
        playerAxolotlObject.x + playerAxolotlObject.width
    const leftAxolotl = 
        playerAxolotlObject.x

    if(
        downAxolotl < upEnemy || 
        upAxolotl > downEnemy ||
        rightAxolotl < leftEnemy ||
        leftAxolotl > rightEnemy
    ){
        return
    }

    if (enemy.x == undefined || enemy.y == undefined) {
        return
    }

    stopMovement()
    clearInterval(interval)
    console.log('Collision detected');

    enemyID = enemy.id
    selectAttackSection.style.display = 'flex'
    sectionViewMap.style.display = 'none'
    selectEnemyAxolotl(enemy)
}

window.addEventListener('load', startGame)