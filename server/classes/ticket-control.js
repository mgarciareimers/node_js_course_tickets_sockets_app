const fs = require('fs');

class TicketControl {
    
    constructor() {
        this.lastTicket = 0;
        this.today = new Date().getDate();

        const data = require('../data/data.json');

        if (data.today === this.today) {
            this.lastTicket = data.lastTicket;
        } else {
            this.resetData();
        }
    }

    // Reset data.
    resetData = () => {
        this.lastTicket = 0;
        this.saveFile();
    }

    // Add 1 to last ticket.
    nextTicket = () => {
        this.lastTicket++;
        this.saveFile();

        return `Ticket ${ this.lastTicket }`;
    }

    // Save file.
    saveFile = () => {
        const jsonData = { 'lastTicket': this.lastTicket, 'today': this.today };
        fs.writeFileSync('./server/data/data.json', JSON.stringify(jsonData));
    }

    // Get last ticket.
    getLastTicket() {
        return `Ticket ${ this.lastTicket }`;
    }
}

module.exports = {
    TicketControl,
}