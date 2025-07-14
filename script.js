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
