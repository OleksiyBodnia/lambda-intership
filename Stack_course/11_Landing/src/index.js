
// Завантаження мовних файлів
Promise.all([
  fetch('en.json').then(res => res.json()),
  fetch('uk.json').then(res => res.json())
]).then(([enTranslations, ukTranslations]) => {
  // Отримання збереженої мови з localStorage або встановлення за замовчуванням
  const savedLanguage = localStorage.getItem('language') || 'en';

  // Ініціалізація i18next з мовними ресурсами
  i18next.init({
      lng: savedLanguage, // Мова за замовчуванням
      debug: true,
      resources: {
          en: {
              translation: enTranslations
          },
          uk: {
              translation: ukTranslations
          }
      }
  }, function(err, t) {
      // Ініціалізація завершена, оновлюємо текстові елементи
      updateContent();
  });
});

// Функція для зміни мови
function changeLanguage(lng) {
  i18next.changeLanguage(lng, function(err, t) {
      // Зберігаємо обрану мову в localStorage
      localStorage.setItem('language', lng);
      updateContent();
  });
}

// Функція для оновлення текстових елементів на сторінці
function updateContent() {
  const elements = document.querySelectorAll('[id]');
  elements.forEach(element => {
      const key = element.id;
      element.innerHTML = i18next.t(key);
  });
}

window.changeLanguage = changeLanguage;