// document.getElementById('liste').textContent = 'Hello !';

let hidding = document.querySelector('.btn');
function hide() {
    if (window.confirm("Are you sure to close ?")) {
        document.querySelector('h1').style.display = 'none';
        affiche();
    } else {
        document.querySelector('h1').style.display = 'block';
    }
}
function affiche() {
    const elem = document.createElement('p');
    elem.textContent = "Hello , world !";
    document.body.appendChild(elem);
}

// document.addEventListener('DOMContentLoaded', () => {
//     let age = prompt("How old are you?")
//     console.log(age);
// })