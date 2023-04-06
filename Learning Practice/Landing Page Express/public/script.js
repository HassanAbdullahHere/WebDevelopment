

function test(){
    var input = document.querySelectorAll(".form-floating .form-control");
    for(i=0;i<=input.length;i++){
    if (input[i].value) {
        input[i].classList.remove("fail");
        input[i].classList.add("success");
      } else {
        input[i].classList.remove("success");
        input[i].classList.add("fail");
      }
    }

}
//function checkNameHandler() {
  var input = document.getElementById("floatingName");
  if (input.value) {
    input.classList.remove("fail");
    input.classList.add("success");
  } else {
    input.classList.remove("success");
    input.classList.add("fail");
  }

  var mail = document.getElementById("floatingInput");
  if (mail.value) {
    mail.classList.remove("fail");
    mail.classList.add("success");
  } else {
    mail.classList.remove("success");
    mail.classList.add("fail");
  }

  var pass = document.getElementById("floatingPassword");
  if (pass.value) {
    pass.classList.remove("fail");
    pass.classList.add("success");
  } else {
    pass.classList.remove("success");
    pass.classList.add("fail");
  }
//}


