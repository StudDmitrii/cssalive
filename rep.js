import Reps from './models/Reps.js';
import Users from './models/Users.js';

export async function getFiles(userName) {
    let user = await Users.findOne({ where: { user_name: userName } });
    let allReps = await Users.findByPk(user.user_id, { include: ['reps'] });
    allReps = allReps['reps'];
    if (allReps == 0) return;
    allReps.forEach((item) => {

    });
    return allReps;
}