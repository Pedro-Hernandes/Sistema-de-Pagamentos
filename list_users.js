// Carregar os usuários cadastrados do localStorage
const users = JSON.parse(localStorage.getItem('users')) || [];

function formatCPF(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

// Função para exibir a lista de usuários
function displayUsers() {
    const userList = document.getElementById('userList').getElementsByTagName('tbody')[0];

    // Limpa a tabela antes de exibir os novos dados
    userList.innerHTML = '';

    if (users.length === 0) {
        const row = userList.insertRow();
        const cell = row.insertCell(0);
        cell.colSpan = 6;
        cell.textContent = 'Nenhum usuário cadastrado.';
    } else {
        users.forEach((user, index) => {
            const row = userList.insertRow();

            row.insertCell(0).textContent = user.fullName;
            row.insertCell(1).textContent = formatCPF(user.cpf);
            row.insertCell(2).textContent = user.email;
            row.insertCell(3).textContent = user.userType;
            row.insertCell(4).textContent = `R$${user.balance.toFixed(2)}`;
            
            const actionsCell = row.insertCell(5);
            // Botão Editar
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.onclick = () => editUser(index);
            actionsCell.appendChild(editButton);

            // Botão Deletar
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Deletar';
            deleteButton.onclick = () => deleteUser(index);
            actionsCell.appendChild(deleteButton);
        });
    }
}

// Função para editar um usuário
function editUser(index) {
    const user = users[index];
    
    // Preenche o formulário de edição com os dados do usuário selecionado
    document.getElementById('editFullName').value = user.fullName;
    document.getElementById('editCpf').value = user.cpf;
    document.getElementById('editEmail').value = user.email;
    document.getElementById('editPassword').value = user.password;
    document.getElementById('editUserType').value = user.userType;

    // Exibe o formulário de edição
    document.getElementById('editFormContainer').style.display = 'block';

    // Manipula o evento de envio do formulário de edição
    document.getElementById('editForm').onsubmit = function (e) {
        e.preventDefault();
        saveEditedUser(index);
    };
}

// Função para salvar as edições
function saveEditedUser(index) {
    const editedUser = {
        fullName: document.getElementById('editFullName').value,
        cpf: document.getElementById('editCpf').value,
        email: document.getElementById('editEmail').value,
        password: document.getElementById('editPassword').value,
        userType: document.getElementById('editUserType').value,
        balance: users[index].balance  // Mantém o saldo anterior
    };

    // Atualiza o usuário na lista
    users[index] = editedUser;
    localStorage.setItem('users', JSON.stringify(users));

    // Volta para a lista de usuários
    cancelEdit();
    displayUsers();
}

// Função para cancelar a edição
function cancelEdit() {
    document.getElementById('editFormContainer').style.display = 'none';
}

// Função para deletar um usuário
function deleteUser(index) {
    const confirmDelete = confirm('Você tem certeza que deseja excluir este usuário?');
    if (confirmDelete) {
        users.splice(index, 1);  // Remove o usuário da lista
        localStorage.setItem('users', JSON.stringify(users));
        displayUsers();  // Atualiza a lista
    }
}

// Chama a função para exibir os usuários ao carregar a página
window.onload = displayUsers;
