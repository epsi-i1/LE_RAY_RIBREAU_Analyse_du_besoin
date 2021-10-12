const moment = require('moment');
const Session = require('./classes/Session');
/**
 * @param {[]} participants
 * @returns {Session}
 */
function createSession(participants) {
    return new Session(participants);
}

