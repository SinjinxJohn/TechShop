"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkforAuthCookie = void 0;
const auth_1 = require("../Services/auth");
function checkforAuthCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        if (!tokenCookieValue) {
            return next();
        }
        try {
            const userPayload = (0, auth_1.validateToken)(tokenCookieValue);
            req.user = userPayload;
            return next();
        }
        catch (error) {
            // Handle token validation error
            console.error('Token validation error:', error);
            // Depending on your requirements, you might want to send a response to the client
            // For example, you could clear the invalid cookie and proceed
            res.clearCookie(cookieName);
            return next();
        }
    };
}
exports.checkforAuthCookie = checkforAuthCookie;
//# sourceMappingURL=authhelper.js.map