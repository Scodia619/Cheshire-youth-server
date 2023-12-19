exports.customErrors = (err, req, res, next) => {
    console.log(err.code)
    if (err.status && err.msg) {
      res.status(err.status).send({ msg: err.msg });
    } else next(err);
  };

  exports.prismaErrors = (err, req, res, next) => {
    if (err.code === 'P2003') res.status(400).send({ msg: "Bad Request - Data Needed or Topic / Commission doesnt exist" })
    next(err);
  };