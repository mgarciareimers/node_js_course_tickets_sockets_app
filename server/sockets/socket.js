const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {
    console.log('Connected!');
    // *************************
    // on: Listen information.
    // emit: Send information.
    // *************************
    client.on('newTicket', (data, callback) => callback(ticketControl.nextTicket()));

    client.on('disconnect', () => console.log('User disconnected!'));

    client.emit('currentTicket', ticketControl.getLastTicket());
});