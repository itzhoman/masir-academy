// منوی ناوبری در نمایشگرهای کوچک
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-navigation');

menuButton.hidden = false;
navigation.classList.add('can-toggle');

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
    navigation.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.focus();
  }
});

// صفحهٔ ثبت‌نام: انتخاب دوره از لینک و بررسی محلی فرم
const form = document.querySelector('#registration-form');

if (form) {
  const studentName = document.querySelector('#student-name');
  const courseSelect = document.querySelector('#course');
  const result = document.querySelector('#registration-result');
  const course = new URLSearchParams(window.location.search).get('course');

  if (['icdl', 'web', 'python'].includes(course)) {
    courseSelect.value = course;
  }

  document.querySelector('#submit-registration').disabled = false;

  form.addEventListener('input', () => {
    studentName.setCustomValidity('');
    result.textContent = '';
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = studentName.value.trim();

    if (name.length < 2) {
      studentName.setCustomValidity('لطفاً نام و نام خانوادگی را وارد کنید.');
      studentName.reportValidity();
      return;
    }

    const courseName = courseSelect.selectedOptions[0].textContent;
    result.textContent = `${name}، فرم آزمایشی دورهٔ «${courseName}» با موفقیت بررسی شد.`;
    form.reset();
  });
}
