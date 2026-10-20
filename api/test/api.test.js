const assert = require("node:assert/strict");
const { after, before, test } = require("node:test");
const app = require("../server");

let server;
let baseUrl;

before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, () => {
      baseUrl = `http://127.0.0.1:${server.address().port}`;
      resolve();
    });
  });
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

test("health endpoint reports service status", async () => {
  const response = await fetch(`${baseUrl}/api/health`);

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: "ok" });
});

test("catalog endpoints return the current site records", async () => {
  for (const [path, expectedCount] of [
    ["trees", 6],
    ["seeds", 6],
    ["faqs", 6],
  ]) {
    const response = await fetch(`${baseUrl}/api/${path}`);

    assert.equal(response.status, 200);
    assert.equal((await response.json()).length, expectedCount);
  }
});

test("item endpoint returns 404 for unknown IDs", async () => {
  const response = await fetch(`${baseUrl}/api/trees/not-a-tree`);

  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), { error: "Record not found" });
});

test("unknown API routes return JSON 404", async () => {
  const response = await fetch(`${baseUrl}/api/unknown`);

  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), { error: "Route not found" });
});