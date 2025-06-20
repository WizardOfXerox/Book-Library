// loadChapters.js
import { chapters as rawChapters } from './chapters.js';

document.addEventListener('DOMContentLoaded', () => {
    const chapterGrid = document.querySelector('.chapter-grid');
    if (!chapterGrid) return;

    // Map chapters with fallback IDs and sort them
    const chapters = rawChapters.map((ch, i) => ({
            ...ch,
            id: ch.id || (i === 0 ? 'prologue' : `chapter-${i}`)
        }))
        .sort((a, b) => {
            const extractNumber = id =>
                id === 'prologue' ? 0 : parseInt((id.match(/\d+/) || ['0'])[0], 10);
            return extractNumber(a.id) - extractNumber(b.id);
        });


    chapters.forEach((chapter, i) => {
        const link = document.createElement('a');
        link.className = 'chapter-box';
        link.href = `./chapter.html#${chapter.id}`;

        // Format ID for display (e.g., "Chapter 1" or "Prologue")
        const displayId = chapter.id === 'prologue' ?
            'Prologue' :
            chapter.id.replace(/chapter-(\d+)/i, 'Chapter $1');

        link.innerHTML = `${displayId}<br><small>${chapter.title || ''}</small>`;
        chapterGrid.appendChild(link);
    });
});