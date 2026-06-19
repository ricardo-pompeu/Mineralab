// =========================
// Sidebar
// =========================

const openSidebar = document.getElementById("openSidebar");
const closeSidebar = document.getElementById("closeSidebar");
const sidebar = document.getElementById("sidebar");

if (openSidebar && closeSidebar && sidebar) {
    openSidebar.addEventListener("click", () => {
        sidebar.classList.add("active");
    });

    closeSidebar.addEventListener("click", () => {
        sidebar.classList.remove("active");
    });
}

// =========================
// Auto resize textarea
// =========================

const textarea = document.getElementById("texto");

if (textarea) {
    function ajustarAltura() {
        textarea.style.height = "160px";
        textarea.style.height = textarea.scrollHeight + "px";
    }

    textarea.addEventListener("input", ajustarAltura);
    ajustarAltura();
}

// =========================
// Botão voltar ao topo
// =========================

document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("returnUp-fix");

    if (!btn) {
        console.warn("Elemento #returnUp-fix não encontrado.");
        return;
    }

    function toggleButton() {
        if (window.scrollY > 400) {
            btn.classList.add("show");
        } else {
            btn.classList.remove("show");
        }
    }

    window.addEventListener("scroll", toggleButton);

    btn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    toggleButton();
});



document.addEventListener("DOMContentLoaded", () => {
    const root = document.documentElement;

    // 🌙 Aplica tema salvo (ou padrão light)
    const savedTheme = localStorage.getItem("theme") || "light";
    root.setAttribute("data-theme", savedTheme);

    // 🔧 Função central de aplicação de tema
    function applyTheme(theme) {
        root.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }

    // 🔘 Toggle automático (se existir botão na página)
    const toggleThemeButton = document.getElementById("toggle-theme");

    if (toggleThemeButton) {
        toggleThemeButton.addEventListener("click", () => {
            const currentTheme = root.getAttribute("data-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            applyTheme(newTheme);
        });
    }
});