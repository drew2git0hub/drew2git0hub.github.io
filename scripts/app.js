const translations = {
  en: {
    title: "Welcome to 'V Tools'!",
    desc: "Click the button below!",
    memo: "Memo",
    camera: "Camera",
    calendar: "Calendar",
    calculator: "Calculator",
    github: "Github profile"
  },
  ko: {
    title: "'V Tools'에 오신 것을 환영합니다!",
    desc: "아래 버튼을 클릭하세요!",
    memo: "메모",
    camera: "카메라",
    calendar: "캘린더",
    calculator: "계산기",
    github: "깃허브 프로필"
  }
};

function setLanguage(lang) {
  document.querySelector('h1').textContent = translations[lang].title;
  document.querySelector('p').textContent = translations[lang].desc;
  const btns = document.querySelectorAll('.nav-button');
  btns[0].textContent = translations[lang].memo;
  btns[1].textContent = translations[lang].camera;
  btns[2].textContent = translations[lang].calendar;
  btns[3].textContent = translations[lang].calculator;
  btns[4].textContent = translations[lang].github;
}

document.getElementById('lang-select').addEventListener('change', function(e) {
  setLanguage(e.target.value);
  localStorage.setItem('vtools-lang', e.target.value);
});

// 초기 언어 설정
const savedLang = localStorage.getItem('vtools-lang') || 'en';
document.getElementById('lang-select').value = savedLang;
setLanguage(savedLang);

// Service Worker 등록
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('-V Tools- ✅ Service Worker registered:', reg.scope))
      .catch(err => console.error('-V Tools- ❌ Service Worker registration failed:', err));
  });
}

navigator.serviceWorker.addEventListener('message', event => {
  if (event.data?.type === 'UPDATE_AVAILABLE') {
    showUpdateNotification(); // 사용자에게 알림 띄우기
  }
});

function showUpdateNotification() {
  const banner = document.createElement('div');
  banner.textContent = '새 버전이 있습니다. 새로고침하세요!(Press F5 to refresh)';
  banner.style.cssText = 'position:fixed;bottom:0;width:100%;background:#333;color:#fff;padding:10px;text-align:center;';
  document.body.appendChild(banner);
}