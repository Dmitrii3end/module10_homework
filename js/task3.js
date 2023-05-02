const wsUrl = 'wss://echo-ws-service.herokuapp.com';
let websocket;
const STOPWORD = 'Тринадцатиструнный мозгошмыг';

document.querySelector('#btn-message').addEventListener('click', () => {
    let message = document.querySelector('.chat__input').value;

    if (message) {
        addToFieldMessage(message, 'user');

        websocket.send(message);
    }
})

document.querySelector('#btn-geo').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successGeo, errorGeo);
    }
})

const addToFieldMessage = (message, sender) => {
    let messageField = document.querySelector('.chat__all-message');
    let div = document.createElement('div');

    document.querySelector('.chat__input').value = '';

    div.className = `all-message__message ${sender}`;
    div.innerHTML = `
    <span class="message__text">
        ${message}
    </span>`;

    messageField.append(div);
}

const addToFieldGeo = (href) => {
    let messageField = document.querySelector('.chat__all-message');
    let div = document.createElement('div');

    div.className = `all-message__message user`;
    div.innerHTML = `<a class="message__text" href="${href}" target="_blank">Я на шарике по имени Земля</a>`;

    messageField.append(div);
}

const errorGeo = async() => append('Не удалось вычислить тебя');

const successGeo = position => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;

    addToFieldGeo(href);

    websocket.send(STOPWORD + href);
}

window.addEventListener('beforeunload', () => {
    websocket.close();
})

window.addEventListener('load', () => {
    websocket = new WebSocket(wsUrl);

    websocket.onerror = function() {
        console.log('Some error');
    }
    websocket.onmessage = function(evt) {
        let message = evt.data;

        if (!(message.indexOf(STOPWORD) === 0)) {
            addToFieldMessage(message, 'server');
        } else {
            console.log(message.substring(STOPWORD.length));
        }
    }
})