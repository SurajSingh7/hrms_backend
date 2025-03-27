import cors from "cors";

export const corsConfig = cors({
    origin: [
        "https://hradmin.gtel.in",
        "https://portal.gtel.in",
        "http://localhost:3000",
        "https://cp.gtel.in",
        "http://10.253.71.78:3007",
        "https://wabackend.gtel.in",
        "https://roster.gtel.in/"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
});

