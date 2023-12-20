exports.customErrors = (err, req, res, next) => {
    if (err.status && err.msg) {
      res.status(err.status).send({ msg: err.msg });
    }else next(err);
  };

  exports.prismaErrors = (err, req, res, next) => {
    if (err.code === 'P2003') res.status(400).send({ msg: "Bad Request - Data Needed or Topic / Commission doesnt exist" })
    else if(err.code === 'P2025') res.status(404).send({msg: "No commission found"})
    next(err);
  };