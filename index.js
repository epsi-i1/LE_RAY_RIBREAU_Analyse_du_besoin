const xlsxFile = require('read-excel-file/node');
const moment = require('moment');
const Session = require('./classes/Session');
const Team = require('./classes/Team');
const Participant = require('./classes/Participant');

/**
 * @param {Array} data
 * @returns [{id: String, lastname: String, firstname: String, wight: Number, year: Number},*]
 */
function reformatParticipant(data) {
    return data.map((participant, index) => {
        if (participant.includes(null)) {
            return
        }
        return new Participant(participant);
    });
}

/**
 * @param {[]} participants
 * @returns {Session}
 */
function createSession(participants) {
    const participantsFormatted = reformatParticipant(participants);
    const teams = sortTeams(participantsFormatted);

    return new Session(teams);
}

/**
 * @param {String} filePath
 * @returns {Array}
 */
async function importData(filePath) {
    return xlsxFile(filePath);
}

/**
 * @param {Array} participants
 * @returns [Object]
 */
function sortTeams(participants) {
    const teams = [];
    let team = []
    participants.forEach((participant, index) => {
        if (!participant) {
            teams.push(new Team(index, team))
            return team = [];
        }
        if (index === participants.length - 1) {
            team.push(participant);
            return teams.push(new Team(index, team))
        }
        return team.push(participant);
    })
    return teams;
}
}

