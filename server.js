const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("cross-fetch");

const app = express();
require("dotenv").config();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
  //res.send("hi server");
});

// app.post("/add", (req, res) => {
//   const { a, b } = req.body;
//   res.send({
//     result: parseInt(a) + parseInt(b),
//   });
// });

app.post("/fb", (req, res) => {
  const { interestReq } = req.body;
  console.log("interestReq---> ", interestReq);
  const arrPath = [];
  const products = [];
  const search = interestReq;

  var getSearch = "%22%" + search + "%22";

  var apiUrl = `https://graph.facebook.com/v16.0/search?type=adinterestsuggestion&interest_list=[${getSearch}]&limit=1000000&&locale=th_TH&access_token=${process.env.fb_token}`;

  // var apiUrl = `https://graph.facebook.com/v16.0/search?type=adinterestsuggestion&interest_list=[${getSearch}]&limit=1000000&&locale=th_TH&access_token=EAAFG5m9zJVwBOxWPhTTe0Fjj3LRHCECbuiomZChUP6heViaWmZCCVimV1FZCn42FQy84kgiZA5GwmsLbF4F7xyVGJ5LTPBZAM2nuf35lW2N7ZBAIz84iXj7pZBgNke3epXHjvBkdHZCtXo1xQGRfmEQiz808G2cNYB5hnZAZCVYIZC5iNiQlZBNRQ2jhqZBuA`;

  fetch(apiUrl)
    .then((response) => {
      return response.json();
    })
    .then((interest) => {
      console.log("data from api fb---> ", interest.data);
      //products = interest.data;
      interest.data.forEach((element) => {
        arrPath.push({
          id: element.id,
          name: element.name,
          audience_size: element.audience_size,
          pathA: element.path[0],
          pathB: element.path[1],
          pathC: element.path[2],
        });
      });

      console.log("this.arrPath---> ", arrPath);
      res.send({
        result: "send Ok",
        data: arrPath,
      });
    })
    .catch((err) => {
      // Do something for an error here
      console.log("err---> ", err);
    });

  // res.send({
  //   result: showInterest,
  // });
});

app.listen(5000, () => {
  console.log(`Server is running on port 5000.`);
});
