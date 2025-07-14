async function fixMessage() {
  const input = document.getElementById('input').value;
  const tone = document.getElementById('tone').value;

  // 1. Translate Urdu to English using LibreTranslate
  const translateRes = await fetch("https://libretranslate.de/translate", {
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

  // 2. Apply tone rewriter
  if (tone === "polite") {
    text = text.replace("you", "sir/madam").replace("can", "would you mind");
  }
  if (tone === "friendly") {
    text = "Hey! " + text;
  }
  if (tone === "apologetic") {
    text = "I'm really sorry, but " + text;
  }

  document.getElementById("output").innerText = text;
}
<script src="script.js"></script>

