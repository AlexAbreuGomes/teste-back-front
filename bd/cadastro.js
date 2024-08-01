// carrega o formulário
// carrega o formulário
const form = document.getElementById('formCadastro');

form.addEventListener('submit', async() => {
    
    

    // captura os valores do form
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;   
    const ano = document.getElementById('ano').value;

    // O método POST é usado para enviar dados para o servidor de forma segura e oculta
    // Ele é usado quando se deseja enviar informações sensíveis, como por exemplo,
    // quando se cadastrar um novo usuário, onde os dados do usuário são enviados
    // para o servidor, que os processa e os armazena em um banco de dados.
    const response = await fetch('/cadastraVeiculos', {
        method: 'POST',
        headers: {
            // define o cabeçalho
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ marca, modelo, ano }),
    })
    const data = await response.json();
    console.log('veículo cadastrado', data);
    
})
