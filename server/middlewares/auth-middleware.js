const ApiError = require("../exceptions/api-error");
const tokenService = require("../service/token-service");

module.exports = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        
        if (!authorizationHeader) {
            throw new (ApiError.UnathorizatedError());
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            throw new (ApiError.UnathorizatedError());
        }
        
        const userData = tokenService.validateAccessToken(accessToken);
        if(!userData){
            throw new (ApiError.UnathorizatedError());
        }

        // console.log(userData);

        if(!userData.isActivated){
            throw new (ApiError.IsNotActivated());
        }

        req.user = userData;
        next();
    } catch (e) {
        return next(ApiError.UnathorizatedError());
    }
}