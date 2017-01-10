// Error handler
export default (err, req, rsp, next) => {
  // log the error, for now just console.log
  console.log(err);
  rsp.status(500).send('Something broke!');
  next();
};
