function selectPetPlayer(){
    alert('You selected your pet')
}

let buttonPetPlayer = document.getElementById('button-pet')
buttonPetPlayer.addEventListener('click', selectPetPlayer)