let bgmList = [];
let currentIndex = 0;

fetch('bgm.txt')
  .then(res => res.text())
  .then(text => {
    bgmList = text.trim().split('\n').filter(x => x.trim());
    if (bgmList.length) playBGM(currentIndex);
  });

function playBGM(index) {
  if (!bgmList.length) return;
  currentIndex = (index + bgmList.length) % bgmList.length;
  const url = bgmList[currentIndex];

  try {
    const videoId = new URL(url).searchParams.get("v");
    const iframe = document.getElementById("bgmPlayer");
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&controls=0`;
  } catch (e) {
    console.error("Invalid URL:", url);
  }
}

function nextBGM() {
  playBGM(currentIndex + 1);
}

function prevBGM() {
  playBGM(currentIndex - 1);
}
