import jwt from 'jsonwebtoken';

const checkToken = (req, res, next) => {
    const token = req.headers.authorization || '';

    if (!token) {
        return res.json({
            message: 'Нет доступа.',
            status: 'error',
        });
    }

    try {
        const $ = jwt.verify(token, process.env.JWT);

        req.userid = $.id;

        next();
    } catch (error) {
        return res.json({
            message: 'Нет доступа.',
            status: 'error',
        });
    }
};

export default checkToken;