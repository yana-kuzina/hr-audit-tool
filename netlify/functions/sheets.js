const GSHEET_URL = "https://script.google.com/macros/s/AKfycbwNvC5PlszCs3zmDkaNk8PVqRjc1KC7VsCpn4W3s4i3TBeNdke9F0iYl-ytpcjUPwKc/exec";

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  try {
    if (event.httpMethod === "GET") {
      const res = await fetch(GSHEET_URL);
      const data = await res.json();
      return { statusCode: 200, headers, body: JSON.stringify(data) };
    }

    if (event.httpMethod === "POST") {
      const url = GSHEET_URL + "?data=" + encodeURIComponent(event.body);
      const res = await fetch(url);
      const data = await res.json();
      return { statusCode: 200, headers, body: JSON.stringify(data) };
    }

    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) };
  }
};
