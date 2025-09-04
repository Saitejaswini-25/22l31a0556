const axios = require("axios");

const CLIENT_ID = "8d8ea9c0-04ed-41b8-a786-ebf559c9d0f7";
const CLIENT_SECRET = "UkrvVjJtzTDUGSTY";


const USER_EMAIL = "saitejaswinigorantla@gmail.com";
const USER_NAME = "Sai Tejaswini";
const USER_ROLLNO = "22l31a0556";
const USER_ACCESSCODE = "YzuJeU";
const USER_MOBILE = "9100100649";
const USER_GITHUB = "saitejaswini-25";

let token = null;

async function getToken() {
  try {
    const response = await axios.post("http://20.244.56.144/evaluation-service/auth", {
      email: USER_EMAIL,
      name: USER_NAME,
      mobileNo: USER_MOBILE,
      githubUsername: USER_GITHUB,
      rollNo: USER_ROLLNO,
      accessCode: USER_ACCESSCODE,
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    });

    token = response.data.access_token;
    console.log("✅ Token fetched successfully");
    return token;
  } catch (error) {
    console.error("❌ Failed to get token:", error.response?.data || error.message);
    return null;
  }
}

async function sendLog(stack, level, packageName, message) {
  if (!token) {
    console.warn("⚠️ No token yet, fetching...");
    await getToken();
    if (!token) return;
  }

  const validBackend = ["database", "handler", "service", "express", "validation"];
  const validFrontend = ["api", "component", "hook", "page", "util"];

  if (
    (stack === "backend" && !validBackend.includes(packageName)) ||
    (stack === "frontend" && !validFrontend.includes(packageName))
  ) {
    console.error(`❌ Invalid package '${packageName}' for stack '${stack}'`);
    return;
  }

  try {
    const response = await axios.post(
      "http://20.244.56.144/evaluation-service/logs",
      {
        stack,
        level,
        package: packageName,
        message,
        timestamp: new Date().toISOString(),
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log("✅ Log sent:", response.data);
  } catch (error) {
    console.error("❌ Logging failed:", error.response?.data || error.message);
  }
}


function loggingMiddleware(req, res, next) {
  sendLog("backend", "info", "express", `Request: ${req.method} ${req.url}`);
  next();
}

(async () => {
  await getToken();
  await sendLog("backend", "info", "service", "Hello Teju! This is your test log 🚀");
})();

module.exports = {
  getToken,
  sendLog,
  loggingMiddleware,
};
