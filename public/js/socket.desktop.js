const socket = io();

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('desktop')) {
    window.location = 'index.html';
    throw new Error('The desktop is required');
}

const desktop = searchParams.get('desktop');

$('h1').text(`Desktop ${ desktop }`)
const label = $('small');

socket.on('connect', (data) => {
    console.log('Connected');
});

socket.on('disconnect', (data) => {
    console.log('Disconnected');
});

$('button').on('click', () => socket.emit('assignDesktopToTicket', { desktop: desktop }, (data) => label.text(data.number === undefined || data.number === null ? 'No more tickets' : data.number)));