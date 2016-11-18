/**
 * Created by ray.xie on 11/18/2016.
 */

// Error handler
app.use((err, req, rsp, next) => {
  // log the error, for now just console.log
  console.log(err);
  rsp.status(500).send('Something broke!');
  next();
});