document.getElementById('yr').textContent = new Date().getFullYear();

// ---------------------------------------------------------------
// FORM ENDPOINT: paste your Formspree URL here once you have one,
// e.g. 'https://formspree.io/f/xxxxxxxx' (like the Rubbish Removals
// site uses). Until you do, the form will just show the "thanks"
// confirmation locally without actually sending anywhere.
// ---------------------------------------------------------------
const FORM_ENDPOINT = 'https://formspree.io/f/xnpnnyog';

const form = document.getElementById('quoteForm');
const cardSection = document.getElementById('quote');

form.addEventListener('submit', function(e){
  e.preventDefault();
  let ok = true;

  form.querySelectorAll('[data-f]').forEach(function(f){
    const input = f.querySelector('.inp');
    const val = input.value.trim();
    let good = val.length > 0;
    if (good && input.type === 'tel') {
      good = val.replace(/\D/g,'').length >= 8;
    }
    f.classList.toggle('bad', !good);
    if (!good && ok) { input.focus(); }
    if (!good) ok = false;
  });

  if (!ok) return;

  const card = form.closest('.card');
  const submitBtn = form.querySelector('.submit');

  // If no real endpoint has been set yet, just show the confirmation
  // locally so you can still test the form end-to-end.
  if (!FORM_ENDPOINT || FORM_ENDPOINT.indexOf('YOUR_FORM_ID') !== -1) {
    card.classList.add('sent');
    cardSection.scrollIntoView({behavior:'smooth', block:'center'});
    return;
  }

  const data = new FormData(form);
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  fetch(FORM_ENDPOINT, {
    method: 'POST',
    body: data,
    headers: { 'Accept': 'application/json' }
  })
    .then(function(response){
      if (response.ok) {
        card.classList.add('sent');
        cardSection.scrollIntoView({behavior:'smooth', block:'center'});
      } else {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send my details';
        alert('Something went wrong sending your details. Please call 0438 619 660 instead.');
      }
    })
    .catch(function(){
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send my details';
      alert('Something went wrong sending your details. Please call 0438 619 660 instead.');
    });
});

form.querySelectorAll('[data-f] .inp').forEach(function(i){
  i.addEventListener('input', function(){ i.closest('[data-f]').classList.remove('bad'); });
});

// gallery tabs
document.querySelectorAll('.tab-btn').forEach(function(btn){
  btn.addEventListener('click', function(){
    document.querySelectorAll('.tab-btn').forEach(function(b){ b.classList.remove('active'); });
    document.querySelectorAll('.tab-panel').forEach(function(p){ p.classList.remove('active'); });
    btn.classList.add('active');
    document.querySelector('.tab-panel[data-panel="'+btn.dataset.tab+'"]').classList.add('active');
  });
});