const fs = require('fs');

class TicketControl {
    
    constructor() {
        this.lastTicket = 0;
        this.today = new Date().getDate();
        this.tickets = [];

        const data = require('../data/data.json');

        if (data.today === this.today) {
            this.lastTicket = data.lastTicket;
            this.tickets = data.tickets;
        } else {
            this.resetData();
        }
    }

    // Reset data.
    resetData = () => {
        this.lastTicket = 0;
        this.tickets = [];
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
        const jsonData = { lastTicket: this.lastTicket, tickets: this.tickets, today: this.today };
        fs.writeFileSync('./server/data/data.json', JSON.stringify(jsonData));
    }

    // Get last ticket.
    getLastTicket() {
        return `Ticket ${ this.lastTicket }`;
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