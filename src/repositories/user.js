const User = require('../models/user');
const {DESC} = require('../enums/sort-order');

/**
 * @returns {?number}
 */
module.exports.getTotalCount = async () => {
    return User.countDocuments();
};

/**
 * @returns {?User[]}
 */
module.exports.find = async (page, itemsPerPage, order) => {
    let sort = Object.assign({}, ...Object.keys(order).map(field => ({
        [field]: order[field] === DESC ? -1 : 1
    })));

    return User.find()
        .skip((page - 1) * itemsPerPage)
        .limit(itemsPerPage)
        .sort(sort);
};

/**
 * @returns {?User}
 */
module.exports.findOne = async (criteria) => {
    return User.findOne(criteria);
};

/**
 * @returns {?User}
 */
module.exports.findById = async (id) => {
    return User.findById(id);
};

/**
 * @returns {?User}
 */
module.exports.create = async (entityData) => {
    const user = new User({
        email: entityData.email,
        password: entityData.password,
        name: entityData.name,
    });

    return user.save();
};

/**
 * @returns {?User}
 */
module.exports.update = async (user, updateData) => {
    for (const [field, value] of Object.entries(updateData)) {
        user[field] = value;
    }

    return user.save();
};

module.exports.delete = async (id) => {
    await User.findByIdAndDelete(id);
};

module.exports.deleteMany = async (criteria) => {
    await User.deleteMany(criteria);
};