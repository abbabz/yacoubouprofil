
// script.js

document.getElementById('toggle-theme').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        this.textContent = 'Mode Jour';
    } else {
        this.textContent = 'Mode Nuit';
    }
});
