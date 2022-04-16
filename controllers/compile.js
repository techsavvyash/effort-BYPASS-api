const request = require("request");
const { compileCode } = require("../config/judge");
const { response } = require("../routes/comment");

exports.postCompileReq = async (req, res, next) => {
  const { code, input, timeLimit } = req.body;

  if (!code || !input || !timeLimit) {
    res.send({ message: "Invalid Request", status: false }).status(403);
    return;
  }

  try {
    request(
      {
        url: `${process.env.SPOJ_COMPILER_ENDPOINT}/submissions?access_token=${process.env.SPOJ_COMPILER_ACCESS_TOKEN}`,
        method: "POST",
        form: {
          source: code,
          compilerId: 44,
          timeLimit: timeLimit,
          input: input,
        },
      },
      (err, response, body) => {
        if (err) {
          console.log("Connection Problem: ", err);
          throw new Error("Error during submission call: ", err);
        }
        if (response) {
          console.log("body in compile code: ", response.body);
          res
            .send({ message: JSON.parse(response.body).id, status: true })
            .status(200);
          return res;
        }
      }
    );
  } catch (err) {
    console.log("Error: ", err);
    res.send({ message: "Internal Server Error", status: false }).status(500);
  }
};

exports.getCompiledOutput = async (req, res, next) => {
  const submissionId = req.params.id;
  console.log("submission id: ", submissionId);
  if (!submissionId) {
    res.status(403).send({ message: "Invalid request", status: false });
    return;
  }
  try {
    request(
      {
        method: "GET",
        url: `${process.env.SPOJ_COMPILER_ENDPOINT}/submissions/${submissionId}?access_token=${process.env.SPOJ_COMPILER_ACCESS_TOKEN}`,
      },
      (err, response, body) => {
        if (err) {
          console.log("Error:", err);
          throw new Error("Error while getting execution status ", err);
        }

        if (response) {
          const body = JSON.parse(response.body);
          if (!body.executing) {
            if (body.result.status.code === 15) {
              request(
                {
                  method: "GET",
                  url: `${process.env.SPOJ_COMPILER_ENDPOINT}/submissions/${submissionId}/output?access_token=${process.env.SPOJ_COMPILER_ACCESS_TOKEN}`,
                },
                (err, output_response, body) => {
                  if (err) {
                    throw new Error(
                      "Error while fetching output stream: ",
                      err
                    );
                  }

                  if (output_response) {
                    //   const output = JSON.parse(output_response.body);
                    res
                      .send({ message: output_response, status: true })
                      .status(200);
                  }
                }
              );
            } else {
              switch (body.result.status.code) {
                case 11:
                  res
                    .send({ message: "Compilation Error", status: true })
                    .status(200);
                  break;
                case 12:
                  res
                    .send({ message: "RunTime Error", status: true })
                    .status(200);
                  break;
                case 13:
                  res.send({ message: "TLE", status: true }).status(200);
                  break;

                case 17:
                  res
                    .send({ message: "Memory Limit Exceeded", status: true })
                    .status(200);
                  break;
                case 19:
                  res
                    .send({ message: "Illegal System Call", status: true })
                    .status(200);
                  break;
                case 20:
                  res
                    .send({ message: "Internal Error", status: true })
                    .status(200);
                  break;
              }

              return;
            }
          } else {
            res.send({ message: 0, status: false }).status(200);
          }
        }
      }
    );
  } catch (err) {
    console.log("Error: ", err);
    res.send({ message: "Internal Server Error", status: false }).status(500);
  }
};
