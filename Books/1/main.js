import { chapters as rawChapters } from './chapters.js';

const chapters = rawChapters.map((ch, i) => ({
    ...ch,
    id: ch.id || `chapter-${i}`
}));

let currentChapterIndex = 0;

const chapterListEl = document.getElementById('chapterList');
const chapterTitleEl = document.getElementById('chapterTitle');
const chapterContentEl = document.getElementById('chapterContent');
const container = document.getElementById('container');
const prevBtn = document.getElementById('prevChapter');
const nextBtn = document.getElementById('nextChapter');
const themeToggleBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const sidebar = document.getElementById('sidebar');
const menuToggleBtn = document.querySelector('.menu-toggle');

function breakAfterSentences(containerId, sentencesPerBreak = 5) {
    const container = document.getElementById(containerId);
    const text = container.textContent;
    const sentences = text.match(/[^.!?]+[.!?]+["']?\s*/g);
    if (!sentences) return;

    let result = '';
    sentences.forEach((sentence, i) => {
        result += sentence.trim();
        if ((i + 1) % sentencesPerBreak === 0 && i !== sentences.length - 1) {
            result += '<br><br>';
        } else {
            result += ' ';
        }
    });

    container.innerHTML = result.trim();
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        themeIcon.textContent = 'brightness_7';
    } else {
        document.body.classList.remove('dark');
        themeIcon.textContent = 'brightness_4';
    }
}
loadTheme();

function saveTheme(theme) {
    localStorage.setItem('theme', theme);
}

themeToggleBtn.addEventListener('click', () => {
    if (document.body.classList.contains('dark')) {
        document.body.classList.remove('dark');
        themeIcon.textContent = 'brightness_4';
        saveTheme('light');
    } else {
        document.body.classList.add('dark');
        themeIcon.textContent = 'brightness_7';
        saveTheme('dark');
    }
});

function renderChapterList() {
    chapterListEl.innerHTML = '';
    chapters.forEach((ch, i) => {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        btn.className = 'chapter-item';
        btn.textContent = ch.title;
        btn.setAttribute('aria-current', i === currentChapterIndex ? 'page' : 'false');
        if (i === currentChapterIndex) btn.classList.add('active');
        btn.type = 'button';
        btn.onclick = () => selectChapter(i);
        li.appendChild(btn);
        chapterListEl.appendChild(li);
    });
}

function updateNavButtons() {
    prevBtn.disabled = currentChapterIndex <= 0;
    nextBtn.disabled = currentChapterIndex >= chapters.length - 1;
}

/*
function selectChapter(index) {
    if (index < 0 || index >= chapters.length) return;
    currentChapterIndex = index;
    const ch = chapters[index];
    chapterTitleEl.textContent = ch.title;
    chapterContentEl.textContent = ch.content;
    breakAfterSentences('chapterContent', 5);
    renderChapterList();
    updateNavButtons();

    if (window.innerWidth <= 1024) {
        sidebar.classList.remove('open');
        menuToggleBtn.setAttribute('aria-expanded', 'false');
    }

    chapterTitleEl.focus();
} */

function selectChapter(index, updateHash = true) {
    if (index < 0 || index >= chapters.length) return;
    currentChapterIndex = index;
    const ch = chapters[index];

    chapterTitleEl.textContent = ch.title;
    chapterContentEl.textContent = ch.content;
    breakAfterSentences('chapterContent', 5);
    renderChapterList();
    updateNavButtons();

    if (updateHash) {
        window.location.hash = ch.id; // 👈 update URL hash
    }

    if (window.innerWidth <= 1024) {
        sidebar.classList.remove('open');
        menuToggleBtn.setAttribute('aria-expanded', 'false');
    }

    chapterTitleEl.focus();
}

const initialHash = window.location.hash.substring(1); // Remove the #
if (initialHash) {
    const index = chapters.findIndex(ch => ch.id === initialHash);
    if (index !== -1) {
        selectChapter(index, false); // false = don't update hash again
    }
}

prevBtn.addEventListener('click', () => {
    if (currentChapterIndex > 0) selectChapter(currentChapterIndex - 1);
});

nextBtn.addEventListener('click', () => {
    if (currentChapterIndex < chapters.length - 1) selectChapter(currentChapterIndex + 1);
});

menuToggleBtn.addEventListener('click', () => {
    const isOpen = sidebar.classList.toggle('open');
    container.classList.toggle('sidebar-closed', !isOpen);
    menuToggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

selectChapter(0);

window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && !e.shiftKey && !e.altKey) {
        if (e.code === 'KeyN') {
            e.preventDefault();
            if (currentChapterIndex < chapters.length - 1) {
                selectChapter(currentChapterIndex + 1);
            }
        } else if (e.code === 'KeyP') {
            e.preventDefault();
            if (currentChapterIndex > 0) {
                selectChapter(currentChapterIndex - 1);
            }
        } else if (e.code === 'KeyT') {
            e.preventDefault();
            themeToggleBtn.click();
        }
    }
});