import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import CryptoJS from "crypto-js";

import Cors from "cors";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD", "POST"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req: any, res: any, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

// initialte action / response when hitting API route
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);

  if (req.method) {
    return await getTest(req, res);
  }

  return res
    .status(405)
    .json({ message: "Method not allowed", success: false });
}

var reqJson = {
  EndDate: "20230110",
  PerCount: 3,
  DepFilter: "",
};

// get question from DB
const getTest = async (req: NextApiRequest, res: NextApiResponse) => {
  // // // //
  var ApiId = "5766161d-0102-40fe-89b2-54b277c0dbca";
  var ApiKey = "uzIPpttKPk5MdokWAATf2rNt0/9xsyUvVXtaGS8G5O0=";
  function pad2(n: number) {
    return n > 9 ? "" + n : "0" + n;
  }
  function getTimestamp() {
    var d = new Date();
    var yyyy = d.getFullYear();
    var MM = pad2(d.getMonth() + 1);
    var dd = pad2(d.getDate());
    var HH = pad2(d.getHours());
    var mm = pad2(d.getMinutes());
    var ss = pad2(d.getSeconds());
    return yyyy + MM + dd + HH + mm + ss;
  }
  var timestamp = getTimestamp();
  var dataString = ApiId + timestamp + JSON.stringify(reqJson);
  var hash = CryptoJS.HmacSHA256(dataString, ApiKey);
  var signature = CryptoJS.enc.Base64.stringify(hash);

  var url =
    "https://program.360ksiegowosc.pl/api/v1/getprofitrep" +
    "?ApiId=" +
    ApiId +
    "&timestamp=" +
    timestamp +
    "&signature=" +
    signature;

  fetch("https://restcountries.com/v3.1/name/Poland").then((res) => {
    console.log(res);
  });

  res.status(200).send(data.Data);
  return data.Data;
};
