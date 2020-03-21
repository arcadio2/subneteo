let final="";
let clase="";
function convertirr(){
	let inp = document.getElementById('binario').value;  
	let numeros=/[\d.]/;  
	if (numeros.test(inp) && validarbin(inp)) {
		document.getElementById("out1").innerHTML="";
		final=abin(inp);
		clase=determinarclase(inp); 
		document.getElementById("out1").innerHTML="La IP es: "+final;
		document.getElementById("out2").innerHTML="La red es clase: "+clase;
	}else{
		document.getElementById("out1").innerHTML="Ip invalida";
	}

}

function validarbin(input){
	if (input.length<15) {
		return false; 
	}else{	

		let miarreglo= input.split('.'); 
		let bool=true; 
		for (var i = 0; i < miarreglo.length; i++) {
			if (miarreglo[i].length>3) {
				bool=false; 
			}
		}
		if (bool) {
			//return true;
			if (input.length>15) {
				return false; 
			}else{
			let numeros=/[\d.]/;  

			for (var i = 0; i < miarreglo.length; i++) {
				for (var j = 0; j < miarreglo[i].length; j++) {
					if (!numeros.test(miarreglo[i].charAt(j))) {
						bool=false; 
					}
				}
			}//fin
			if (bool) {
				for (var i = 0; i < miarreglo.length; i++) {
					if (parseInt(miarreglo[i])>255) {
						bool=false; 
					}
				}
				if (bool) {
					return true; 
				}else{
					return false;
				}
				 
			}else{
				return false; 
			}

			}
		}else{
			return false; 
		}

	}
	
} 


function abin(inp){
		var sistema = [128,64,32,16,8,4,2,1]; 
		var cadauno=inp.split('.'); 
		var final=""; 
		var num; 

		for (var i = 0; i < cadauno.length; i++) {
			num=0;
			for (var j = 0; j < sistema.length; j++) {
				if(j==0){
					num=parseInt(cadauno[i]); 
				}
				if (num>=sistema[j]) {
					num=num-sistema[j]; 
					final=final+"1";  
				}else{
					final=final+"0"; 
				}
			}
			final=final+".";
		}//fin de esto
		final=final.slice(0,-1);
		return final; 
}

function determinarclase(fin){
	var mifin=fin.split('.'); 
	console.log(mifin[0]);
	if (mifin[0]<=127) {
		return "A";
	}else if(mifin[0]<=191){
		return "B";
	}else if(mifin[0]<=223){
		return "C";
	}else if(mifin[0]<=239){
		return "D";
	}else{
		return "E"; 
	}		
}


function determinarxhost(){
	let inp = document.getElementById('binario').value;  
	let host = document.getElementById('host').value; 
if (!validarbin(inp)) {
	document.getElementById('e2').innerHTML="Ingrese una ip valida"; 

}else{

	
	if (final=="") {
		document.getElementById('e2').innerHTML="No has ingresado la IP";
	}else{

		document.getElementById('e2').innerHTML="";
		if (clase=="C") {
			if (host<=254 && host>=0) {
				document.getElementById('e2').innerHTML="";
				var valores=hostc(host);
				let inp = document.getElementById('binario').value;  
				var otrarreglo=inp.split('.'); 
				var final2=otrarreglo[0]+"."+otrarreglo[1]+"."; 
				for (var i = 3; i < otrarreglo.length; i++) {
					final2=final2+"000"+".";
				}
				final2=final2.slice(0,-1);
				final2=(abin(final2));
				document.getElementById('binario2').innerHTML="La IP final es : "+otrarreglo[0]+"."+otrarreglo[1]+"."+otrarreglo[2]+".000 <br> El binario "+final2;
				document.getElementById('out3').innerHTML="Tu cantidad de host que satisfacen es: "+valores[1]+"<br>n= "+valores[0]+"<br> subredes= "+Math.pow(2,valores[0]);
				var ceros="";
				for (var i = 1; i < 9; i++) {
					if (i>valores[0]) {
						ceros=ceros+"0"; 
					}else{
						ceros=ceros+"1"; 
					}				
					if (i%8==0 && i>0 && i<8) {
						ceros=ceros+".";
					}	
				}
				console.log(ceros); 
				var binarios=ceros.split('.');
				var digito=[]; 
				var c=0; 
				for (var i = 0; i < binarios.length; i++) {
					digito[i]=parseInt(binarios[i],2);
					if (digito[i]!=255) {
						c=i; 
						break; 
					}
				}
				console.log(digito); 
				var salto=256-digito[c];
				console.log(salto);

				var tabla2="<table border='1'> <tr><td>Direccion IP</td> <td>Primera utilizable</td>";
				tabla2=tabla2+"<td>Ultima utilizable</td> <td>Boradcast</td> </tr> "; 
								for (var i = 0; i < 256; i=i+salto) {
						tabla2=tabla2+"<tr><td>"+otrarreglo[0]+"."+otrarreglo[1]+"."+otrarreglo[2]+"."+i+"</td><td>"+otrarreglo[0]+"."+otrarreglo[1]+"."+otrarreglo[2]+"."+i+"</td>"+
						"<td>"+otrarreglo[0]+"."+otrarreglo[1]+"."+otrarreglo[2]+"."+(i+salto-1)+"</td>"+
						"<td>"+otrarreglo[0]+"."+otrarreglo[1]+"."+otrarreglo[2]+"."+(i+salto-1)+"</td></tr>";  
						if (i<=256-salto) {

						}else{

						}
						
					}
					
				document.getElementById('tabla').innerHTML=tabla2+"</table>";
				document.getElementById('btabla').innerHTML="<input type='button' id='bb' onclick='return borrar()' value='borrar'>"; 

			}else{
				document.getElementById('e2').innerHTML="El numero de host no coincide con la clase C";
				return false; 
			}
		}else if(clase=="B"){
			if(host<=65534 && host>=0){
				document.getElementById('e2').innerHTML="";		
		
				var valores=hostb(host);
				let inp = document.getElementById('binario').value;  
				var otrarreglo=inp.split('.'); 
				var final2=otrarreglo[0]+"."+otrarreglo[1]+"."; 
				for (var i = 2; i < otrarreglo.length; i++) {
					final2=final2+"000"+".";
				}
				final2=final2.slice(0,-1);
				final2=(abin(final2));
				document.getElementById('binario2').innerHTML="La IP final es : "+otrarreglo[0]+"."+otrarreglo[1]+".000.000"+"<br> El binario "+final2;
				document.getElementById('out3').innerHTML="Tu cantidad de host que satisfacen es: "+valores[1]+"<br>n= "+valores[0]+"<br> subredes= "+Math.pow(2,valores[0]);
				var ceros="";
				for (var i = 1; i < 17; i++) {
					if (i>valores[0]) {
						ceros=ceros+"0"; 
					}else{
						ceros=ceros+"1"; 
					}				
					if (i%8==0 && i>0 && i<16) {
						ceros=ceros+".";
					}	
				}
				console.log(ceros); 
				var binarios=ceros.split('.');
				var digito=[]; 
				var c=0; 
				for (var i = 0; i < binarios.length; i++) {
					digito[i]=parseInt(binarios[i],2);
					if (digito[i]!=255) {
						c=i; 
						break; 
					}
				}
				console.log(digito); 
				var salto=256-digito[c];
				console.log(salto);

				var tabla2="<table border='1'> <tr><td>Direccion IP</td> <td>Primera utilizable</td>";
				tabla2=tabla2+"<td>Ultima utilizable</td> <td>Boradcast</td> </tr> "; 
				if (c==0) {
					for (var i = 0; i < 256; i=i+salto) {
						tabla2=tabla2+"<tr><td>"+otrarreglo[0]+"."+otrarreglo[1]+"."+i+".0</td><td>"+otrarreglo[0]+"."+otrarreglo[1]+"."+i+".1</td>"+
						"<td>"+otrarreglo[0]+"."+otrarreglo[1]+"."+(i+salto-1)+".254</td>"+
						"<td>"+otrarreglo[0]+"."+otrarreglo[1]+"."+(i+salto-1)+".255</td></tr>";  
						
					}
					tabla2=tabla2+"</table> ";
					
				}else{
					tabla2="No se puede hacer la tabla porque el navegador muere";
				}
				//fin ese if
				document.getElementById('tabla').innerHTML=tabla2;
					document.getElementById('btabla').innerHTML="<input type='button' id='bb' onclick='return borrar()' value='borrar'>"; 
			}else{
				document.getElementById('e2').innerHTML="El numero de host no coincide con la clase B";
			}
		}else if(clase=="A"){
			if(host<=16777214 && host>=0){
				//clase a				
				document.getElementById('e2').innerHTML="";	
				var valores=hosta(host);
				let inp = document.getElementById('binario').value;  
				var otrarreglo=inp.split('.'); 
				var final2=otrarreglo[0]+"."; 
				for (var i = 1; i < otrarreglo.length; i++) {
					final2=final2+"000"+".";
				}
				final2=final2.slice(0,-1);
				final2=(abin(final2));
				document.getElementById('binario2').innerHTML="La IP final es : "+otrarreglo[0]+".000.000.000"+"<br> El binario "+final2;
				document.getElementById('out3').innerHTML="Tu cantidad de host que satisfacen es: "+valores[1]+"<br>n= "+valores[0]+"<br> subredes= "+Math.pow(2,valores[0]); 

				var ceros=""; 
				for (var i = 1; i < 25; i++) {
					if (i>valores[0]) {
						ceros=ceros+"0"; 
					}else{
						ceros=ceros+"1"; 
					}				
					if (i%8==0 && i>0 && i<24) {
						ceros=ceros+".";
					}	
				}
				console.log(ceros); 
				var binarios=ceros.split('.');
				var digito=[]; 
				var c=0; 
				for (var i = 0; i < binarios.length; i++) {
					digito[i]=parseInt(binarios[i],2);
					if (digito[i]!=255) {
						c=i; 
						break; 
					}
				}
				console.log(digito); 
				var salto=256-digito[c];
				console.log(salto);

				var tabla2="<table border='1'> <tr><td>Direccion IP</td> <td>Primera utilizable</td>";
				tabla2=tabla2+"<td>Ultima utilizable</td> <td>Boradcast</td> </tr> "; 
				if (c==0) {
					for (var i = 0; i < 256; i=i+salto) {
						tabla2=tabla2+"<tr><td>"+otrarreglo[0]+"."+i+".0.0</td><td>"+otrarreglo[0]+"."+i+".0.1</td>"+
						"<td>"+otrarreglo[0]+"."+(i+salto-1)+".254.254</td>"+
						"<td>"+otrarreglo[0]+"."+(i+salto-1)+".255.255</td></tr>";  
						
					}
					tabla2=tabla2+"</table>"; 
				}else {
					tabla2="No se puede hacer la tabla porque el navegador muere";
				}
					
				document.getElementById('tabla').innerHTML=tabla2;
				document.getElementById('btabla').innerHTML="<input type='button' id='bb' onclick='return borrar()' value='borrar'>"; 
			}else{
				document.getElementById('binario2').innerHTML="";
				document.getElementById('out3').innerHTML=""; 
				document.getElementById('e2').innerHTML="El numero de host no coincide con la clase A";
			}
		}else{
			document.getElementById('e2').innerHTML="No se puede";
			return false; 
		}

	}

}

}


function hosta(host){
	var a=[0,2,6,14,30,62,126,254,510,1022,2046,4094,8190,16382,32766,65534,131070,262142,524286,
	1048574,2097150, 4194302, 8388606, 16777214]; 
	var ht;
	var cont=0; 
	var subred; 
	for (var i = 0; i < a.length; i++) {
		cont++;
		if (host<=a[i]) {
			ht=a[i]; 
			break; 
		}
	}
	//subred es n
	subred=a.length-cont; 
	var valores=[subred,ht];
	return valores;
}

function subreda(n){
	var sub=[]; 

}


function hostb(host){
	var b=[0,2,6,14,30,62,126,254,510,1022,2046,4094,8190,16382,32766,65534]; 
	var ht; 
	var cont=0; 
	var n; 
	for (var i = 0; i < b.length; i++) {
		cont++; 
		if(host<=b[i]){
			ht=b[i]; 
			break; 
		}
	}
	n=b.length-cont; 
	var valores=[n,ht]; 
	return valores; 

}

function hostc(host){
	var c=[0,2,6,14,30,62,126,254]; 
	var ht; 
	var cont=0; 
	var n; 
	for (var i = 0; i < c.length; i++) {
		cont++; 
		if(host<=c[i]){
			ht=c[i]; 
			break; 
		}
	}
	n=c.length-cont; 
	var valores=[n,ht]; 
	return valores; 
}

function borrar(){
document.getElementById('tabla').innerHTML="";
document.getElementById('btabla').innerHTML="";

}




function porsubred(){
	let inp = document.getElementById('binario').value;  
	let sub = document.getElementById('subred').value; 
	if (!validarbin(inp)) {
		document.getElementById('e3').innerHTML="IP invalida"; 
	}else{
		document.getElementById('e3').innerHTML=""; 
		if (clase=="C") {
			var valores=subredc(sub); 
			if (sub>0 && sub<256) {
				var ceros=""; 
				var validos=inp.split('.'); 
				var final2=validos[0]+"."+validos[1]+"."+validos[2]+"."; 
				for (var i = 3; i < validos.length; i++) {
					final2=final2+"000"+".";
				}
				final2=final2.slice(0,-1);
				final2=(abin(final2));
				console.log(valores[2]); 
				for (var i = 1; i <9 ; i++) {
					if (i>valores[0]) {
						ceros = ceros+"0";	
					}else{
						ceros=ceros+"1"; 
					}
					if (i%8==0 && i<8) {
						ceros=ceros+".";
					}
		 
				}
				var hoste=Math.pow(2,valores[2]);
				document.getElementById('binario3').innerHTML="La IP valida es: "+validos[0]+"."+validos[1]+"."+validos[2]+".000"+
				"<br>El binario es: "+final2+"<br> La cantidad de subredes que satisfacen son: "+valores[1]+
				"<br> n= "+valores[0]+"<br>Hosts: "+(hoste-2); 
				console.log(ceros);
				var binarios=ceros.split('.');
				var digito=[];
				var c=0; 
				for (var i = 0; i < binarios.length; i++) {
					digito[i]=parseInt(binarios[i],2);
					if (digito[i]!=255) {
						c=i; 
						break; 
					}
				}
				console.log(digito); 
				var salto=256-digito[c];
				console.log(salto);

				var tabla2="<table border='1'> <tr><td>Direccion IP</td> <td>Primera utilizable</td>";
				tabla2=tabla2+"<td>Ultima utilizable</td> <td>Boradcast</td> </tr> "; 
				for (var i = 0; i < 256; i=i+salto) {
						tabla2=tabla2+"<tr><td>"+validos[0]+"."+validos[1]+"."+i+".0</td><td>"+validos[0]+"."+validos[1]+"."+validos[2]+"."+i+"</td>"+
						"<td>"+validos[0]+"."+validos[1]+"."+validos[2]+"."+(i+salto-1)+"</td>"+
						"<td>"+validos[0]+"."+validos[1]+"."+validos[2]+"."+(i+salto-1)+"</td></tr>";  
						
				}
					tabla2=tabla2+"</table>"; 

					document.getElementById('otabla').innerHTML=tabla2;
				document.getElementById('btabla2').innerHTML="<input type='button' id='bb2' onclick='return borrar2()' value='borrar'>"; 
			}else{
				document.getElementById('e3').innerHTML="La subredes no coinciden con la clase C"; 
			}
		}else if(clase=="B"){
			var valores=subredb(sub);
			if (sub>0 && sub<65536) {
				var ceros=""; 
				var validos=inp.split('.'); 
				var final2=validos[0]+"."+validos[1]+"."; 
				for (var i = 2; i < validos.length; i++) {
					final2=final2+"000"+".";
				}
				final2=final2.slice(0,-1);
				final2=(abin(final2));

				console.log(valores[2]); 
				for (var i = 1; i <17 ; i++) {
					if (i>valores[0]) {
						ceros = ceros+"0";	
					}else{
						ceros=ceros+"1"; 
					}
					if (i%8==0 && i<16) {
						ceros=ceros+".";
					}
		 
				}
				var hoste=Math.pow(2,valores[2]);
				document.getElementById('binario3').innerHTML="La IP valida es: "+validos[0]+"."+validos[1]+".000.000"+
				"<br>El binario es: "+final2+"<br> La cantidad de subredes que satisfacen son: "+valores[1]+
				"<br> n= "+valores[0]+"<br>Hosts: "+(hoste-2); 
				console.log(ceros);
				var binarios=ceros.split('.');
				var digito=[];
				var c=0; 
				for (var i = 0; i < binarios.length; i++) {
					digito[i]=parseInt(binarios[i],2);
					if (digito[i]!=255) {
						c=i; 
						break; 
					}
				}
				console.log(digito); 
				var salto=256-digito[c];
				console.log(salto);

				var tabla2="<table border='1'> <tr><td>Direccion IP</td> <td>Primera utilizable</td>";
				tabla2=tabla2+"<td>Ultima utilizable</td> <td>Boradcast</td> </tr> "; 
				if (c==0) {
					for (var i = 0; i < 256; i=i+salto) {
						tabla2=tabla2+"<tr><td>"+validos[0]+"."+validos[1]+"."+i+".0</td><td>"+validos[0]+"."+validos[1]+"."+i+".1</td>"+
						"<td>"+validos[0]+"."+validos[1]+"."+(i+salto-1)+".254</td>"+
						"<td>"+validos[0]+"."+validos[1]+"."+(i+salto-1)+".255</td></tr>";  
						
					}
					tabla2=tabla2+"</table>"; 
				}else {
					tabla2="No se puede hacer la tabla porque el navegador muere";
				}

				document.getElementById('otabla').innerHTML=tabla2;
				document.getElementById('btabla2').innerHTML="<input type='button' id='bb2' onclick='return borrar2()' value='borrar'>"; 

			}else{
				document.getElementById('e3').innerHTML="La subredes no coinciden con la clase B"; 
			}

		}else if (clase=="A"){
			var valores=subreda(sub); 
			if (sub>0 && sub<1677216) {	
				var ceros=""; 
				var validos=inp.split('.'); 
				var final2=validos[0]+"."; 
				for (var i = 1; i < validos.length; i++) {
					final2=final2+"000"+".";
				}
				final2=final2.slice(0,-1);
				final2=(abin(final2));

				console.log(valores[2]); 
				for (var i = 1; i <25 ; i++) {
					if (i>valores[0]) {
						ceros = ceros+"0";	
					}else{
						ceros=ceros+"1"; 
					}
					if (i%8==0 && i<24) {
						ceros=ceros+".";
					}
		 
				}
				var hoste=Math.pow(2,valores[2]);
				document.getElementById('binario3').innerHTML="La IP valida es: "+validos[0]+".000.000.000"+
				"<br>El binario es: "+final2+"<br> La cantidad de subredes que satisfacen son: "+valores[1]+
				"<br> n= "+valores[0]+"<br>Hosts: "+(hoste-2); 
				console.log(ceros);
				var binarios=ceros.split('.');
				var digito=[];
				var c=0; 
				for (var i = 0; i < binarios.length; i++) {
					digito[i]=parseInt(binarios[i],2);
					if (digito[i]!=255) {
						c=i; 
						break; 
					}
				}
				console.log(digito); 
				var salto=256-digito[c];
				console.log(salto);

				var tabla2="<table border='1'> <tr><td>Direccion IP</td> <td>Primera utilizable</td>";
				tabla2=tabla2+"<td>Ultima utilizable</td> <td>Boradcast</td> </tr> "; 
				if (c==0) {
					for (var i = 0; i < 256; i=i+salto) {
						tabla2=tabla2+"<tr><td>"+validos[0]+"."+i+".0.0</td><td>"+validos[0]+"."+i+".0.1</td>"+
						"<td>"+validos[0]+"."+(i+salto-1)+".254.254</td>"+
						"<td>"+validos[0]+"."+(i+salto-1)+".255.255</td></tr>";  
						
					}
					tabla2=tabla2+"</table>"; 
				}else {
					tabla2="No se puede hacer la tabla porque el navegador muere";
				}

				document.getElementById('otabla').innerHTML=tabla2;
				document.getElementById('btabla2').innerHTML="<input type='button' id='bb2' onclick='return borrar2()' value='borrar'>"; 
			}else{
				document.getElementById('e3').innerHTML="La subredes no coinciden con la clase A"; 
			}
		}


	}

}

function subreda(sub){
	var sa=[2,4,8,16,32,64,128,256,512,1024,2048,4096,
	8192,16384,32768,65536,131072,262144,524288,1048576,2097152,4194304,8388608,1677216]; 
	var n=0; 
	var valid; 
	var nh; 
	for (var i = 0; i < sa.length; i++) {
		n++; 
		if (sub<=sa[i]) {
			valid=sa[i]; 
			break; 
		}
	}
	nh=sa.length-n; 
	var valores=[n,valid,nh ]; 
	return valores; 
}

function subredb(sub){
	var sa=[2,4,8,16,32,64,128,256,512,1024,2048,4096,
	8192,16384,32768,65536]; 
	var n=0; 
	var valid; 
	var nh; 
	for (var i = 0; i < sa.length; i++) {
		n++; 
		if (sub<=sa[i]) {
			valid=sa[i]; 
			break; 
		}
	}
	nh=sa.length-n; 
	var valores=[n,valid,nh ]; 
	return valores; 
}
function subredc(sub){
	var sa=[2,4,8,16,32,64,128,256]; 
	var n=0; 
	var valid; 
	var nh; 
	for (var i = 0; i < sa.length; i++) {
		n++; 
		if (sub<=sa[i]) {
			valid=sa[i]; 
			break; 
		}
	}
	nh=sa.length-n; 
	var valores=[n,valid,nh ]; 
	return valores; 
}


function borrar2(){
	document.getElementById('otabla').innerHTML="";
	document.getElementById('btabla2').innerHTML=""; 
}