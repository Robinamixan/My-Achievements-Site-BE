const AppError = require('../errors/app-error');
const User = require('../models/user');
const {ROLE_ADMIN} = require('../enums/user-roles');

module.exports = async (request, response, next) => {
  try {
    const userId = request.userId;
    if (!userId) {
      throwAuthorizationError();
    }

    const user = await User.findById(userId);
    if (!user) {
      throwAuthorizationError();
    }

    if (!user.roles.includes(ROLE_ADMIN)) {
      throwAuthorizationError();
    }
  } catch (error) {
    next(error);
  }

  next();
};

const throwAuthorizationError = () => {
  throw new AppError('Authorization failed.', 401);
};