document.querySelector('#btnTask2').addEventListener('click', () => {
    let browserHeight = document.documentElement.clientHeight;
    let browserWidth = document.documentElement.clientWidth;
    let screenHeight = window.screen.height;
    let screenWidth = window.screen.width;

    alert(`Ширина браузера: ${browserWidth}.
Высота браузера: ${browserHeight}.
Размер экрана: ${screenHeight} x ${screenWidth}.`);
})