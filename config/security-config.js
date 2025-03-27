import helmet from "helmet";

const setupSecurity = (app) => {
    app.use(helmet({
        contentSecurityPolicy: false, 
        crossOriginEmbedderPolicy: false 
    }));
};

export default setupSecurity;