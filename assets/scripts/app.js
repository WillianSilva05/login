let pass1 = document.getElementById("pass1");
let result = document.getElementById("result");

let upp = /[A-Z]/
let low = /[a-z]/
let num = /[0-9]/
let esp = /[!@#$%&*]/

function testPass() {
    if (upp.test(pass1.value) == false) {
        result.innerText = "A senha deve conter 1 caractere MAIÚSCULO \n"
    } else {
        if (low.test(pass1.value) == false) {
            result.innerText = "A senha deve conter 1 caracteres MINÚSCULOS \n"
        } else {
            if (num.test(pass1.value) == false) {
                result.innerText = "A senha deve conter 1 NÚMERO \n"
            } else {
                if (esp.test(pass1.value) == false) {
                    result.innerText = "A senha deve conter 1 CARACTER ESPECIAL \n"
                } else {
                    if(pass1.value.length < 8) {
                        result.innerText = "A senha deve conter no mínimo 8 CARACTERES"
                    } else {
                        result.innerText = ""
                    }
                }
            }
        }
    }
    setTimeout(testPass, 500)
}