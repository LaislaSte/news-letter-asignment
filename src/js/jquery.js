$('#input-email').on('change', (e) => {
  valideEmail(e.target.value);
});

document.getElementById('submitBtn').addEventListener('click', function () {
  const email = $('#input-email').val();

  if (valideEmail(email)) {
    $('.container-card').css('display', 'flex');
    $('#client-email').html(email);
    document.getElementById('input-email').value = '';
    $('#input-email').toggleClass('input-error');
    $('form').find('span').css('display', 'none');
  }
});

$('#closeCard').on('click', function () {
  $('.container-card').css('display', 'none');
});

function valideEmail(email) {
  if (!email.match(/\w{2,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,}/) || email == '') {
    $('#input-email').addClass('input-error');
    $('form').find('span').css('display', 'block');
    $('form').find('button').prop('disabled', true);
    return false;
  } else {
    $('#input-email').toggleClass('input-error');
    $('form').find('span').css('display', 'none');
    $('form').find('button').prop('disabled', false);
    return true;
  }
}
