const moment = require("moment");
const Session = require("./Session");

class Team {

    session = {};

    constructor(index, participants) {
        this.participants = participants;
        this.index = index;
    }

    get score() {
        return this.getScore();
    }

    /**
     * @returns {{number, yearScore: number, weightScore: number}}
     */
    getScore() {
        const categories = [
            {
                id: 1,
                poidsMin: 46,
                poidsMax: 49,
                label: "Mi-mouche"
            },
            {
                id: 2,
                poidsMin: 49,
                poidsMax: 52,
                label: "Mouche"
            },
            {
                id: 3,
                poidsMin: 52,
                poidsMax: 56,
                label: "Coq"
            },
            {
                id: 4,
                poidsMin: 56,
                poidsMax: 60,
                label: "Léger"
            },
            {
                id: 5,
                poidsMin: 60,
                poidsMax: 64,
                label: "Super-léger"
            },
            {
                id: 6,
                poidsMin: 64,
                poidsMax: 69,
                label: "Welter"
            },
            {
                id: 7,
                poidsMin: 69,
                poidsMax: 75,
                label: "Moyen"
            },
            {
                id: 8,
                poidsMin: 75,
                poidsMax: 81,
                label: "Mi-lourd"
            },
            {
                id: 9,
                poidsMin: 81,
                poidsMax: 91,
                label: "Lourd"
            },
            {
                id: 10,
                poidsMin: 91,
                poidsMax: 250,
                label: "Super-lourd"
            }
        ];

        let number = this.participants.length;
        let weightTotal = 0;
        let yearScore = 0;

        this.participants.forEach(function (participant) {
            weightTotal += participant.weight;
            yearScore += moment().year() - participant.year;
        });

        const weightAvg = weightTotal/number;

        // On match la team dans sa catégorie de poids
        const categoriesMatch = categories.filter(x => {
            return x.poidsMax > weightAvg && x.poidsMin < weightAvg;
        });
        // console.log('Team avg weight: ' + weightAvg);
        // console.log(categoriesMatch[0].id);

        this.category_id = categoriesMatch[0].id;

        return {number: number, weightScore: weightTotal/number, yearScore: yearScore};
    }

    getCountParticipants() {
        return this.participants.length;
    }

}

module.exports = Team;