class Participant {

    constructor(data) {
        this.lastname = data[0];
        this.firstname = data[1];
        this.weight = parseInt(data[2].split('kg')[0]);
        this.year = data[3];

    }

}

module.exports = Participant;