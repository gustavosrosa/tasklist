import jwt from 'jsonwebtoken';
import User from '../models/User';
import auth from '../../config/auth';

class SessionController {
    async store(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: 'Usuário não existe!' });
        }

        if (!(await user.checkPassword(password))) {
            return res.status(401).json({ error: 'Senha inválida!' });
        }

        const { id, name } = user;

        return res.json({
            user: {
                id,
                email,
                name,
            },
            token: jwt.sign({ id }, auth.secret, {
                expiresIn: auth.expires_in,
            }),
        });
    }
}

export default new SessionController();
