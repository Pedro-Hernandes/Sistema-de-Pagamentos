// Função para formatar o CPF
function formatCPF(cpf) {
    return cpf.replace(/\D/g, '') // Remove caracteres não numéricos
        .replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
}

// Função para validar CPF (exemplo simples)
function validateCPF(cpf) {
    // Aqui você pode colocar uma validação mais completa de CPF
    return cpf.length === 14;
}

let users = JSON.parse(localStorage.getItem('users')) || [];

// Função para cadastrar um novo usuário
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Coletar dados do formulário
    const fullName = document.getElementById('fullName').value;
    const cpf = document.getElementById('cpf').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const userType = document.getElementById('userType').value;

    // Validar CPF
    if (!validateCPF(cpf)) {
        alert('CPF inválido');
        return;
    }

    // Verificar se CPF ou E-mail já estão cadastrados
    const existingUser = users.find(user => user.cpf === cpf || user.email === email);
    if (existingUser) {
        alert('CPF ou E-mail já cadastrados!');
        return;
    }

    // Criar novo usuário
    const newUser = {
        id: users.length + 1,
        fullName: fullName,
        cpf: formatCPF(cpf),
        email: email,
        password: password,
        userType: userType,
        balance: 0 // Novo usuário começa com saldo 0
    };

    // Adicionar usuário à lista
    users.push(newUser);

    // Armazenar lista de usuários no localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Redirecionar para a página de lista de usuários
    window.location.href = "list_users.html";
});
