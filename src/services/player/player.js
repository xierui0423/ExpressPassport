import { models } from '../../database';

const Player = models.player.Player;

const playerService = {};


// Private
playerService.retrieve = (req, res, next) => {
    Player.findOne({ where: { userId: req.user.dataValues.id } }).then((player) => {
        res.json({ payload: player || {} });
    }).catch(next);
};

const validatePlayerData = () => {
    const valid = true;

    // TODO Validation logic for player attributes

    return valid;
};

playerService.create = (req, res, next) => {
    const player = req.body.player;

    Player.findOne({ $or: [{ userId: req.user.dataValues.id }, { name: player.name }] })
        .then((createdPlayer) => {
            // Don't allow duplicate username
            if (createdPlayer) {
                res.json({ message: 'The user already has associated player or the username has been taken!' });
            } else {
                const playerData = {
                    name: player.name,
                    height: player.height,
                    weight: player.weight,
                    userId: req.user.dataValues.id,
                    speed: player.speed,
                    agility: player.agility,
                    strength: player.strength,
                    pass: player.pass,
                    control: player.control,
                    tackle: player.tackle,
                    head: player.head,
                    shoot: player.shoot,
                    flair: player.flair,
                    experience: 0,
                };

                if (validatePlayerData(playerData)) {
                    Player.create(playerData).then(() => {
                        res.json({ message: `User ${player.name} has been created!`, payload: playerData });
                    }).catch(next);
                } else {
                    res.status(500).json({ message: 'Invalid data detected!' });
                }
            }
        }).catch(next);
};


export default playerService;
