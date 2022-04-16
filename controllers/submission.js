const { Axios } = require("axios");

exports.postSubmissions = async (req, res, next) => {
  const { id, questionId, status, code, progLang, submittedBy } = req.body;

  if (!id || !questionId || !status || !code || !progLang || !submittedBy) {
    res.status(500).send({ message: "Invalid request!", status: false });
    return;
  }

  // SPOJ API call here

  Axios({
    method: "POST",
    url: "/shop/products",
    withCredentials: true,
  }).then((res) => {
    setProducts([...res.data.message]);
  });

  try {
  } catch (err) {
    console.log("Error: ", err);
    res.send({ message: "Internal Server Error", status: false }).status(500);
  }
};

exports.getSubmissions = async (req, res, next) => {};
