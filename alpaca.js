const API_URL = "https://a-l-p-a-c-njdunpqxk-amitheais-projects.vercel.app/api/alpaca";

async function sendMessage(userMsg) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMsg }),
    });

    if (!res.ok) {
      // Not a 2xx response, show error text
      const errorText = await res.text();
      appendMessage("ERROR", `API call failed: ${res.status} ${res.statusText}\n${errorText}`);
      return;
    }

    let data;
    try {
      data = await res.json();
    } catch (jsonErr) {
      const errorText = await res.text();
      appendMessage("ERROR", `API call failed: Invalid JSON response.\n${errorText}`);
      return;
    }

    if (data.reply) {
      appendMessage("ALPACA", data.reply);
    } else if (data.error) {
      appendMessage("ERROR", `API error: ${data.error}`);
    } else {
      appendMessage("ERROR", "API call succeeded but no reply or error in response.");
    }
  } catch (err) {
    appendMessage("ERROR", `API call failed: ${err.message}`);
  }
}
