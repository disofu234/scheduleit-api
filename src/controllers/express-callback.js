module.exports = function expressCallback (controller) {
  return (req, res) => {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params
    };
    
    controller(httpRequest)
      .then(resBody => {
        res.set({
          'Content-Type': 'application/json'
        })
        res.type('json');
        res.status(200).send(resBody);
      })
      .catch(e => {
        console.log(e)
        res.status(400).send({ error: 'An error occurred.' })
      });
  };
};