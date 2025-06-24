window.onload = () => {
  const patInput = document.getElementById("pat");
  const savedPAT = localStorage.getItem("pat");
  if (savedPAT) patInput.value = savedPAT;
};

async function kirim() {
  const pin = document.getElementById("pin").value.trim();
  const link = document.getElementById("link").value.trim();
  const filename = document.getElementById("filename").value.trim();
  const ext = document.getElementById("ext").value.trim();
  const pat = document.getElementById("pat").value.trim();
  const status = document.getElementById("status");

  if (!pin || !link || !pat) {
    status.className = "error";
    status.innerText = "⚠️ PIN, Link, dan PAT wajib diisi.";
    return;
  }

  localStorage.setItem("pat", pat);
  status.className = "";
  status.innerText = "⏳ Mengirim...";

  try {
    const res = await fetch("https://api.github.com/repos/zanix-ai/GT-Downloader/actions/workflows/main.yml/dispatches", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + pat,
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
      },
      body: JSON.stringify({
        ref: "main",
        inputs: {
          pin: pin,
          url: link,
          name: filename,
          ext: ext
        }
      })
    });

    const text = await res.text();

    if (res.ok) {
      status.className = "success";
      status.innerText = "✅ Berhasil dikirim ke Telegram!";
    } else {
      status.className = "error";
      status.innerText = `❌ Gagal (${res.status}):\n${text}`;
    }
  } catch (err) {
    status.className = "error";
    status.innerText = `❌ Error: ${err.message}`;
  }
}
