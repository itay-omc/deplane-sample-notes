// QA sample for Deplane's "deploy from a repository": it shows which of the
// variables from deplane.template.json are set, never their values.
const http = require("http");

const port = Number(process.env.PORT || 3000);

http.createServer((req, res) => {
  if (req.url === "/healthz") {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("ok\n");
    return;
  }
  const lines = [
    "ok: true",
    "secret_key_length: " + (process.env.SECRET_KEY || "").length,
    "db_url: " + (/^postgres(ql)?:\/\//.test(process.env.DB_URL || "") ? "set" : "missing"),
    "database_url: " + (process.env.DATABASE_URL ? "set" : "missing"),
    "public_url: " + (process.env.PUBLIC_URL || "missing"),
  ];
  res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
  res.end(lines.join("\n") + "\n");
}).listen(port, () => console.log("listening on " + port));
