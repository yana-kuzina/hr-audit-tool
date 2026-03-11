const GSHEET_URL = process.env.GSHEET_URL;

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  try {
    if (event.httpMethod === "OPTIONS") {
      return { statusCode: 200, headers, body: "" };
    }

    if (event.httpMethod === "GET") {
      const res = await fetch(GSHEET_URL, {
        redirect: "follow",
        headers: { "User-Agent": "Mozilla/5.0" }
      });
      const text = await res.text();
      // Перевіряємо чи це JSON
      try {
        const data = JSON.parse(text);
        return { statusCode: 200, headers, body: JSON.stringify(data) };
      } catch (e) {
        return { statusCode: 200, headers, body: JSON.stringify({ status: "ok", data: {} }) };
      }
    }

    if (event.httpMethod === "POST") {
      const payload = JSON.parse(event.body);
      const url = GSHEET_URL + "?data=" + encodeURIComponent(JSON.stringify(payload));
      const res = await fetch(url, {
        redirect: "follow",
        headers: { "User-Agent": "Mozilla/5.0" }
      });
      const text = await res.text();
      try {
        const data = JSON.parse(text);
        return { statusCode: 200, headers, body: JSON.stringify(data) };
      } catch (e) {
        return { statusCode: 200, headers, body: JSON.stringify({ status: "ok" }) };
      }
    }

    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) };
  }
};
