const Session = require('../classes/Session');
const {reformatParticipant, sortTeams, importData, createSession, deleteFirstColumn} = require("../index");
const Participant = require("../classes/Participant");
const Team = require("../classes/Team");

describe('Team', () => {
    [{
        team_id: 1,
        participants: [['NEP', 'Marine', '104kg', 2012]]
    },
        {
            team_id: 2,
            participants: [['NEP', 'Marine', '104kg', 2012], ['PEN', 'Paul', '14kg', 2020]]
        },
        {
            team_id: 3,
            participants: [['NEP', 'Marine', '104kg', 2012], ['PEN', 'Paul', '14kg', 2020], ['PAN', 'Pierre', '144kg', 2000]]
        },
        {
            team_id: 4,
            participants: [['NEP', 'Marine', '104kg', 2012], ['PEN', 'Paul', '14kg', 2020], ['PAN', 'Pierre', '144kg', 2000], ['PON', 'Eric', '124kg', 2100]]
        }].forEach(data => {
        it(`should create ${data.team_id} team(s) with ${data.participants.length} participant(s)`, () => {
            const participants = [];
            const teams = [];
            data.participants.map(participant => {
                participants.push(new Participant(participant));
            });
            for (let i = 0; i < data.team_id; i++) {
                teams.push(new Team(data.team_id, participants));
            }
            teams.forEach(team => {
                expect(team.getCountParticipants()).toBe(data.participants.length); // On vérifie qu'il y a le bon nombre de participant par team en fonction du nombre de participant implémenté
            })
            expect(teams.length).toBe(data.team_id) // On vérifie qu'après la création de plusieurs teams il y a bien le bon nombre
        })
    })
})

const GLOBAL_DATA = [['ZEM', 'Eric', '124kg', 2015], ['PEN', 'Paul', '14kg', 2020], [null, null, null, null], ['PAN', 'Pierre', '144kg', 2000]];

describe('import', () => {
    it('should import data form excel', () => {
        const data = ['Nom', 'Prénom', 'Poids', 'Année adhésion'];
        importData('./assets/Exemple1.xlsx').then(excel => {
            const name_column = excel[0];
            expect(name_column).toStrictEqual(data); // On vérifie que les données ont bien été importé
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
        expect(reformatParticipant(GLOBAL_DATA)).toEqual(result); // On vérifie que la syntaxe a été modifier après le reformat
    });
})

describe('sortTeams', () => {
    it('should sort teams', () => {
        const result = [{
            index: 2,
            opponent: {},
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
        }, {
            session: {}, opponent: {}, participants: [{
                "firstname": "Pierre",
                "lastname": "PAN",
                "weight": 144,
                "year": 2000,
            }], index: 3
        }]
        expect(sortTeams(reformatParticipant(GLOBAL_DATA))).toEqual(result); // On vérifie que les teams sont bien triées
    });
})

describe('Session', () => {
    it('should init a session', () => {
        const result = {
            "teams": [{
                "index": 2,
                "opponent": {},
                "participants": [{
                    "firstname": "Eric",
                    "lastname": "ZEM",
                    "weight": 124,
                    "year": 2015
                }, {"firstname": "Paul", "lastname": "PEN", "weight": 14, "year": 2020}],
                "session": {}
            }, {
                "index": 3,
                "opponent": {},
                "participants": [{"firstname": "Pierre", "lastname": "PAN", "weight": 144, "year": 2000}],
                "session": {}
            }]
        }
        expect(createSession(GLOBAL_DATA)).toEqual(result); // On vérifie que l'arborescence n'a pas changer pour éviter une regression
    });

    it('should have atleast two teams in session', () => {
        const participants = [['ZEM', 'Eric', '124kg', 2005], ['MEZ', 'Paul', '124kg', 2015], [null, null, null, null], ['ZEM', 'Eric', '84kg', 2015], ['NEP', 'Marine', '104kg', 2012]]
        const participantsFormatted = reformatParticipant(participants);
        const teams = sortTeams(participantsFormatted);
        const session = new Session(teams);
        expect(session.teams.length).toBeGreaterThanOrEqual(2); // On vérifie que la session comporte bien 2 teams
    });

    it('should compare teams score', () => {
        const participants = [['ZEM', 'Eric', '124kg', 2005], ['MEZ', 'Paul', '124kg', 2015], [null, null, null, null], ['ZEM', 'Eric', '84kg', 2015], ['NEP', 'Marine', '104kg', 2012]]
        const participantsFormatted = reformatParticipant(participants);
        const teams = sortTeams(participantsFormatted);
        const session = new Session(teams);
        expect(session.matchTeams().length).toBe(1); // Qu'il y a bien un seul match
        expect(session.matchTeams()[0].team1.opponent.index).toEqual(session.matchTeams()[0].team2.index); // Que l'adversaire de la team1 est bien le match de la team 2
        expect(session.matchTeams()[0].team1).not.toEqual(session.matchTeams()[0].team2); // On vérifie qu'il ne se match pas lui même
    });
})

describe('Participant', () => {
    it(`should create one participant`, () => {
        const _participant = new Participant(['NEP', 'Marine', '104kg', 2012]);
        expect(_participant.firstname).toStrictEqual('Marine'); // Vérifie que le participant a bien son prénom
        expect(_participant.lastname).toStrictEqual('NEP'); // Vérifie que le participant a bien son nom

    })
})

