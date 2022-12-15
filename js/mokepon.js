let playerAttack
let enemyAttack
let playerLives = 3
let enemyLives = 3

function startGame() {
    let buttonPetPlayer = document.getElementById('button-pet')
    buttonPetPlayer.addEventListener('click', selectPetPlayer)

    let fireButton = document.getElementById('fire-button')
    fireButton.addEventListener('click', fireAttack)
    let waterButton = document.getElementById('water-button')
    waterButton.addEventListener('click', waterAttack)
    let earthButton = document.getElementById('earth-button')
    earthButton.addEventListener('click', earthAttack)

    let restartButton = document.getElementById('restart-button')
    restartButton.addEventListener('click', restartGame)
}

function selectPetPlayer(){
    let inputHipodoge = document.getElementById('hipodoge')
    let inputCapipepo = document.getElementById('capipepo')
    let inputRatigueya = document.getElementById('ratigueya')

    let spanPlayerPet = document.getElementById('player-pet')

    if(inputHipodoge.checked) {
        spanPlayerPet.innerHTML = 'Hipodoge'
    } else if(inputCapipepo.checked) {
        spanPlayerPet.innerHTML = 'Capipepo'
    } else if(inputRatigueya.checked) {
        spanPlayerPet.innerHTML = 'Ratigueya'      
    }
    else {
        alert('Select a pet!')
    }

    selectEnemyPet()
}

function selectEnemyPet(){
    let randomPet = random(1,3)
    let spanEnemyPet = document.getElementById('enemy-pet')

    if (randomPet==1){
        spanEnemyPet.innerHTML='Hipodoge'
    } else if (randomPet==2){
        spanEnemyPet.innerHTML='Capipepo'
    } else if (randomPet==3){
        spanEnemyPet.innerHTML='Ratigueya'
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
    paragraph.innerHTML = 'Your pet attacked with ' + playerAttack + ', the enemy pet attacked with ' + enemyAttack + ' - ' + combatResult

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
}

function restartGame(){
    location.reload()
}

function random(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min)
}

window.addEventListener('load', startGame)