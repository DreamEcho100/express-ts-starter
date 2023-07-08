import { config } from 'dotenv';
import { z } from 'zod';

config();

const serverConfig = {
	PORT: z.string().parse(process.env.PORT),
	FRONTEND_URL: z.string().parse(process.env.FRONTEND_URL),
};

export default serverConfig;
