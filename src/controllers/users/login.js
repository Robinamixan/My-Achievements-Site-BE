const jwtManager = require('../../services/jwt-token-manager');
const passwordManager = require('../../services/password-manager');

const AppError = require('../../errors/app-error');
const User = require('../../models/user');

module.exports = async (request, response, next) => {
    try {
        const user = await User.findOne({email: request.body.email});
        assetUserExist(user);
        await assertEqualPasswords(user, request.body.password);

        const token = jwtManager.createToken({
            email: user.email,
            userId: user._id.toString(),
        });

        response.status(200).json({
            token: token,
            userId: user._id.toString(),
        });
    } catch (error) {
        next(error);
    }
};

const assetUserExist = (user) => {
    if (!user) {
        throw new AppError('User was not found.', 403);
    }
};

const assertEqualPasswords = async (user, requestPassword) => {
    const isEqualPassword = await passwordManager.compare(requestPassword, user.password);
    if (!isEqualPassword) {
        throw new AppError('Authentication failed.', 403);
    }
};
