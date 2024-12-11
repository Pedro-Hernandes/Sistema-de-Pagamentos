// Lista de usuários armazenada em memória
let users = [
    { id: 1, fullName: "João Silva", cpf: "11111111111", email: "joao@gmail.com", password: "1234", userType: "payer", balance: 500.00 },
    { id: 2, fullName: "Maria Souza", cpf: "22222222222", email: "maria@gmail.com", password: "1234", userType: "payee", balance: 0.00 }
];

// Função para verificar se o CPF ou e-mail já existe
function isUnique(cpf, email) {
    return !users.some(user => user.cpf === cpf || user.email === email);
}

// Função para cadastrar novo usuário
function addUser(fullName, cpf, email, password, userType) {
    if (!isUnique(cpf, email)) {
        alert("CPF ou e-mail já cadastrados!");
        return false;
    }

    const newUser = {
        id: users.length + 1,
        fullName,
        cpf,
        email,
        password,
        userType,
        balance: userType === "payer" ? 500.00 : 0.00
    };

    users.push(newUser);
    alert("Usuário cadastrado com sucesso!");
    updateUserList();
    return true;
}

// Função para exibir lista de usuários
function updateUserList() {
    const userList = document.getElementById("users");
    userList.innerHTML = "";

    users.forEach(user => {
        const listItem = document.createElement("li");
        listItem.textContent = `ID: ${user.id}, Nome: ${user.fullName}, Tipo: ${user.userType}, Saldo: R$ ${user.balance.toFixed(2)}`.replace('.', ',');

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "x";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = () => {
            if (confirm(`Tem certeza que deseja deletar o usuário ${user.fullName}?`)) {
                deleteUser(user.id);
            }
        };

        listItem.appendChild(deleteBtn);
        userList.appendChild(listItem);
    });
}

// Função para deletar usuário
function deleteUser(userId) {
    users = users.filter(user => user.id !== userId);
    updateUserList();
}

// Função para realizar transferência
function transferMoney(payerId, payeeId, value) {
    const payer = users.find(user => user.id === payerId);
    const payee = users.find(user => user.id === payeeId);

    if (!payer || !payee) {
        alert("Usuário(s) não encontrado(s).");
        return false;
    }

    if (payer.userType !== "payer") {
        alert("Apenas pagadores podem realizar transferências.");
        return false;
    }

    if (payer.balance < value) {
        alert("Saldo insuficiente para transferência.");
        return false;
    }

    // Realizar a transferência diretamente
    payer.balance -= value;
    payee.balance += value;
    alert(`Transferência de R$ ${value.toFixed(2).replace('.', ',')} realizada com sucesso!`);
    updateUserList();
    return true;
}

// Eventos para formulário de cadastro
document.getElementById("registration-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const fullName = document.getElementById("fullName").value;
    const cpf = document.getElementById("cpf").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const userType = document.getElementById("userType").value;

    addUser(fullName, cpf, email, password, userType);
});

// Eventos para formulário de transferência
document.getElementById("transfer-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const payerId = parseInt(document.getElementById("payerId").value);
    const payeeId = parseInt(document.getElementById("payeeId").value);
    let value = document.getElementById("value").value;

    // Converter vírgulas para pontos e transformar em número
    value = parseFloat(value.replace(',', '.'));
    if (isNaN(value) || value <= 0) {
        alert("Insira um valor válido para a transferência.");
        return;
    }

    transferMoney(payerId, payeeId, value);
});

// Atualizar lista inicial de usuários ao carregar a página
window.onload = () => {
    updateUserList();
};
