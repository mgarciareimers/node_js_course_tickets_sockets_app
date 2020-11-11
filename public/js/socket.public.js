const socket = io();

const ticket1 = $('#lblTicket1');
const ticket2 = $('#lblTicket2');
const ticket3 = $('#lblTicket3');
const ticket4 = $('#lblTicket4');

const desktop1 = $('#lblEscritorio1');
const desktop2 = $('#lblEscritorio2');
const desktop3 = $('#lblEscritorio3');
const desktop4 = $('#lblEscritorio4');

let lblTickets = [ ticket1, ticket2, ticket3, ticket4 ];
let lblDesktops = [ desktop1, desktop2, desktop3, desktop4 ];

socket.on('connect', (data) => {
    console.log('Connected');
});

socket.on('disconnect', (data) => {
    console.log('Disconnected');
});

socket.on('currentState', (data) => {
    updateHTML(data.nextFourTickets);
    console.log(data.nextFourTickets);
    const audio = new Audio('audio/new-ticket.mp3');
    audio.play();
});

const updateHTML = (nextFourTickets) => {
    if (nextFourTickets.length <= 0) {
        for (let i = 1; i < lblTickets.length; i++) {
            lblTickets[i].text('');
            lblDesktops[i].text('');
        }

        lblTickets[0].text('Please wait to be called...');
        lblDesktops[i].text('Get a ticket if you didn\'t')

        return;
    }

    for (let i = 0; i < nextFourTickets.length; i++) {
        lblTickets[i].text(`Ticket ${ nextFourTickets[i].number }`);
        lblDesktops[i].text(`Desktop ${ nextFourTickets[i].desktop }`);
    }
}