const moment = require('moment');
const Session = require('./classes/Session');

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

    return new Session(participantsFormatted);
}
}

