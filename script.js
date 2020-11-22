var lista = [
    'ITSaVERYvERYvEryVeryVERYvERYvEryVeryVERYvERYvEryVeryVERYvERYvEryVeryVERYvERYvEryVeryLongName',
    'ITSaVERYvERYvEryVeryVERYvERYvEryVeryVERYvERYvEryVeryVERYvERYvEryVeryVERYvERYvEryVeryLongName',
    'ITSaVERYvERYvEryVeryVERYvERYvEryVeryVERYvERYvEryVeryVERYvERYvEryVeryVERYvERYvEryVeryLongName',
    'ITSaVERYvERYvEryVeryVERYvERYvEryVeryVERYvERYvEryVeryVERYvERYvEryVeryVERYvERYvEryVeryLongName',
    'ITSaVERYvERYvEryVeryVERYvERYvEryVeryVERYvERYvEryVeryVERYvERYvEryVeryVERYvERYvEryVeryLongName',
    'ITSaVERYvERYvEryVeryVERYvERYvEryVeryVERYvERYvEryVeryVERYvERYvEryVeryVERYvERYvEryVeryLongName',
    'ITSaVERYvERYvEryVeryVERYvERYvEryVeryVERYvERYvEryVeryVERYvERYvEryVeryVERYvERYvEryVeryLongName'
];

/*Insere os elementos de um array em um elemento da DOM
* @param {Array} listas
* @param  String seletor, seletor de onde será renderizada a lista
*/
function renderizaLista(lista, seletor){
    var html = '';

    lista.forEach(function(item){
        html += '<li>' + item + '</li>';
    });

    document.querySelector(seletor).innerHTML = html;
}

renderizaLista(lista, '[lista-nomes]');

var listaReduzida = reduzirNomes(lista,3,60,22);
renderizaLista(listaReduzida, '[lista-nomes-reduzidos]');



/*Retorna a lista em ordem alfabética ex: Aa,AAa,B,b,c
* @param {Array} listas
* @param int metodo , método a ser seguido, varia pois há variação na estrutura dos arrays
* ***************************************************
* Método 1 = Usado na index de formulários
* Método 2 = Usado na formulário HTML
*/
function ordenarLista(listas, metodo) {

	listas.sort(function(a,b){

		if(metodo === 1){

			return a['text'].toLowerCase().localeCompare(b['text'].toLowerCase());

		}else if(metodo === 2){

			return a[1].toLowerCase().localeCompare(b[1].toLowerCase());

		}
		
	});

	return listas;
}

/* Gera o nome de forma reduzida 
*  @param String nome 
*  @param int maximo - maximo de caracteres antes de reduzir
*  @param int limite - número de caracteres em cada ponta ex : 15...15
*/
function geraNomeReduzido(nome, maximo, limite) {
	return nome.length > maximo ? nome.slice(0, limite) + '...' + nome.slice(nome.length - limite, nome.length) : nome;
}


/* Renderiza as listas na DOM
*  @param {array} listas - Array com o nome das listas
*  @param int metodo 
*  @param String seletor, seletor de onde as listas são renderizadas na DOM
*/
function renderListas(listas, metodo, seletor) {

	var htmlListas = '';

	var containerListas = document.querySelector(seletor);

	if(metodo === 1){

		listas.forEach(function(lista) {
			
			var selecionado = lista['selected'] ? 'selected="selected"' : '';
			htmlListas += '<option ' + selecionado + ' value=' +lista['id'] +'>'+ lista['text'] +'</option>';
		
		});
	}else if(metodo === 2){

		listas.forEach(function(lista) {
			htmlListas += '<option  value=' +lista[0] +'>'+ lista[1] +'</option>';
		});

	}
	
	containerListas.innerHTML = htmlListas;
}


/*Gera um array com nomes reduzidos das listas
* @param {array} listas - Array com o nome das listas
* @param int metodo - Qual metodo de ordenação seguir
* @param int maximo - maximo de caracteres antes de reduzir
* @param int limite - número de caracteres em cada ponta ex : 15...15
*/

function reduzirNomes(listas, metodo, maximo, limite) {

	var listasReduzidas = [];

	if(metodo === 1){

		listas.forEach(function(lista){
			lista['text'] = geraNomeReduzido(lista['text'], maximo, limite);
			listasReduzidas.push(lista);
		});

	}else if(metodo === 2){

		listas.forEach(function(lista){
			lista[1] = geraNomeReduzido(lista[1], maximo, limite);
			listasReduzidas.push(lista);
		});

	}else if(metodo === 3){

        listas.forEach(function(lista){
			lista = geraNomeReduzido(lista, maximo, limite);
			listasReduzidas.push(lista);
        });
        
    }
	
	return listasReduzidas;
}

/*Inicializa a redução de listas
* @Param {array} listas - Array com os nomes das listas
* @param int metodo - Qual metodo de ordenação seguir
* @param int maximo - maximo de caracteres antes de reduzir
* @param int limite - número de caracteres em cada ponta ex : 15...15
* @param String seletorContainer, seletor de onde as listas são renderizadas na DOM
*/
function initReducaoListas(listas, metodo, maximo, limite, seletorContainer){

	if(listas){
		
		var arraylistas = JSON.parse(listas);
		ordenarLista(arraylistas, metodo);
		var listasReduzidas = reduzirNomes(arraylistas,metodo, maximo, limite);
		renderListas(listasReduzidas, metodo, seletorContainer);

	}
}

//Index formulários - Form POPUP
var listas1 = window.listasFormsIndex;
initReducaoListas(listas1, 1, 70, 32, '#listaPopup');

//Página Form HTML
var listas2 = window.listasFormHTML;
initReducaoListas(listas2, 2, 45, 22, '#selLista');