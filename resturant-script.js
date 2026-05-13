// NAVIGATION & MOBILE MENU
const nav = document.getElementById('nav');
const ham = document.getElementById('ham');
const mob = document.getElementById('mob');
const mobLinks = document.querySelectorAll('.ml');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

ham.addEventListener('click', () => {
  ham.classList.toggle('open');
  mob.classList.toggle('open');
  document.body.style.overflow = mob.classList.contains('open') ? 'hidden' : '';
});

mobLinks.forEach(link => {
  link.addEventListener('click', () => {
    ham.classList.remove('open');
    mob.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// RESERVATION FORM HANDLING
async function handleRes(e) {
  e.preventDefault();
  const btn = document.getElementById('fsub');
  const errEl = document.getElementById('ferr');
  
  // Extracting values
  const n = document.getElementById('fn').value;
  const e_val = document.getElementById('fe').value;
  const p = document.getElementById('fp').value;
  const g = document.getElementById('fg2').value;
  const d = document.getElementById('fd').value;
  const t = document.getElementById('ft').value;
  const r = document.getElementById('fr').value;

  btn.disabled = true;
  btn.textContent = 'Sending…';
  
  try {
    const res = await fetch('https://formspree.io/f/maqpnyww', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name: n, email: e_val, phone: p || 'Not provided', guests: g, preferred_date: d, time_slot: t, special_request: r || 'None' })
    });
    if (res.ok) {
      document.getElementById('formWrap').style.display = 'none';
      document.getElementById('confirmBox').classList.add('show');
    } else {
      const data = await res.json();
      errEl.textContent = data?.errors?.map(x => x.message).join(', ') || 'Something went wrong.';
      btn.disabled = false;
      btn.textContent = 'Request Reservation';
    }
  } catch (ex) {
    errEl.textContent = 'Network error. Please check your connection.';
    btn.disabled = false;
    btn.textContent = 'Request Reservation';
  }
}

// (Include any other functions like resetRes() or parallax logic here)
