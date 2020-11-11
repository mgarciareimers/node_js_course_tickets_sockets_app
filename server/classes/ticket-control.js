const fs = require('fs');

class TicketControl {
    
    constructor() {
        this.lastTicket = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.nextFourTickets = [];

        const data = require('../data/data.json');

        if (data.today === this.today) {
            this.lastTicket = data.lastTicket;
            this.tickets = data.tickets;
            this.nextFourTickets = data.nextFourTickets;
        } else {
            this.resetData();
        }
    }

    // Reset data.
    resetData = () => {
        this.lastTicket = 0;
        this.tickets = [];
        this.nextFourTickets = [];

        this.saveFile();
    }

    // Add 1 to last ticket.
    nextTicket = () => {
        this.lastTicket++;
        this.tickets.push(new Ticket(this.lastTicket, null));

        this.saveFile();

        return `Ticket ${ this.lastTicket }`;
    }

    // Save file.
    saveFile = () => {
        const jsonData = { lastTicket: this.lastTicket, tickets: this.tickets, nextFourTickets: this.nextFourTickets, today: this.today };
        fs.writeFileSync('./server/data/data.json', JSON.stringify(jsonData));
    }

    // Get last ticket.
    getLastTicket() {
        return `Ticket ${ this.lastTicket }`;
    }

    // Method that assigns a desktop to a ticket.
    assignDesktopToTicket = (desktop) => {
        if (this.tickets.length <= 0) {
            this.nextFourTickets = [];
            this.saveFile();
            return 'No tickets have been found';
        }

        const ticketNumber = this.tickets[0].number;

        this.tickets.splice(0, 1);
        const ticketToServe = new Ticket(ticketNumber, desktop);

        this.nextFourTickets.unshift(ticketToServe);

        if (this.nextFourTickets.length > 4) {
            this.nextFourTickets.splice(-1, 1);
        }

        console.log(this.nextFourTickets);
        this.saveFile();

        return ticketToServe;
    }

    // Get next four tickets.
    getNextFourTickets = () => {
        return this.nextFourTickets;
    }
}

class Ticket {
    constructor(number, desktop) {
        this.number = number;
        this.desktop = desktop;
    }
}

module.exports = {
    TicketControl,
}