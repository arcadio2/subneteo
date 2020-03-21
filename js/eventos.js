function evento(e){
	var teclado=(document.all) ? e.keyCode: e.which;
	if (teclado==8) return true;
	let inp = document.getElementById('binario').value; 
	var patron = /[\d]/; 
	if (inp.length%3==0 && inp.length>0 ) {
		if (inp.length<4) {
		document.getElementById('binario').value=inp+".";
		}
	}
	if ((inp.length+1)%4==0 &&inp.length>3 && inp.length<15) {
		document.getElementById('binario').value=inp+"."; 
	}
	if (inp.length>=15) {
	var patron = /[]/;
	}

	var prueba = String.fromCharCode(teclado); 
	return patron.test(prueba);
}

function numeross(e){
	var teclado=(document.all) ? e.keyCode: e.which;
	if (teclado==8) return true;
	let inp = document.getElementById('binario').value; 
	var patron = /[\d]/; 

	var prueba = String.fromCharCode(teclado); 
	return patron.test(prueba);
}



