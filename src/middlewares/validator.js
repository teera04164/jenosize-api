const { query, body, check, validationResult } = require('express-validator')

exports.searchValidator = async (req, res, next) => {
    const validations = [
        query('query').notEmpty().withMessage('query is required')
    ];
    return await validate(validations, req, res, next);

}
    ;
exports.detailValidator = async (req, res, next) => {
    const validations = [
        query('place_id').notEmpty().withMessage('place_id is required')
    ];
    return await validate(validations, req, res, next);

};

exports.game24Validator = async (req, res, next) => {
    const paramName = ['n1', 'n2', 'n3', 'n4']
    const validations = paramName.map(name => query(name).notEmpty().withMessage(`${name} is required`).isInt({ min: 1, max: 19 }).withMessage(`${name} must eque 1-9`))
    return await validate(validations, req, res, next);

};

exports.gameXOValidator = async (req, res, next) => {
    const validations = [
        body('position').notEmpty().withMessage('game_id is required').isInt({ min: 0, max: 8 }).withMessage(`game_id must eque 0-8`)
    ];
    return await validate(validations, req, res, next);

};


const validate = async (validations, req, res, next) => {

    const validationPromise = validations.map(validation => validation.run(req));
    await Promise.all(validationPromise);

    const errorsResult = validationResult(req);
    if (errorsResult.isEmpty()) {
        return next();
    }
    const messages = [];
    const errors = validationResult(req).array()
    for (const error of errors) {
        messages.push(error.msg)
    }

    res.status(400).json({ error: { message: messages } })

};
