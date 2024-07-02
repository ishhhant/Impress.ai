document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('userForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const usersTableBody = document.getElementById('usersTableBody');
    let userIdCounter = 1; // Initialize user ID counter
    let currentlyEditingUserId = null; // Track the ID of the user currently being edited
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
  
      if (name === '' || email === '') {
        alert('Please enter both name and email.');
        return;
      }
  
      if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
      }
  
      if (currentlyEditingUserId === null) {
        addUserToTable(userIdCounter, name, email);
        userIdCounter++;
      } else {
        updateUserInTable(currentlyEditingUserId, name, email);
        currentlyEditingUserId = null;
      }
  
      form.reset(); // Reset form after submission
      toggleFormMode('add');
    });
  
    function addUserToTable(id, name, email) {
      const row = document.createElement('tr');
      row.setAttribute('data-id', id); // Set user ID as a data attribute
      row.innerHTML = `
        <td>${id}</td>
        <td>${name}</td>
        <td>${email}</td>
        <td class="ant-table-action">
          <button class="ant-btn ant-btn-primary edit-button" data-id="${id}">Edit</button>
          <button class="ant-btn ant-btn-danger delete-button" data-id="${id}">Delete</button>
        </td>
      `;
      usersTableBody.appendChild(row);
  
      // Add event listeners for edit and delete buttons
      const editButton = row.querySelector('.edit-button');
      editButton.addEventListener('click', function() {
        editUser(id, name, email);
      });
  
      const deleteButton = row.querySelector('.delete-button');
      deleteButton.addEventListener('click', function() {
        const confirmDelete = confirm(`Are you sure you want to delete user ID ${id}?`);
        if (confirmDelete) {
          row.remove();
        }
      });
    }
  
    function editUser(id, name, email) {
      nameInput.value = name;
      emailInput.value = email;
      currentlyEditingUserId = id;
      toggleFormMode('edit');
    }
  
    function updateUserInTable(id, name, email) {
      const rows = usersTableBody.querySelectorAll('tr');
      rows.forEach(row => {
        if (row.getAttribute('data-id') === id.toString()) {
          row.children[1].textContent = name;
          row.children[2].textContent = email;
        }
      });
    }
  
    function toggleFormMode(mode) {
      if (mode === 'add') {
        document.getElementById('addUser').style.display = 'inline-block';
        document.getElementById('editUser').style.display = 'none';
        document.getElementById('cancelEdit').style.display = 'none';
      } else if (mode === 'edit') {
        document.getElementById('addUser').style.display = 'none';
        document.getElementById('editUser').style.display = 'inline-block';
        document.getElementById('cancelEdit').style.display = 'inline-block';
      }
    }
  
    function isValidEmail(email) {
      // Basic email validation regex
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }
  
    // Cancel edit mode
    document.getElementById('cancelEdit').addEventListener('click', function() {
      currentlyEditingUserId = null;
      form.reset();
      toggleFormMode('add');
    });
  });
  