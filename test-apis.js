const http = require("http");

const BASE = "https://superknee-backend.onrender.com";
const TIMESTAMP = Date.now();
const TEST_EMAIL = `testapi${TIMESTAMP}@superknee.com`;

function makeRequest(method, path, body) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method,
      headers: { "Content-Type": "application/json" },
    };

    const req = http.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on("error", (err) => reject(err));
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function runTests() {
  console.log("=".repeat(60));
  console.log("  SUPERKNEE BACKEND API TEST");
  console.log("=".repeat(60));

  // 1. GET / — Health check
  console.log("\n--- TEST 1: GET / (Health Check) ---");
  try {
    const res = await makeRequest("GET", "/");
    console.log(`Status: ${res.status}`);
    console.log(`Response: ${JSON.stringify(res.body)}`);
    console.log(res.status === 200 ? "✓ PASS" : "✗ FAIL");
  } catch (err) {
    console.log(`✗ FAIL: ${err.message}`);
  }

  // 2. POST /api/auth/register — Register new user
  console.log("\n--- TEST 2: POST /api/auth/register (Register User) ---");
  try {
    const res = await makeRequest("POST", "/api/auth/register", {
      name: "Test User",
      email: TEST_EMAIL,
      password: "Test@12345",
      role: "user",
    });
    console.log(`Status: ${res.status}`);
    console.log(`Response: ${JSON.stringify(res.body, null, 2)}`);
    console.log(res.status === 201 ? "✓ PASS" : res.status === 400 ? "✓ PASS (user already exists)" : "✗ FAIL");
  } catch (err) {
    console.log(`✗ FAIL: ${err.message}`);
  }

  // 3. POST /api/auth/register — Duplicate registration (should fail with 400)
  console.log("\n--- TEST 3: POST /api/auth/register (Duplicate - should be 400) ---");
  try {
    const res = await makeRequest("POST", "/api/auth/register", {
      name: "Test User",
      email: TEST_EMAIL,
      password: "Test@12345",
      role: "user",
    });
    console.log(`Status: ${res.status}`);
    console.log(`Response: ${JSON.stringify(res.body)}`);
    console.log(res.status === 400 ? "✓ PASS (correctly rejected duplicate)" : "✗ FAIL");
  } catch (err) {
    console.log(`✗ FAIL: ${err.message}`);
  }

  // 4. POST /api/auth/login — Login with correct credentials
  console.log("\n--- TEST 4: POST /api/auth/login (Valid Login) ---");
  try {
    const res = await makeRequest("POST", "/api/auth/login", {
      email: TEST_EMAIL,
      password: "Test@12345",
    });
    console.log(`Status: ${res.status}`);
    console.log(`Response: ${JSON.stringify(res.body, null, 2)}`);
    console.log(res.status === 200 && res.body.token ? "✓ PASS" : "✗ FAIL");
  } catch (err) {
    console.log(`✗ FAIL: ${err.message}`);
  }

  // 5. POST /api/auth/login — Login with wrong password
  console.log("\n--- TEST 5: POST /api/auth/login (Invalid Password) ---");
  try {
    const res = await makeRequest("POST", "/api/auth/login", {
      email: TEST_EMAIL,
      password: "wrongpassword",
    });
    console.log(`Status: ${res.status}`);
    console.log(`Response: ${JSON.stringify(res.body)}`);
    console.log(res.status === 400 ? "✓ PASS (correctly rejected)" : "✗ FAIL");
  } catch (err) {
    console.log(`✗ FAIL: ${err.message}`);
  }

  // 6. POST /api/auth/login — Login with non-existent email
  console.log("\n--- TEST 6: POST /api/auth/login (Non-existent Email) ---");
  try {
    const res = await makeRequest("POST", "/api/auth/login", {
      email: "nonexistent@superknee.com",
      password: "Test@12345",
    });
    console.log(`Status: ${res.status}`);
    console.log(`Response: ${JSON.stringify(res.body)}`);
    console.log(res.status === 400 ? "✓ PASS (correctly rejected)" : "✗ FAIL");
  } catch (err) {
    console.log(`✗ FAIL: ${err.message}`);
  }

  // 7. GET /api/dashboard/stats — Dashboard stats
  console.log("\n--- TEST 7: GET /api/dashboard/stats (Dashboard Stats) ---");
  try {
    const res = await makeRequest("GET", "/api/dashboard/stats");
    console.log(`Status: ${res.status}`);
    console.log(`Response: ${JSON.stringify(res.body, null, 2)}`);
    const b = res.body;
    const hasExpectedFields =
      "totalOrders" in b && "totalProducts" in b && "customers" in b && "revenue" in b && "recentOrders" in b;
    console.log(res.status === 200 && hasExpectedFields ? "✓ PASS" : "✗ FAIL");
  } catch (err) {
    console.log(`✗ FAIL: ${err.message}`);
  }

  console.log("\n" + "=".repeat(60));
  console.log("  ALL TESTS COMPLETED");
  console.log("=".repeat(60));
}

runTests();
