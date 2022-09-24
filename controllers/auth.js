import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Registration
export const register = async (req, res) => {
    try {
        const { login, password, name, telegram, instagram } = req.body;

        const lUsed = await User.findOne( { login } );

        if (lUsed) {
            return res.json({
                message: 'Данный логин уже занят.',
                status: 'error',
            });
        }

        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(15));

        const user = new User({
            login,
            password: hashedPassword,
            name,
            telegram,
            instagram,
        });

        await user.save();

        const jwtoken = jwt.sign({
            id: user._id
        }, process.env.JWT, { expiresIn: '2d'} );

        res.json({
            user,
            jwtoken,
            message: 'Вы успешно зарегистрировались.',
            status: 'success',
        });
    } catch (error) {
        return res.json({
            message: 'Ошибка при создании пользователя.',
            status: 'error',
        });
    }
};

export const authorize = async (req, res) => {
    try {
        const { login, password } = req.body;

        const user = await User.findOne( { login } );
        const pass = await bcrypt.compare(password, user.password);

        if (!pass) {
            return res.json({
                message: 'Неверный пароль.',
                status: 'error',
            });
        }

        const jwtoken = jwt.sign({
            id: user._id
        }, process.env.JWT, { expiresIn: '2d'} );

        res.json({
            jwtoken,
            user,
            message: 'Вы успешно вошли.',
            status: 'success',
        });
    } catch (error) {
        return res.json({
            message: 'Ошибка при авторизации.',
            status: 'error',
        })
    }
};

export const logIn = async (req, res) => {
    try {
        const user = await User.findById(req.userid);

        if (!user) {
            return res.json({
                message: 'Такого пользователя не существует.',
                status: 'error',
            });
        }

        const jwtoken = jwt.sign({
            id: user._id
        }, process.env.JWT, { expiresIn: '2d' });

        res.json({
            user,
            jwtoken,
        });
    } catch (error) {
        return res.json({
            message: 'Нет доступа.',
            status: 'error',
        });
    }
};