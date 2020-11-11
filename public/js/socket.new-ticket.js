const socket = io();
const label = $('#lblNuevoTicket');

socket.on('connect', (data) => {
    console.log('Connected');
});

socket.on('disconnect', (data) => {
    console.log('Disconnected');
});

socket.on('currentState', (data) => {
    label.text(data.lastTicket);
});

$('button').on('click', () => socket.emit('newTicket', null, (data) => label.text(data)));