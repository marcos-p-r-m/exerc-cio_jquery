document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-tarefas');
    const nomesTarefas = [];
    const listaDeTarefas = document.getElementById('lista-de-tarefas');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        adicionaItemNaLista();
    });

    listaDeTarefas.addEventListener('click', function(e) {
        // Encontra o <li> pai do elemento clicado
        const itemClicado = e.target.closest('li');

        if (!itemClicado) return; // Se não clicou dentro de um <li>, sai.

        // Se o clique foi no botão/span de exclusão (o 'X')
        if (e.target.classList.contains('excluir-tarefa')) {
            const nomeTarefaRemover = itemClicado.querySelector('.texto-tarefa').textContent.toLowerCase().trim();

            listaDeTarefas.removeChild(itemClicado);

            const index = nomesTarefas.indexOf(nomeTarefaRemover);
            if (index > -1) {
                nomesTarefas.splice(index, 1);
            }
        }
        // Se o clique foi no ícone de cheque (o .checkbox-icon)
        else if (e.target.classList.contains('checkbox-icon')) {
            itemClicado.classList.toggle('tarefa-concluida');
            // Alterna o ícone de fa-square para fa-check-square e vice-versa
            e.target.classList.toggle('fa-square');
            e.target.classList.toggle('fa-check-square');
        }
        // Se o clique foi em qualquer outro lugar dentro do <li> (principalmente no texto da tarefa)
        else {
            itemClicado.classList.toggle('tarefa-concluida');
            // Encontra o ícone de cheque dentro do <li> e alterna seu estado visual
            const checkboxIcon = itemClicado.querySelector('.checkbox-icon');
            if (checkboxIcon) {
                checkboxIcon.classList.toggle('fa-square');
                checkboxIcon.classList.toggle('fa-check-square');
            }
        }
    });

    function adicionaItemNaLista() {
        const inputNomeTarefas = document.getElementById('nome-tarefas');
        const nomeDigitado = inputNomeTarefas.value.trim();

        if (nomeDigitado === '') {
            alert('Por favor, digite o nome da tarefa.');
            return;
        }

        const nomeNormalizado = nomeDigitado.toLowerCase();

        if (nomesTarefas.includes(nomeNormalizado)) {
            alert(`A tarefa: "${nomeDigitado}" já foi inserida.`);
        } else {
            nomesTarefas.push(nomeNormalizado);

            const novoItemLi = document.createElement('li');
            
            // 1. Ícone de Cheque (Font Awesome)
            const checkboxIcon = document.createElement('i'); // Usamos <i> para ícones do Font Awesome
            checkboxIcon.classList.add('fa-solid', 'fa-square', 'checkbox-icon'); // Classes do Font Awesome e nossa própria classe
            novoItemLi.appendChild(checkboxIcon);

            // 2. Span para o texto da tarefa
            const textoTarefa = document.createElement('span');
            textoTarefa.textContent = nomeDigitado;
            textoTarefa.classList.add('texto-tarefa'); // Adiciona uma classe para facilitar a seleção
            novoItemLi.appendChild(textoTarefa);

            // 3. Span para o botão de exclusão 'X'
            const botaoExcluir = document.createElement('span');
            botaoExcluir.textContent = 'X';
            botaoExcluir.classList.add('excluir-tarefa');
            novoItemLi.appendChild(botaoExcluir);

            listaDeTarefas.appendChild(novoItemLi);
        }

        inputNomeTarefas.value = '';
        inputNomeTarefas.focus();
    }
});
