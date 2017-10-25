import { models } from '../../database';

const League = models.League;
const Team = models.Team;
const Player = models.Player;

const marketService = {};

// Private
marketService.retrieve = (req, res, next) => {
  Promise.all([League.findAll({
    order: [
      ['id', 'ASC'],
    ],
  }), Team.findAll({
    order: [
      ['id', 'ASC'],
    ],
  }), Player.findAll({
    order: [
      ['id', 'ASC'],
    ],
  })])
    .then((data) => {
      res.json({
        payload: {
          marketData: {
            leagueData: data[0],
            teamData: data[1],
            playerData: data[2],
          },
        },
      });
    }).catch(next);
};

export default marketService;
