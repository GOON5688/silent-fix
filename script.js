document.getElementById("fixBtn").addEventListener("click", fixMessage);

async function fixMessage() {
  const input = document.getElementById('input').value.trim();
  const tone = document.getElementById('tone').value;
  const output = document.getElementById('output');

  if (!input) {
    output.innerText = "Please enter some text.";
    return;
  }

  try {
    const translateRes = await fetch("https://translate.terraprint.co/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: input,
        source: "ur",
        target: "en",
        format: "text"
      })
    });

    const translated = await translateRes.json();
    let text = translated.translatedText;

    if (tone === "polite") {
      text = "Kindly note: " + text;
    } else if (tone === "friendly") {
      text = "Hey there! " + text;
    } else if (tone === "apologetic") {
      text = "I'm really sorry, but " + text;
    }

    output.innerText = text;

  } catch (err) {
    output.innerText = "Something went wrong. Try again.";
    console.error(err);
  }
}
