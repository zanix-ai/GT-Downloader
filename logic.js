document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const log = document.querySelector(".log");

  // Auto-fill PAT kalau ada di localStorage
  const savedPAT = localStorage.getItem("github_pat");
  if (savedPAT) {
    document.querySelector('input[name="pat"]').value = savedPAT;
    log.textContent = "🔐 PAT loaded from browser";
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const url = form.url.value.trim();
    const pat = form.pat.value.trim();
    const filename = form.filename.value.trim();
    const fileext = form.fileext.value.trim();
    const pin = form.pin.value.trim();

    if (!url || !pat || !pin) {
      log.textContent = "❌ URL, PAT, dan PIN wajib diisi!";
      return;
    }

    // Simpan PAT ke localStorage
    localStorage.setItem("github_pat", pat);

    log.textContent = "⏳ Mengirim ke GitHub Actions...";

    const res = await fetch("https://api.github.com/repos/zanix-ai/GT-Downloader/actions/workflows/kirim.yml/dispatches", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${pat}`,
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28"
      },
      body: JSON.stringify({
        ref: "main",
        inputs: {
          url,
          pin,
          filename,
          fileext
        }
      })
    });

    if (res.ok) {
      log.textContent = "✅ Terkirim ke GitHub Actions. Cek log-nya ya!";
    } else {
      const msg = await res.json().catch(() => ({}));
      log.textContent = `❌ Gagal (${res.status}): ${msg.message || "Unknown error"}`;
    }
  });
});
