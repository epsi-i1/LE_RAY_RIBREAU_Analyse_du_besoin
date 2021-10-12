const moment = require("moment");
const Session = require("./Session");

class Team {

    session = {};

    constructor(index, participants) {
        this.participants = participants;
        this.index = index;
    }
}

module.exports = Team;