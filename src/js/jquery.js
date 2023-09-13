const submitBtn = $('#submitBtn');
const emailInput = $('#input-email');
const closeBtnCard = $('#closeCard');
const errorSpan = $('form').find('span');
const containerCard = $('.container-card');

function validEmail(email) {
  return email && email.match(/\w{2,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,}/);
}

emailInput.on('change', function (e) {
  // e.preventDefault();
  if (e.target.value) {
    if (!validEmail(e.target.value)) {
      emailInput.addClass('input-error');
      errorSpan.css('display', 'block');
      submitBtn.prop('disabled', true);
      submitBtn.addClass('disable');
    }

    if (validEmail(e.target.value)) {
      errorSpan.css('display', 'none');
      emailInput.removeClass('input-error');
      submitBtn.prop('disabled', false);
      submitBtn.removeClass('disable');
    }
  }
});

submitBtn.on('click', function () {
  toggleContainer();
  $('#client-email').html(emailInput.val());
});

$('#closeCard').on('click', function () {
  toggleContainer();
  resetAll();
});

const toggleContainer = () => {
  containerCard.css('display') == 'none'
    ? containerCard.css('display', 'flex')
    : containerCard.css('display', 'none');
};

const resetAll = () => {
  emailInput.val('');
  emailInput.removeClass('input-error');
  errorSpan.css('display', 'none');
  submitBtn.prop('disabled', true);
  submitBtn.addClass('disable');
};