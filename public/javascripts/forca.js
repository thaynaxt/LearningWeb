let palavraEscolhida;
let exibicaoPalavra;
let letrasChutadas;
let tentativasRestantes;
let numeroErros;
let dica; // Nova variável para armazenar a dica

async function buscarPalavraTema() {
    try {
        const response = await axios.get('/api/palavra'); // Chama a rota do servidor
        console.log('Resposta da API:', response.data); // Verifique o retorno da API no console
        return response.data; 
    } catch (error) {
        console.error('Erro ao buscar palavra:', error);
        return { palavra: 'palavra', dica: 'dica padrão' }; // Valores padrão em caso de erro
    }
}



async function iniciarJogo() {
    document.getElementById('botao-reiniciar').style.display = 'none';
    document.getElementById('entrada-letra').disabled = false;

    const resultado = await buscarPalavraTema(); // Chama a API
    palavraEscolhida = resultado.palavra; // Atribui a palavra retornada
    dica = resultado.dica; // Atribui a dica retornada

    console.log('Palavra escolhida:', palavraEscolhida);
    console.log('Dica:', dica);

    exibicaoPalavra = Array(palavraEscolhida.length).fill('_'); // Cria o array para exibir a palavra
    letrasChutadas = [];
    tentativasRestantes = 7;
    numeroErros = 0;

    atualizarExibicao(); // Atualiza a interface com os dados novos
}


function atualizarExibicao() {
    document.getElementById("exibicao-palavra").innerText = exibicaoPalavra.join(' ');
    document.getElementById("letras-chutadas").innerText = `${letrasChutadas.join(', ')}`;
    document.getElementById("dica").innerText = `Dica: ${dica}`; // Exibe a dica
    document.getElementById('mensagem').innerText = '';
    document.getElementById("imagem").src = `images/forca${numeroErros}.png`;

    if (tentativasRestantes === 0) {
        encerrarJogo('VOCÊ MORREU!');
    } else if (!exibicaoPalavra.includes('_')) {
        encerrarJogo('Parabéns! Você venceu!');
    }
}


function chutarLetra() {
    const entradaLetra = document.getElementById('entrada-letra');
    const letra = entradaLetra.value.toLowerCase();

    if (!letra.match(/[a-zà-ùç]/i)) {
        alert('Por favor, insira uma letra válida.');
        return;
    }

    if (letrasChutadas.includes(letra)) {
        alert('Você já tentou esta letra. Tente outra.');
        return;
    }

    letrasChutadas.push(letra);

    if (palavraEscolhida.includes(letra)) {
        for (let i = 0; i < palavraEscolhida.length; i++) {
            if (palavraEscolhida[i] === letra) {
                exibicaoPalavra[i] = letra;
            }
        }
    } else {
        tentativasRestantes--;
        numeroErros++;
    }

    entradaLetra.value = '';
    atualizarExibicao();
}

function encerrarJogo(mensagem) {
    document.getElementById('entrada-letra').disabled = true;
    document.getElementById('mensagem').style.display = 'block';
    document.getElementById('mensagem').innerText = `${mensagem} A palavra era: ${palavraEscolhida}`;
    document.getElementById('botao-reiniciar').style.display = 'block';
}


window.onload = iniciarJogo;
