document.getElementById("fixBtn").addEventListener("click", fixMessage);

async function fixMessage() {
  const input = document.getElementById('input').value.trim();
  const tone = document.getElementById('tone').value;
  const output = document.getElementById('output');

  if (!input) {
    output.innerText = "❗ Please enter some text to translate.";
    return;
  }

  output.innerText = "⏳ Translating... Please wait.";

  try {
    // Send request to your Vercel backend API
    const response = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: input,
        source: "ur",
        target: "en"
      })
    });

    if (!response.ok) {
      throw new Error("Translation API error");
    }

    const data = await response.json();
    let text = data.translatedText;

    // Tone modifications
    if (tone === "polite") {
      text = "Kindly note: " + text;
    } else if (tone === "friendly") {
      text = "Hey there! " + text;
    } else if (tone === "apologetic") {
      text = "I'm really sorry, but " + text;
    }

    output.innerText = text;

  } catch (err) {
    console.error(err);
    output.innerText = "❌ Translation failed. Please try again.";
  }
}
