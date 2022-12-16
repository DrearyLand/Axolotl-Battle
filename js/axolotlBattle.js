let playerAttack
let enemyAttack
let playerLives = 3
let enemyLives = 3

function startGame() {
    let selectAttackSection = document.getElementById('select-attack')
    selectAttackSection.style.display = 'none'

    let restartSection = document.getElementById('restart')
    restartSection.style.display = 'none'

    let buttonAxolotlPlayer = document.getElementById('button-axolotl')
    buttonAxolotlPlayer.addEventListener('click', selectAxolotlPlayer)

    let fireButton = document.getElementById('fire-button')
    fireButton.addEventListener('click', fireAttack)
    let waterButton = document.getElementById('water-button')
    waterButton.addEventListener('click', waterAttack)
    let earthButton = document.getElementById('earth-button')
    earthButton.addEventListener('click', earthAttack)

    let restartButton = document.getElementById('restart-button')
    restartButton.addEventListener('click', restartGame)
}

function selectAxolotlPlayer(){
    let selectAxolotlSection = document.getElementById('select-axolotl')
    selectAxolotlSection.style.display = 'none'

    let selectAttackSection = document.getElementById('select-attack')
    selectAttackSection.style.display = 'block'

    let inputLeucistic = document.getElementById('leucistic')
    let inputChimera = document.getElementById('chimera')
    let inputMosaic = document.getElementById('mosaic')

    let spanPlayerAxolotl = document.getElementById('player-axolotl')

    if(inputLeucistic.checked) {
        spanPlayerAxolotl.innerHTML = 'leucistic'
    } else if(inputChimera.checked) {
        spanPlayerAxolotl.innerHTML = 'chimera'
    } else if(inputMosaic.checked) {
        spanPlayerAxolotl.innerHTML = 'mosaic'      
    }
    else {
        alert('Select a Axolotl!')
    }

    selectEnemyAxolotl()
}

function selectEnemyAxolotl(){
    let randomAxolotl = random(1,3)
    let spanEnemyAxolotl = document.getElementById('enemy-axolotl')

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
    let spanPlayerLives = document.getElementById('player-lives')
    let spanEnemyLives = document.getElementById('enemy-lives')

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
    let sectionMessages = document.getElementById('messages')

    let paragraph = document.createElement('p')
    paragraph.innerHTML = 'Your axolotl attacked with ' + playerAttack + ', the enemy axolotl attacked with ' + enemyAttack + ' - ' + combatResult

    sectionMessages.appendChild(paragraph)
}

function createFinalMessage(finalResult){
    let sectionMessages = document.getElementById('messages')

    let paragraph = document.createElement('p')
    paragraph.innerHTML = finalResult

    sectionMessages.appendChild(paragraph)

    let fireButton = document.getElementById('fire-button')
    fireButton.disabled = true
    let waterButton = document.getElementById('water-button')
    waterButton.disabled = true
    let earthButton = document.getElementById('earth-button')
    earthButton.disabled = true

    let restartSection = document.getElementById('restart')
    restartSection.style.display = 'block'
}

function restartGame(){
    location.reload()
}

function random(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min)
}

window.addEventListener('load', startGame)