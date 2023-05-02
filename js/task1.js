document.querySelector('#btnTask1').addEventListener('click', () => {
    let icons = document.querySelectorAll('.button__icon');

    icons.forEach(icon => icon.classList.toggle('unshow'));
})