import Task from '../models/Task';
import * as Yup from 'yup';

class TaskController {
    async store(req, res) {
        const { task } = req.body;

        const schema = Yup.object().shape({
            task: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.json({ error: 'Falha ao cadastrar' });
        }

        const tasks = await Task.create({
            user_id: req.userId,
            task,
        });

        return res.json(tasks);
    }
}

export default new TaskController();
