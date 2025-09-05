document.addEventListener('DOMContentLoaded', () => {
    const addEmployeeBtn = document.getElementById('addEmployeeBtn');
    const employeeModal = document.getElementById('employeeModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const employeeForm = document.getElementById('employeeForm');
    const employeeTableBody = document.querySelector('#employeeTable tbody');
    const submitBtn = document.getElementById('submitBtn');
  
    let employees = [];
    let editingIndex = null;
  
    // Abre o modal para adicionar funcionário
    addEmployeeBtn.addEventListener('click', () => {
      editingIndex = null;
      employeeForm.reset();
      submitBtn.textContent = 'Adicionar';
      document.getElementById('modalTitle').textContent = 'Adicionar Funcionário';
      employeeModal.style.display = 'block';
    });
  
    // Fecha o modal
    closeModalBtn.addEventListener('click', () => {
      employeeModal.style.display = 'none';
    });
  
    // Fecha modal clicando fora da área do conteúdo
    window.addEventListener('click', (event) => {
      if (event.target === employeeModal) {
        employeeModal.style.display = 'none';
      }
    });
  
    // Atualiza a tabela com os funcionários
    function renderTable() {
      employeeTableBody.innerHTML = '';
  
      employees.forEach((emp, index) => {
        const row = document.createElement('tr');
  
        row.innerHTML = `
          <td>${emp.name}</td>
          <td>${emp.role}</td>
          <td>
            <button class="edit-btn" data-index="${index}">Editar</button>
            <button class="delete-btn" data-index="${index}">Excluir</button>
          </td>
        `;
  
        employeeTableBody.appendChild(row);
      });
  
      // Adiciona eventos aos botões de editar
      document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', (e) => {
          const idx = e.target.getAttribute('data-index');
          editingIndex = idx;
          document.getElementById('modalTitle').textContent = 'Editar Funcionário';
          submitBtn.textContent = 'Salvar';
          const emp = employees[idx];
          employeeForm.employeeName.value = emp.name;
          employeeForm.employeeRole.value = emp.role;
          employeeModal.style.display = 'block';
        });
      });
  
      // Adiciona eventos aos botões de excluir
      document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (e) => {
          const idx = e.target.getAttribute('data-index');
          if (confirm('Tem certeza que deseja excluir este funcionário?')) {
            employees.splice(idx, 1);
            renderTable();
          }
        });
      });
    }
  
    // Quando o formulário for submetido (adicionar ou editar)
    employeeForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const name = employeeForm.employeeName.value.trim();
      const role = employeeForm.employeeRole.value.trim();
  
      if (!name || !role) {
        alert('Por favor, preencha todos os campos!');
        return;
      }
  
      if (editingIndex !== null) {
        // Editar funcionário existente
        employees[editingIndex] = { name, role };
      } else {
        // Adicionar novo funcionário
        employees.push({ name, role });
      }
  
      renderTable();
      employeeModal.style.display = 'none';
    });
  
    // Inicializa tabela vazia
    renderTable();
  });
