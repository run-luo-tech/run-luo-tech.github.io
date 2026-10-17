(() => {
  const strings = [...document.querySelectorAll('[data-en]')].map(element => ({element, zh: element.innerHTML, en: element.dataset.en}));
  const languageButton = document.querySelector('#language');
  let english = false;
  languageButton.addEventListener('click', () => {
    english = !english;
    document.documentElement.lang = english ? 'en' : 'zh-CN';
    strings.forEach(({element, zh, en}) => { if (english) element.textContent = en; else element.innerHTML = zh; });
    languageButton.textContent = english ? '中' : 'EN';
    languageButton.setAttribute('aria-label', english ? '切换为中文' : 'Switch to English');
    document.title = english ? 'Larry-Tech — Small ideas. Made real.' : 'Larry-Tech — 把想法做成作品';
    updateScreenshotAlt();
  });
  const image = document.querySelector('#gallery-image');
  const buttons = [...document.querySelectorAll('[data-image]')];
  const captions = {
    'assets/musica-answer.png': ['Musica 揭晓答案界面：突出显示歌曲名和歌手', 'Musica answer screen with a prominent song title and artist'],
    'assets/musica-question.png': ['Musica 出题界面：揭晓前只显示歌曲编号', 'Musica question screen showing only a song ID before the reveal'],
    'assets/musica-import.png': ['Musica 批量导入界面：从 MP3 文件名提取歌手和歌曲名', 'Musica import preview extracting artist names and song titles from filenames']
  };
  function updateScreenshotAlt() { image.alt = captions[image.getAttribute('src')][english ? 1 : 0]; }
  buttons.forEach(button => button.addEventListener('click', () => {
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    image.src = button.dataset.image;
    updateScreenshotAlt();
  }));
})();
