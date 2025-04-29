export const errorMiddleware = (err, req, res, next) => {
  console.error('[ERRO INTERNO]', err.stack);
  res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
};
