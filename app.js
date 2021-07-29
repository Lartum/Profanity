require("dotenv").config();
var fs = require("fs");
const chalk = require("chalk");
const { google } = require("googleapis");

const danger = (word) => {
  let number = +word * 100;
  return chalk.red(number.toFixed(2));
};

const warning = (word) => {
  let number = +word * 100;
  return chalk.keyword("orange")(number.toFixed(2));
};

const fishy = (word) => {
  let number = +word * 100;
  return chalk.yellowBright(number.toFixed(2));
};

const safe = (word) => {
  let number = +word * 100;
  return chalk.greenBright(number.toFixed(2));
};

const common = (word) => {
  return chalk.blueBright(word);
};

try {
  var data = fs.readFileSync("file.txt", "utf8");
  const sentences = data
    .toString()
    .split(".")
    .filter((sentence) => sentence.length > 0)
    .map((sentence) => sentence.trim());
  // return console.log(sentences);
  sentences.map((sentence) => {
    google
      .discoverAPI(process.env.DISCOVERY_URL)
      .then((client) => {
        const analyzeRequest = {
          comment: {
            text: sentence,
          },
          requestedAttributes: {
            TOXICITY: {},
          },
        };

        client.comments.analyze(
          {
            key: process.env.GCP_API_KEY,
            resource: analyzeRequest,
          },
          (err, response) => {
            if (err) throw err;
            const data = response.data;
            const { attributeScores } = data;

            if (attributeScores.TOXICITY.summaryScore.value > 0.7) {
              process.stdout.write(
                common(
                  "The sentence " +
                    chalk.whiteBright(sentence) +
                    " Toxicity level is high: "
                ) +
                  danger(attributeScores.TOXICITY.summaryScore.value) +
                  "%!" +
                  "\n"
              );
            } else if (attributeScores.TOXICITY.summaryScore.value > 0.5) {
              process.stdout.write(
                common(
                  "The sentence " +
                    chalk.whiteBright(sentence) +
                    " has toxicity: "
                ) +
                  warning(attributeScores.TOXICITY.summaryScore.value) +
                  "% " +
                  "\n"
              );
            } else if (attributeScores.TOXICITY.summaryScore.value > 0.4) {
              process.stdout.write(
                common(
                  "The sentence " +
                    chalk.whiteBright(sentence) +
                    " has toxicity: "
                ) +
                  fishy(attributeScores.TOXICITY.summaryScore) +
                  "% " +
                  "\n"
              );
            } else {
              process.stdout.write(
                common(
                  "The sentence " + chalk.whiteBright(sentence) + " is safe: "
                ) +
                  safe(attributeScores.TOXICITY.summaryScore.value) +
                  "%" +
                  "\n"
              );
            }
          }
        );
      })
      .catch((err) => {
        throw err;
      });
  });
} catch (e) {
  console.log("Error:", e.stack);
}
