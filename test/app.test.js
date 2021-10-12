const Session = require('../classes/Session');
const {reformatParticipant, sortTeams, importData, createSession, deleteFirstColumn} = require("../index");

const globalData = [['ZEM', 'Eric', '124kg', 2015], ['PEN', 'Paul', '14kg', 2020], [null, null, null, null], ['PAN', 'Pierre', '144kg', 2000]];

describe('import', () => {
    it('should import data form excel', () => {
        const data = ['Nom', 'Prénom', 'Poids', 'Année adhésion'];
        importData('./assets/Exemple1.xlsx').then(excel => {
            const name_column = excel[0];
            expect(name_column).toStrictEqual(data);
        });
    });
})

describe('reformatParticipant', () => {
    it('should reformat participant', () => {
        const result = [{
            lastname: 'ZEM',
            firstname: 'Eric',
            weight: 124,
            year: 2015
        }, {
            lastname: 'PEN',
            firstname: 'Paul',
            weight: 14,
            year: 2020
        },
            undefined, {
                lastname: 'PAN',
                firstname: 'Pierre',
                weight: 144,
                year: 2000
            }
        ]
        expect(reformatParticipant(globalData)).toEqual(result);
    });
})

describe('sortTeams', () => {
    it('should sort teams', () => {
        const result = [{
            session: {},
            participants: [{
                "firstname": "Eric",
                "lastname": "ZEM",
                "weight": 124,
                "year": 2015,
            }, {
                "firstname": "Paul",
                "lastname": "PEN",
                "weight": 14,
                "year": 2020,
            }],
            index: 2
        }, {
            session: {}, participants: [{
                "firstname": "Pierre",
                "lastname": "PAN",
                "weight": 144,
                "year": 2000,
            }], index: 3
        }]
        expect(sortTeams(reformatParticipant(globalData))).toEqual(result);
    });
})

describe('Session', () => {
    it('should init a session', () => {
        const result = {
            "teams": [{
                "index": 2,
                "participants": [{
                    "firstname": "Eric",
                    "lastname": "ZEM",
                    "weight": 124,
                    "year": 2015
                }, {"firstname": "Paul", "lastname": "PEN", "weight": 14, "year": 2020}],
                "session": {}
            }, {
                "index": 3,
                "participants": [{"firstname": "Pierre", "lastname": "PAN", "weight": 144, "year": 2000}],
                "session": {}
            }]
        }
        expect(createSession(globalData)).toEqual(result);
    });

    it('should have atleast two teams in session', () => {
        const participants = [['ZEM', 'Eric', '124kg', 2005], ['MEZ', 'Paul', '124kg', 2015], [null, null, null, null], ['ZEM', 'Eric', '84kg', 2015], ['NEP', 'Marine', '104kg', 2012]]
        const participantsFormatted = reformatParticipant(participants);
        const teams = sortTeams(participantsFormatted);
        const session = new Session(teams);
        expect(session.teams.length).toBeGreaterThanOrEqual(2);
    });
})