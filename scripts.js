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