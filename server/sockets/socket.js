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

    client.on('assignDesktopToTicket', (data, callback) => {
        if (data.desktop === undefined || data.desktop === null) {
            return callback({ ok: false, message: 'The desktop is required' });
        }

        const response = ticketControl.assignDesktopToTicket(data.desktop);
        
        // Update state in all clients.
        client.broadcast.emit('currentState', { lastTicket: ticketControl.getLastTicket(), nextFourTickets: ticketControl.getNextFourTickets() });
        
        callback(response);
    });

    client.emit('currentState', { lastTicket: ticketControl.getLastTicket(), nextFourTickets: ticketControl.getNextFourTickets() });
});