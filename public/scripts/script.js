const firebaseConfig = {
    apiKey: "AIzaSyBjk40Nhp2TT7TO2tX3f4CpaTmFwghcwMA",
    authDomain: "ethandashboards.firebaseapp.com",
    projectId: "ethandashboards",
    storageBucket: "ethandashboards.appspot.com",
    messagingSenderId: "1057919709994",
    appId: "1:1057919709994:web:bda8f43bc4c6a58f2da453",
    measurementId: "G-JZW594J49M"
  };
  
  firebase.initializeApp(firebaseConfig);
  let auth = firebase.auth();
  
  // Função para realizar o login
  function login() {
    var email = document.getElementsByName('email')[0].value;
    var password = document.getElementsByName('password')[0].value;
  
    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            const user = userCredential.user;
  
            // Buscar informações do usuário após o login
            return buscarInfoUsuario(user.uid);
        })
        .then(userInfo => {
            if (userInfo) {
                // Redirecionar para o link armazenado na coleção do usuário
                window.location.href = "success.html";
            } else {
                console.error("Informações do usuário não encontradas ou link não especificado.");
                
            }
        })
        .catch(error => {
            console.log(error);
        });
  }
  
  // Após o login, busca informações do usuário
  // Adicione esta linha no início do seu código
  const db = firebase.firestore();
  
  // Após o login, busca informações do usuário
  function buscarInfoUsuario(uid) {
      return db.collection("users").doc(uid).get()
          .then(doc => {
              if (doc.exists) {
                  return doc.data();
              } else {
                  console.log("Nenhum documento encontrado para o UID:", uid);
                  return null;
              }
          })
          .catch(error => {
              console.error("Erro ao buscar informações do usuário:", error);
              return null;
          });
  }
  
  // Aguarde até que o corpo seja completamente carregado
  document.addEventListener('DOMContentLoaded', function () {
    // Adicione aqui qualquer código que precise ser executado após o carregamento do corpo
    // Pode incluir chamadas de função, manipulação de DOM, etc.
  
    // Exemplo: Adicionar um ouvinte de evento ao formulário
    var form = document.querySelector('.form');
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Impedir o envio padrão do formulário
        login(); // Chamar a função de login
    });
  });

  function togglePasswordVisibility() {
    var passwordInput = document.getElementById("passwordInput");
    var showPasswordIcon = document.getElementById("showPasswordIcon");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        showPasswordIcon.classList.remove("fa-eye");
        showPasswordIcon.classList.add("fa-eye-slash");
        showPasswordIcon.classList.add("none")
    } else {
        passwordInput.type = "password";
        showPasswordIcon.classList.remove("fa-eye-slash");
        showPasswordIcon.classList.add("fa-eye");
    }
}