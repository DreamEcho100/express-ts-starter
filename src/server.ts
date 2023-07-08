import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import serverConfig from '~/utils/config';

const PORT = serverConfig.PORT;

const app = express();

app.use(
	helmet({
		referrerPolicy: { policy: 'same-origin' },
	}),
);
app.use(
	cors({
		origin: serverConfig.FRONTEND_URL, // Replace with the URL of your frontend application
		credentials: true,
	}),
);

app.get('/', (req, res) => {
	res.send('Hello world!');
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
