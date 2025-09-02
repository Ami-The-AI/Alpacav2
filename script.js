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










// frontend/script.js

// Now the backend URL is a relative path since it's served from the same domain
const BACKEND_URL = ''; 

document.getElementById('send-button').addEventListener('click', async () => {
    const promptInput = document.getElementById('prompt-input');
    const prompt = promptInput.value;
    const responseDiv = document.getElementById('ai-response');

    if (!prompt) return;

    responseDiv.textContent = 'Thinking...';

    try {
        const response = await fetch(`${BACKEND_URL}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        responseDiv.textContent = data.message;
    } catch (error) {
        console.error('Error:', error);
        responseDiv.textContent = 'Error: Could not connect to the server.';
    }
});
