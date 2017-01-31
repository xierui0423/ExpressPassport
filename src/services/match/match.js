const matchService = {};

let id = 1;
const matches = [];

// Private
matchService.retrieve = (req, res) => {
    const currentMatch = matches.find(match => match.userIds.includes(req.user.dataValues.id));
    res.json({ payload: currentMatch || {} });
};


matchService.create = (req, res) => {
    const currentMatch = matches.find(match => match.userIds.includes(req.user.dataValues.id));

    if (currentMatch) {
        res.json({
            message: currentMatch.userIds.length > 1 ?
                'Still waiting for someone to join the currently ongoing match.' :
                'You are already in the match.',
            payload: currentMatch });
    } else {
        const waitingMatch = matches.find(match => match.userIds.length === 1);

        if (waitingMatch) {
            waitingMatch.userIds.push(req.user.dataValues.id);
            res.json({ message: 'Joined a currently ongoing match.', payload: waitingMatch });
        } else {
            const newMatch = {
                id: id += 1,
                userIds: [req.user.dataValues.id],
            };

            matches.push(newMatch);

            res.json({ message: 'Match has been created!', payload: newMatch });
        }
    }
};

export default matchService;
