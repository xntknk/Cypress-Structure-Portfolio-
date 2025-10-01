const { defineConfig } = require("cypress");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

function loadJson(file) {
  const p = path.resolve(file);
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf8")) : {};
}

function loadDotenv(mode) {
  const p = path.resolve(`.env.${mode}`);
  if (fs.existsSync(p)) {
    dotenv.config({ path: p });
  } else {
    dotenv.config(); // fallback ไปใช้ .env ปกติ
  }
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // เลือก environment จาก --env configFile=<dev|staging>
      const mode = config.env.configFile || "dev";

      // 1) โหลด dotenv ตาม env
      loadDotenv(mode);

      // 2) โหลด cypress.env.<mode>.json
      const perEnv = loadJson(`cypress.env.${mode}.json`);
      config.env = { ...config.env, ...perEnv };

      // 3) ตั้ง baseUrl
      switch (mode) {
        case "staging":
          config.baseUrl = "https://opensource-demo.orangehrmlive.com/web/index.php"; // ลิ้ง staging ถ้ามี
          break;
        default:
          config.baseUrl = "https://opensource-demo.orangehrmlive.com/web/index.php";
      }

      // 4) ใส่ secret จาก dotenv
      config.env.ADMIN_USERNAME = process.env.ADMIN_USERNAME;
      config.env.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
      config.env.USER_USERNAME = process.env.USER_USERNAME;
      config.env.USER_PASSWORD = process.env.USER_PASSWORD;
      config.env.USER_EMAIL = process.env.USER_EMAIL;

      // 5) เลือก fixture ตาม env
      config.env.fixtureFile =
        mode === "staging" ? "userData.staging.json" : "userData.dev.json";

      return config;
    },
    baseUrl: "https://opensource-demo.orangehrmlive.com/web/index.php", // default
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    video: false,
  },
});
