import { config } from 'dotenv';
import { z } from 'zod';

config();

const serverConfig = {
	PORT: z.string().parse(process.env.PORT),
	FRONTEND_URL: z.string().parse(process.env.FRONTEND_URL),
	NODE_ENV: z.enum(['production', 'development']).parse(process.env.NODE_ENV),
};

export default serverConfig;
