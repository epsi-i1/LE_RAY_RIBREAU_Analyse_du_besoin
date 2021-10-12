const Session = require('../classes/Session');
const globalData = [['ZEM', 'Eric', '124kg', 2015], ['PEN', 'Paul', '14kg', 2020], [null, null, null, null], ['PAN', 'Pierre', '144kg', 2000]];
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

})