import User from '../models/User';
import * as Yup from 'yup';

const MIN_LENGTH_PASSWORD = 6;

class UserController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(MIN_LENGTH_PASSWORD),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Falha na validação!' });
        }

        const userExists = await User.findOne({
            where: { email: req.body.email },
        });

        if (userExists) {
            return res
                .status(400)
                .json({ error: 'Usuário já existe na aplicação!' });
        }

        const { id, name, email } = await User.create(req.body);

        return res.json({ id, name, email });
    }

    async update(req, res) {
        const { email, oldPassword } = req.body;

        const user = await User.findByPk(req.userId);

        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(MIN_LENGTH_PASSWORD),
            password: Yup.string()
                .min(MIN_LENGTH_PASSWORD)
                .when('oldPassword', (oldPassword, field) => {
                    oldPassword ? field.required() : field;
                }),
            confirmPassword: Yup.string()
                .min(MIN_LENGTH_PASSWORD)
                .when('password', (password, field) => {
                    password
                        ? field.required().oneOf([Yup.ref('password')])
                        : field;
                }),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Falha na validação!' });
        }

        if (email !== user.email) {
            const userExists = await User.findOne({
                where: { email: req.body.email },
            });

            if (userExists) {
                return res
                    .status(400)
                    .json({ error: 'Usuário já existe na aplicação!' });
            }
        }

        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(400).json({ error: 'Senha incorreta!' });
        }

        const { id, name } = await user.update(req.body);

        return res.json({ id, name });
    }
}

export default new UserController();
