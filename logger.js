const logger =(req,res, next) => {
    console.log(`the url is ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
   }

module.exports = logger;