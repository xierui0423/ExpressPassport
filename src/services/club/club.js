import { models } from '../../database';

const Player = models.Player;
const Club = models.Club;

const clubService = {};

// Private
clubService.retrieve = (req, res, next) => {
  if (req.user.id === 0) {
    res.json({ payload: { clubData: {} } });
    return;
  }
  Club.findOne({
    where: { userId: req.user.id },
  }).then((club) => {
    res.json({ payload: { clubData: club ? { players: club.players, balance: club.balance } : {} } });
  }).catch(next);
};

// TODO Optimization the data retrieving process
clubService.updatePlayer = (req, res, next) => {
  if (req.user.id === 0) {
    res.json({ payload: { userData: {} } });
    return;
  }
  Promise.all([Club.findOne({
    where: { userId: req.user.id },
  }), Player.findAll()]).then((data) => {
    const club = data[0];
    const players = data[1];

    const updatedClubBalance =
      (club.players.reduce(
        (prev, current) => prev + players.find(p => p.id === current).value, 0)
        + club.balance)
      - req.body.players.reduce(
      (prev, current) => prev + players.find(p => p.id === current).value, 0);

    if (updatedClubBalance < 0) {
      res.status(400).json({ message: 'Club balance is not enough for the transaction!' });
    } else {
      club.balance = updatedClubBalance;
      club.players = req.body.players;
      club.save().then(() => {
        res.json({ payload: { clubData: club } });
      });
    }
  }).catch(next);
};

export default clubService;
