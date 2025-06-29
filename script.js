/******************************************************************
*
* Verified and Final script.js
* This structure ensures all code runs ONLY after the HTML is loaded.
*
*******************************************************************/

// --- 1. DEFINE ALL FUNCTIONS FIRST ---
// We define all our building blocks here, but we don't run them yet.

function renderProjects(projectData, containerId, isFeatured) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    projectData.forEach(project => {
        const card = document.createElement('div');
        card.className = `project-card ${isFeatured ? 'featured' : ''}`;
        card.setAttribute('data-category', project.category.toLowerCase());
        const tagsHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        card.innerHTML = `
            <div class="project-image"><i class="${project.icon || 'fas fa-star'}"></i></div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p class="project-category">${project.category}</p>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">${tagsHTML}</div>
            </div>`;
        container.appendChild(card);
    });
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// --- 2. DEFINE GLOBAL STATE ---
const ADMIN_PASSWORD = "admin"; // Change this!
let adminLoggedIn = false;
let tempFeaturedProjects = [];
let tempAllProjects = [];


// --- 3. WAIT FOR THE HTML TO BE READY, THEN RUN EVERYTHING ---
// This is the most important part. The code inside this block
// will not run until the entire HTML document is loaded and ready.
document.addEventListener('DOMContentLoaded', () => {

    // A quick check to make sure the data file was loaded.
    if (typeof featuredProjects === 'undefined' || typeof allProjects === 'undefined') {
        console.error("CRITICAL ERROR: Project data not found! Make sure 'projects-data.js' is loaded *before* 'script.js' in your HTML.");
        document.body.innerHTML = '<h1 style="color:red; text-align:center; margin-top: 50px;">Error: Project data could not be loaded.</h1>';
        return; // Stop the script
    }

    // Now it's safe to run our functions that touch the HTML
    renderProjects(featuredProjects, 'featured-projects-list', true);
    renderProjects(allProjects, 'projects-grid', false);
    
    // It's also safe to set up our event listeners now
    const adminButton = document.getElementById('open-admin-btn');
    if (adminButton) {
        adminButton.addEventListener('click', showAdminLogin);
    }

    window.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'e') {
            e.preventDefault();
            const adminPanel = document.getElementById('admin-panel');
            if (!adminPanel) return;
            if (adminPanel.style.display === 'none') {
                showAdminLogin();
            } else {
                adminPanel.style.display = 'none';
            }
        }
    });
    
    setupSmoothScrolling();
    
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);

});


// --- ALL ADMIN PANEL FUNCTIONS ---
function showAdminLogin() {
    if (adminLoggedIn) {
        showAdminDashboard();
        return;
    }
    const adminPanel = document.getElementById('admin-panel');
    if (!adminPanel) return;
    adminPanel.style.display = 'flex';
    adminPanel.innerHTML = `
        <div class="admin-login">
            <h3>Admin Login</h3>
            <input type="password" id="admin-password" placeholder="Password">
            <button id="admin-login-btn">Login</button>
            <button id="admin-cancel-btn">Cancel</button>
        </div>`;
    document.getElementById('admin-login-btn').onclick = handleAdminLogin;
    document.getElementById('admin-cancel-btn').onclick = () => { adminPanel.style.display = 'none'; };
    document.getElementById('admin-password').focus();
}

function handleAdminLogin() {
    const passwordInput = document.getElementById('admin-password');
    if (passwordInput && passwordInput.value === ADMIN_PASSWORD) {
        adminLoggedIn = true;
        tempFeaturedProjects = JSON.parse(JSON.stringify(featuredProjects));
        tempAllProjects = JSON.parse(JSON.stringify(allProjects));
        showAdminDashboard();
    } else {
        alert('Incorrect password.');
    }
}

function showAdminDashboard() {
    const adminPanel = document.getElementById('admin-panel');
    adminPanel.style.display = 'flex';
    adminPanel.innerHTML = `
        <div class="admin-dashboard">
            <div class="admin-header"><h2>Project Editor</h2><button id="admin-close-btn">&times;</button></div>
            <div class="admin-section">
                <h3>Generated Code</h3>
                <p>After editing, click "Generate Code", then copy the text below and paste it into your <strong>projects-data.js</strong> file.</p>
                <textarea id="generated-code" readonly></textarea>
                <div class="admin-buttons">
                    <button id="generate-code-btn">Generate Code</button>
                    <button id="copy-code-btn">Copy to Clipboard</button>
                </div>
            </div>
            <div class="admin-section" id="admin-project-forms"></div>
        </div>`;
    document.getElementById('admin-close-btn').onclick = () => { adminPanel.style.display = 'none'; };
    document.getElementById('generate-code-btn').onclick = generateCodeForOutput;
    document.getElementById('copy-code-btn').onclick = copyGeneratedCode;
    renderAdminForms();
}

function renderAdminForms() {
    const container = document.getElementById('admin-project-forms');
    container.innerHTML = `
        <h3>Edit Projects</h3>
        <h4>Featured Projects</h4>
        <div id="admin-featured-list"></div>
        <button class="add-new-btn" onclick="showEditForm('featured', -1)">+ Add New Featured Project</button>
        <h4>All Projects</h4>
        <div id="admin-all-projects-list"></div>
        <button class="add-new-btn" onclick="showEditForm('all', -1)">+ Add New Regular Project</button>
        <div id="edit-form-container" style="display:none;"></div>`;
    renderAdminProjectList('featured');
    renderAdminProjectList('all');
}

function renderAdminProjectList(type) {
    const listId = `admin-${type}-list`;
    const projects = type === 'featured' ? tempFeaturedProjects : tempAllProjects;
    document.getElementById(listId).innerHTML = projects.map((p, index) => `
        <div class="admin-project-item">
            <span>${p.title}</span>
            <div>
                <button onclick="showEditForm('${type}', ${index})">Edit</button>
                <button class="delete" onclick="deleteProject('${type}', ${index})">Delete</button>
            </div>
        </div>`).join('');
}

function showEditForm(type, index) {
    const projects = type === 'featured' ? tempFeaturedProjects : tempAllProjects;
    const project = index === -1 ? { title: '', category: '', description: '', tags: [], icon: 'fas fa-star' } : projects[index];
    const formContainer = document.getElementById('edit-form-container');
    formContainer.style.display = 'block';
    formContainer.innerHTML = `
        <form class="edit-form" onsubmit="event.preventDefault(); saveProject();">
            <h4>${index === -1 ? 'Add' : 'Edit'} Project</h4>
            <input type="hidden" id="edit-type" value="${type}">
            <input type="hidden" id="edit-index" value="${index}">
            <label>Title:</label><input type="text" id="edit-title" value="${project.title}" required>
            <label>Category:</label><input type="text" id="edit-category" value="${project.category}">
            <label>Description:</label><textarea id="edit-description">${project.description}</textarea>
            <label>Tags (comma-separated):</label><input type="text" id="edit-tags" value="${project.tags.join(', ')}">
            <label>FontAwesome Icon (e.g., fas fa-rocket):</label><input type="text" id="edit-icon" value="${project.icon}">
            <div class="admin-buttons">
                <button type="submit">Save</button>
                <button type="button" onclick="document.getElementById('edit-form-container').style.display='none'">Cancel</button>
            </div>
        </form>`;
}

function saveProject() {
    const type = document.getElementById('edit-type').value;
    const index = parseInt(document.getElementById('edit-index').value);
    const projects = type === 'featured' ? tempFeaturedProjects : tempAllProjects;
    const updatedProject = {
        title: document.getElementById('edit-title').value,
        category: document.getElementById('edit-category').value,
        description: document.getElementById('edit-description').value,
        tags: document.getElementById('edit-tags').value.split(',').map(t => t.trim()).filter(Boolean),
        icon: document.getElementById('edit-icon').value
    };
    if (index === -1) {
        projects.push(updatedProject);
    } else {
        projects[index] = updatedProject;
    }
    document.getElementById('edit-form-container').style.display = 'none';
    renderAdminProjectList(type);
}

function deleteProject(type, index) {
    if (!confirm('Are you sure you want to delete this project?')) return;
    const projects = type === 'featured' ? tempFeaturedProjects : tempAllProjects;
    projects.splice(index, 1);
    renderAdminProjectList(type);
}

function generateCodeForOutput() {
    const header = `// Auto-generated by Admin Panel on ${new Date().toLocaleString()}\n// Copy this entire content and paste it into your projects-data.js file.\n\n`;
    const featuredCode = `const featuredProjects = ${JSON.stringify(tempFeaturedProjects, null, 4)};`;
    const allProjectsCode = `const allProjects = ${JSON.stringify(tempAllProjects, null, 4)};`;
    document.getElementById('generated-code').value = `${header}${featuredCode}\n\n${allProjectsCode}`;
    alert('Code generated! You can now copy it.');
}

function copyGeneratedCode() {
    const codeArea = document.getElementById('generated-code');
    if (!codeArea.value) {
        alert('Please generate the code first.');
        return;
    }
    navigator.clipboard.writeText(codeArea.value)
        .then(() => alert('Code copied to clipboard!'))
        .catch(err => alert('Failed to copy. Please copy manually.'));
}