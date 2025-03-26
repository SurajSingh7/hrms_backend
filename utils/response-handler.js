import { validationResult } from "express-validator";

class ResponseHandler {

    static handleValidationErrors = (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
    };
    
    static success(res, message, data = null, pagination, statusCode = 200) {
        return res.status(statusCode).json({
            success: true,
            message,
            data,
            pagination
        });
    }

    static error(res, message, statusCode = 500) {
        return res.status(statusCode).json({
            success: false,
            message,
        });
    }
}

export default ResponseHandler;
