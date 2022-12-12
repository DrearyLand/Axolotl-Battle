function startGame() {
    let buttonPetPlayer = document.getElementById('button-pet')
    buttonPetPlayer.addEventListener('click', selectPetPlayer)
}

function selectPetPlayer(){
    let inputHipodoge = document.getElementById('hipodoge')
    let inputCapipepo = document.getElementById('capipepo')
    let inputRatigueya = document.getElementById('ratigueya')
    let inputLangostelvis = document.getElementById('langostelvis')
    let inputTucapalma = document.getElementById('tucapalma')
    let inputPydos = document.getElementById('pydos')

    let spanPlayerPet = document.getElementById('player-pet')

    if(inputHipodoge.checked) {
        spanPlayerPet.innerHTML = 'Hipodoge'
    } else if(inputCapipepo.checked) {
        spanPlayerPet.innerHTML = 'Capipepo'
    } else if(inputRatigueya.checked) {
        spanPlayerPet.innerHTML = 'Ratigueya'      
    } else if(inputLangostelvis.checked) {
        spanPlayerPet.innerHTML = 'Langostelvis'
    } else if(inputTucapalma.checked) {
        spanPlayerPet.innerHTML = 'Tucapalma'
    } else if(inputPydos.checked) {
        spanPlayerPet.innerHTML = 'Pydos'
    } else {
        alert('Select a pet!')
    }
}

window.addEventListener('load', startGame)