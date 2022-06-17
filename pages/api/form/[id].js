import fs from "fs";

export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    fs.readFile(`data/form${id}.json`, "utf8", (err, data) => {
      res.status(200).send(JSON.parse(data));
    });
  }

  if (req.method === "POST") {
    const uid = Date.now();
    const body = JSON.parse(req.body);
    console.log(body);
    const data = { uid, values: body };

    res.status(201).send(data);
  }
}
