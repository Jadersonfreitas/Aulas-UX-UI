const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const pages = document.querySelectorAll('.page');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const firstPageBtn = document.getElementById('first-page');

let currentPage = 0;

// Função para alternar entre os temas claro e escuro
function toggleTheme() {
  body.classList.toggle('light-theme');
}

// Função para exibir a página atual
function showPage(index) {
  pages.forEach((page, i) => {
    if (i === index) {
      page.classList.add('active');
    } else {
      page.classList.remove('active');
    }
  });
}

// Função para avançar para a próxima página
function nextPage() {
  if (currentPage === pages.length - 1) {
    return; // Não faz nada se estiver na última página
  }
  currentPage++;
  showPage(currentPage);
}

// Função para voltar para a página anterior
function prevPage() {
  if (currentPage === 0) {
    return; // Não faz nada se estiver na primeira página
  }
  currentPage--;
  showPage(currentPage);
}

// Função para voltar para a primeira página
function firstPage() {
  currentPage = 0;
  showPage(currentPage);
}

// Eventos de clique para os botões
themeToggle.addEventListener('click', toggleTheme);
prevPageBtn.addEventListener('click', prevPage);
nextPageBtn.addEventListener('click', nextPage);
firstPageBtn.addEventListener('click', firstPage);

// Exibir a primeira página inicialmente
showPage(currentPage);