// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Scroll animation observer
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, observerOptions);

document.querySelectorAll('.scroll-animation').forEach(el => observer.observe(el));

// Form submit
const form = document.getElementById('registrationForm');
const responseMessage = document.getElementById('response-message');

if (form) {
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const formData = {
      name: document.getElementById('name').value,
      date: document.getElementById('date').value,
      phonenumber: document.getElementById('phonenumber').value,
      nameparent: document.getElementById('nameparent').value,
      phonenumberparent: document.getElementById('phonenumberparent').value,
      school: document.getElementById('school').value
    };
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbxNoxJamxBOZ5eR3J0YY6BEXRl-9BPy8GsZivIWVbvZnE5aHl7vyVZHTjwguQiaK6FY/exec', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert('Đăng ký thành công!');
        form.reset();
      } else {
        alert('Không thể gửi dữ liệu. Hãy thử lại sau.');
      }
    } catch (error) {
      console.error('Lỗi:', error);
      alert('Lỗi kết nối đến server.');
    }
  });
}

// Mobile menu toggle
function createMobileMenu() {
  const header = document.querySelector('.header-content');
  const nav = document.querySelector('.nav');
  if (!header || !nav) return;
  const btn = document.createElement('button');
  btn.innerHTML = '☰';
  btn.className = 'mobile-menu-btn';
  btn.style.cssText = 'display:none;background:none;border:none;font-size:1.5rem;cursor:pointer;color:#374151;';
  header.insertBefore(btn, header.lastElementChild);
  btn.addEventListener('click', () => nav.classList.toggle('mobile-nav-open'));
}
createMobileMenu();

// Animated registration counter
function animateCounter() {
  const counter = document.querySelector('.registration-count');
  if (!counter) return;
  const target = 10000, duration = 2000, start = performance.now();
  function updateCounter(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);
    const current = Math.floor(progress * target);
    counter.textContent = `${current.toLocaleString()}+ Đăng ký`;
    if (progress < 1) requestAnimationFrame(updateCounter);
  }
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const heroObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        requestAnimationFrame(updateCounter);
        heroObserver.disconnect();
      }
    });
  });
  heroObserver.observe(hero);
}
animateCounter();

// Typewriter effect for hero title
function typewriterEffect() {
  const title = document.querySelector('.hero-text h1');
  if (!title) return;
  const text = title.textContent;
  title.textContent = '';
  title.style.borderRight = '2px solid #1e40af';
  let i = 0;
  function typeChar() {
    if (i < text.length) {
      title.textContent += text.charAt(i++);
      setTimeout(typeChar, 50);
    } else {
      setTimeout(() => { title.style.borderRight = 'none'; }, 1000);
    }
  }
  setTimeout(typeChar, 500);
}
window.addEventListener('load', typewriterEffect);

// Scroll progress bar
function createScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #3b82f6, #1e40af);
    z-index: 9999;
    transition: width 0.3s ease;
  `;
  document.body.appendChild(progressBar);
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.pageYOffset / totalHeight) * 100;
    progressBar.style.width = progress + '%';
  });
}
createScrollProgress();

// Floating action button
function createFloatingButton() {
  const fab = document.createElement('a');
  fab.href = '#register';
  fab.innerHTML = '📝';
  fab.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    background: #3b82f6;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    text-decoration: none;
    box-shadow: 0 4px 12px rgba(59,130,246,0.4);
    z-index: 1000;
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(100px);
  `;
  document.body.appendChild(fab);
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      fab.style.opacity = '1';
      fab.style.transform = 'translateY(0)';
    } else {
      fab.style.opacity = '0';
      fab.style.transform = 'translateY(100px)';
    }
  });
  fab.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(0) scale(1.1)';
    this.style.boxShadow = '0 6px 20px rgba(59,130,246,0.6)';
  });
  fab.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0) scale(1)';
    this.style.boxShadow = '0 4px 12px rgba(59,130,246,0.4)';
  });
}
createFloatingButton();

// Fade-in body on load
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  setTimeout(() => { document.body.style.opacity = '1'; }, 100);
});
