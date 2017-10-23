import { models } from '../../database';

const Club = models.club.Club;

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
    res.json({ payload: { clubData: club ? { ownedPlayers: club.players } : {} } });
  }).catch(next);
};
export default clubService;
