import Password from '../models/Password.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const createPassword = async (req, res) => {
    try {
        const { name, url, username, password } = req.body;
        const user = await User.findById(req.userid);

        const hash = jwt.sign({
            password: password,
        }, process.env.JWT);

        const newPass = new Password({
            userId: req.userid,
            login: user.login,
            name,
            url,
            username,
            password: hash,
        },);

        await newPass.save();
        await User.findByIdAndUpdate(req.userid, {
            $push: { passwords: newPass },
        });

        return res.json({
            newPass,
            message: 'Пароль успешно добавлен.',
            status: 'success',
        });
    } catch (error) {
        return res.json({
            message: 'Ошибка при добавлении пароля.',
            status: 'error',
        });
    }
};

export const getPasswords = async (req, res) => {
    try {
        const user = await User.findById(req.userid);
        const list = await Promise.all(
            user.passwords.map(password => {
                return Password.findById(password._id);
            }),
        );

        return res.json(list);
    } catch (error) {
        return res.json({
            message: 'Что-то пошло не так...',
            status: 'error',
        });
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.userid);
        
        if (!user) {
            return res.json({
                message: 'Пользователь не найден.',
                status: 'error',
            });
        }

        return res.json({
            name: user.name,
            tg: user.telegram,
            ig: user.instagram,
        });
    } catch (error) {
        return res.json({
            message: 'Что-то пошло не так...',
            status: 'error',
        });
    }
};

export const updatePassword = async (req, res) => {
    try {
        const { name, url, username, password, id } = req.body;
        const pass = await Password.findById(id);

        if (!pass) {
            return res.json({
                message: 'Такого пароля не существует.',
                status: 'error',
            })
        }

        const hash = jwt.sign({
            password: password,
        }, process.env.JWT);

        pass.name = name;
        pass.url = url;
        pass.username = username;
        pass.password = hash;

        await pass.save();

        return res.json({
            pass,
            message: 'Пароль успешно обновлён.',
            status: 'success',
        });
    } catch (error) {
        return res.json({
            message: 'Ошибка при обновлении пароля.',
            status: 'error',
        });
    }
};

export const deletePassword = async (req, res) => {
    try {
        const { id } = req.body;
        console.log(req.body);
        console.log( id );
        const pass = await Password.findByIdAndDelete(id);

        if (!pass) {
            return res.json({
                message: 'Такого пароля не существует.',
                status: 'error',
            });
        }

        await User.findByIdAndUpdate(req.userid, {
            $pull: { passwords: id },
        });

        return res.json({
            message: 'Пароль успешно удалён.',
            status: 'success',
        });
    } catch (error) {
        return res.json({
            message: 'Ошибка при удалении пароля.',
            startus: 'error',
        });
    }
};