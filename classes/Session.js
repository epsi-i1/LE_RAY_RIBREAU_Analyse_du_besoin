class Session {

    constructor(teams) {
        this.teams = teams;
    }

    matchTeams() {

        let teams = this.teams;

        return this.compareTeamsScore(teams);
    }

    matchTeamWithWeight(teamList, i_team) {
        return teamList.filter(x => x.category_id - i_team.category_id === 1 || x.category_id - i_team.category_id === -1 || x.category_id === i_team.category_id);
    }

    matchTeamWithNumber(teamList, i_team) {

        // return teamList.reduce((a, b) => {
        // return Math.abs(b.score.number - i_team.score.number) < Math.abs(a.score.number.weightScore - i_team.score.number) ? b : a;
        return teamList.filter(x => x.score.number - i_team.score.number <= -1 || x.score.number - i_team.score.number >= -1 || x.score.number === i_team.score.number);
        // });
    }

    /**
     * @param {[]} teamList
     * @param {Team} currentTeam
     * @returns {[]}
     */
    matchTeamWithSenority(teamList, currentTeam) {
        return teamList.filter(x => x.score.yearScore - currentTeam.score.yearScore < 50 || x.score.yearScore - currentTeam.score.yearScore > -50 || x.score.yearScore === currentTeam.score.yearScore);
    }

    compareTeamsScore(teams) {

        let matches = [];
        let _teams = [...teams];
        let __teams = [...teams];

        _teams.map(team => {

            let match = null;
            let previousScore = null;


            __teams.map(function (_team, index, array) {
                // On retire la team courante du matching
                array = array.filter(x => x.index !== team.id);

                if (index > 0) {
                    const previousTeam = array[index - 1];
                    let weightDiff = team.score.weightScore - previousTeam.score.weightScore;

                    if (weightDiff < 0) weightDiff = weightDiff * -1;

                    let experienceDiff = team.score.yearScore - previousTeam.score.yearScore;

                    if (experienceDiff < 0) experienceDiff = experienceDiff * -1;

                    const score = weightDiff + experienceDiff;

                    if (score < previousScore || !previousScore) {
                        previousScore = score;
                        match = _team;
                    }
                }
            });

            if (match) {

                if (team.index === match.index) {
                    return;
                }

                // On retire le match et la team en cours de la liste des teams
                matches.push({team1: team, team2: match});

                // On set les opponents de chaque équipe

                team.setOpponent(match);
                match.setOpponent(team);

                __teams = __teams.filter(__team => __team.index !== match.index || __team.index !== team.index);
                _teams = _teams.filter(__team => __team.index !== match.index || __team.index !== team.index);
            }

        });

        return matches;

    }

    getCountTeams() {
        return this.teams.length;
    }

    setTeamsSession() {
        this.teams.forEach(team => {
            team.session = this;
        });
    }

    removeFromTeamList(team_id) {
        this.teams = this.teams.filter(x => x.index !== team_id);
    }

}

module.exports = Session;