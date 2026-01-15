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
let tmp = 1
function affiche() {
    const elem = document.createElement('p');
    elem.textContent = "Hello , world !" + tmp;
    document.body.appendChild(elem);
    tmp++
}