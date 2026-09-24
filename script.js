document.getElementById('yr').textContent = new Date().getFullYear();

// ---------------------------------------------------------------
// FORM ENDPOINT: Web3Forms. Submissions are emailed to whatever
// address is tied to this access key on web3forms.com.
// ---------------------------------------------------------------
const WEB3FORMS_ACCESS_KEY = '461f0ba0-441f-448d-a5b8-a2887b7c7203';
const FORM_ENDPOINT = 'https://api.web3forms.com/submit';

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

  const data = new FormData(form);
  data.append('access_key', WEB3FORMS_ACCESS_KEY);

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  fetch(FORM_ENDPOINT, {
    method: 'POST',
    body: data,
    headers: { 'Accept': 'application/json' }
  })
    .then(function(response){ return response.json().then(function(result){ return { response, result }; }); })
    .then(function(_ref){
      const response = _ref.response, result = _ref.result;
      if (response.ok && result.success) {
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
