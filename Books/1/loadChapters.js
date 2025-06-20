// loadChapters.js
import { chapters } from './chapters.js';

document.addEventListener('DOMContentLoaded', () => {
    const chapterGrid = document.querySelector('.chapter-grid');

    if (!chapterGrid) return;

    chapters.forEach(chapter => {
        const link = document.createElement('a');
        link.className = 'chapter-box';
        link.href = `./chapter.html#${chapter.id}`;
        link.innerHTML = `${chapter.title}<br><small>${chapter.subtitle}</small>`;
        chapterGrid.appendChild(link);
    });
});