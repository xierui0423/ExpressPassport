import { models } from '../../database';

const Player = models.player.Player;

const playerService = {};


// Private
playerService.retrieve = (req, res, next) => {
    Player.findOne({ where: { userId: req.user.dataValues.id } }).then((user) => {
        res.json(user || []);
    }).catch(next);
};

const validatePlayerData = (playerData) => {
    let valid = true;

    // TODO Validation logic for player attributes

    return valid;
}

playerService.create = (req, res, next) => {
    const player = req.body;

    Player.findOne({ where: { userId: req.user.dataValues.id } }).then((createdPlayer) => {
        // Don't allow duplicate username
        if (createdPlayer) {
            res.send('The user already has associated player!');
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
            }

            if (validatePlayerData(playerData)) {
                Player.create(playerData).then(() => {
                    res.send(`User ${user.name} has been created!`);
                }).catch(next);
            }
            else {
                res.status(500).send(`Invalid data detected!`);
            }

        }
    }).catch(next);
};


export default playerService;
