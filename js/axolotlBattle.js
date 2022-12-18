const selectAttackSection = document.getElementById('select-attack')
const restartSection = document.getElementById('restart')
const buttonAxolotlPlayer = document.getElementById('button-axolotl')
const fireButton = document.getElementById('fire-button')
const waterButton = document.getElementById('water-button')
const earthButton = document.getElementById('earth-button')
const restartButton = document.getElementById('restart-button')

const selectAxolotlSection = document.getElementById('select-axolotl')
const inputLeucistic = document.getElementById('leucistic')
const inputChimera = document.getElementById('chimera')
const inputMosaic = document.getElementById('mosaic')
const spanPlayerAxolotl = document.getElementById('player-axolotl')

const spanEnemyAxolotl = document.getElementById('enemy-axolotl')

const spanPlayerLives = document.getElementById('player-lives')
const spanEnemyLives = document.getElementById('enemy-lives')

const sectionMessages = document.getElementById('result')
const playerAttacks = document.getElementById('player-attacks')
const enemyAttacks = document.getElementById('enemy-attacks')

let playerAttack
let enemyAttack
let playerLives = 3
let enemyLives = 3

function startGame() {

    selectAttackSection.style.display = 'none'
    restartSection.style.display = 'none'

    buttonAxolotlPlayer.addEventListener('click', selectAxolotlPlayer)

    fireButton.addEventListener('click', fireAttack)    
    waterButton.addEventListener('click', waterAttack)
    earthButton.addEventListener('click', earthAttack)

    restartButton.addEventListener('click', restartGame)
}

function selectAxolotlPlayer(){

    selectAxolotlSection.style.display = 'none'

    selectAttackSection.style.display = 'flex'

    if(inputLeucistic.checked) {
        spanPlayerAxolotl.innerHTML = 'Leucistic'
    } else if(inputChimera.checked) {
        spanPlayerAxolotl.innerHTML = 'Chimera'
    } else if(inputMosaic.checked) {
        spanPlayerAxolotl.innerHTML = 'Mosaic'      
    }
    else {
        alert('Select a Axolotl!')
        location.reload()
    }

    selectEnemyAxolotl()
}

function selectEnemyAxolotl(){
    let randomAxolotl = random(1,3)

    if (randomAxolotl==1){
        spanEnemyAxolotl.innerHTML='Leucistic'
    } else if (randomAxolotl==2){
        spanEnemyAxolotl.innerHTML='Chimera'
    } else if (randomAxolotl==3){
        spanEnemyAxolotl.innerHTML='Mosaic'
    }

}

function fireAttack(){
    playerAttack = 'Fire'
    randomEnemyAttack()
}

function waterAttack(){
    playerAttack = 'Water'
    randomEnemyAttack()
}

function earthAttack(){
    playerAttack = 'Earth'
    randomEnemyAttack()    
}

function randomEnemyAttack(){
    let randomAttack = random(1,3)

    if(randomAttack == 1){
        enemyAttack = 'Fire'
    } else if(randomAttack == 2){
        enemyAttack = 'Water'
    } else if(randomAttack == 3){
        enemyAttack = 'Earth'
    }

    combat()
}

function combat(){

    if(enemyAttack == playerAttack) {
        createMessage("Draw")
    }else if(playerAttack == 'Fire' && enemyAttack == 'Earth') {
        enemyLives--
        spanEnemyLives.innerHTML = enemyLives
        createMessage("You Won")
    }else if(playerAttack == 'Water' && enemyAttack == 'Fire') {
        enemyLives--
        spanEnemyLives.innerHTML = enemyLives
        createMessage("You Won")
    }else if(playerAttack == 'Earth' && enemyAttack == 'Water') {
        enemyLives--
        spanEnemyLives.innerHTML = enemyLives
        createMessage("You Won")
    }else {
        createMessage("You Lost")
        playerLives--
        spanPlayerLives.innerHTML = playerLives
    }

    checkLives()

}

function checkLives(){
    if(enemyLives == 0){
        createFinalMessage("VICTORY 🏆")
    } else if(playerLives == 0){
        createFinalMessage("DEFEAT 😒")
    } 

}

function createMessage(combatResult){

    let newPlayerAttack = document.createElement('p')
    let newEnemyAttack = document.createElement('p')

    sectionMessages.innerHTML = combatResult
    newPlayerAttack.innerHTML = playerAttack
    newEnemyAttack.innerHTML = enemyAttack

    playerAttacks.appendChild(newPlayerAttack)
    enemyAttacks.appendChild(newEnemyAttack)

}

function createFinalMessage(finalResult){
    

    sectionMessages.innerHTML = finalResult

    
    fireButton.disabled = true
    
    waterButton.disabled = true
    
    earthButton.disabled = true

    
    restartSection.style.display = 'block'
}

function restartGame(){
    location.reload()
}

function random(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min)
}

window.addEventListener('load', startGame)