import app from './app';

const port = process.env.SERVER_PORT ?? 3000;

app.listen(port, () => {
  console.log(`O servidor foi iniciado na porta ${port}`);
});
