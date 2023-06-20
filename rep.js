import Reps from './models/Reps.js';
import Users from './models/Users.js';
import * as fs from 'fs';

export async function getFiles(userName) {
    let user = await Users.findOne({ where: { user_name: userName } });
    let allReps = await Users.findByPk(user.user_id, { include: ['reps'] });
    allReps = allReps['reps'];
    if (allReps == 0) return;
    allReps = allReps.map((item) => {
        let file_path = item['rep_file_old'];
        let file_date_real = item['createdAt'];
        let file_date = file_path.split('/')[1];
        let file_name = file_path.split('/')[2];
        item = { date: file_date_real, name: file_name, id: file_date };
        return item;
    });
    return allReps;
}

export async function loadFile(userName, id) {
    let user = await Users.findOne({ where: { user_name: userName } });
    let allReps = await Users.findByPk(user.user_id, { include: ['reps'] });
    allReps = allReps['reps'];
    allReps = allReps
        .map((item) => {
            let file_path = item['rep_file_old'];
            let file_path_old = item['rep_file_old'];
            let file_path_new = item['rep_file_new'];
            let file_date = file_path.split('/')[1];
            item = { date: file_date, path_old: file_path_old, path_new: file_path_new };
            return item;
        })
        .find(item => item.date == id);
    allReps.path_old = 'users/' + userName + allReps.path_old;
    allReps.path_new = 'users/' + userName + allReps.path_new;
    // console.log(allReps);
    let before = await fs.readFileSync(allReps.path_old, 'utf8');
    let after = await fs.readFileSync(allReps.path_new, 'utf8');
    return { before: before, after: after };
}