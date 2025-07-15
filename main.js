document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-tarefas');
    const nomesTarefas = [];
    let itensListaHTML = '';
    const listaDeTarefas = document.getElementById('lista-de-tarefas'); // Referência direta à UL

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        adicionaItemNaLista();
        atualizaLista();
    });

    listaDeTarefas.addEventListener('click', function(e) {
        // Verifica se o clique foi em um <li>
        if (e.target.tagName === 'LI') {
            // Alterna a classe 'tarefa-concluida' no <li> clicado
            e.target.classList.toggle('tarefa-concluida');
        }
    });

    function adicionaItemNaLista() {
        const inputNomeTarefas = document.getElementById('nome-tarefas');
        const nomeDigitado = inputNomeTarefas.value.trim(); // Use .trim() para remover espaços em branco

        if (nomeDigitado === '') { // Impede adicionar tarefas vazias
            alert('Por favor, digite o nome da tarefa.');
            return;
        }

        const nomeNormalizado = nomeDigitado.toLowerCase();

        if (nomesTarefas.includes(nomeNormalizado)) {
            alert(`A tarefa: "${nomeDigitado}" já foi inserida.`);
        } else {
            nomesTarefas.push(nomeNormalizado);

            // Cria o elemento <li> diretamente para facilitar a manipulação
            const novoItemLi = document.createElement('li');
            novoItemLi.textContent = nomeDigitado; // Define o texto do item

            // Adiciona o novo item <li> à lista <ul>
            listaDeTarefas.appendChild(novoItemLi);
        }

        inputNomeTarefas.value = '';
        inputNomeTarefas.focus();
    }

    // A função atualizaLista não é mais necessária para adicionar itens
    // pois estamos adicionando diretamente ao DOM via appendChild
    function atualizaLista() {
        // Esta função pode ser usada para outras atualizações, se necessário.
        // No entanto, para adicionar itens, a abordagem com appendChild é mais eficiente.
    }
});
