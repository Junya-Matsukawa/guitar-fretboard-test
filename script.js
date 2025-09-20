const noteButtons = document.querySelectorAll('.note-button');
const resetButton = document.querySelector('.reset-button');  // ← 追加
const MAX_HISTORY = 6; // 記憶する最大数
let clickedHistory = []; // クリックされた音階の履歴を保存する配列

noteButtons.forEach(button => {
    button.addEventListener('click', () => {
        const clickedNote = button.dataset.note;

        const existingIndex = clickedHistory.indexOf(clickedNote);
        if (existingIndex > -1) {
            clickedHistory.splice(existingIndex, 1);
        }
        else {
            clickedHistory.unshift(clickedNote);
        }

        if (clickedHistory.length > MAX_HISTORY) {
            clickedHistory.pop();
        }

        noteButtons.forEach(btn => {
            btn.classList.forEach(className => {
                if (className.startsWith('active-')) {
                    btn.classList.remove(className);
                }
            });
        });

        clickedHistory.forEach((note, index) => {
            const colorClass = `active-${index + 1}`;
            const sameNoteButtons = document.querySelectorAll(`.note-button[data-note="${note}"]`);
            
            sameNoteButtons.forEach(sameNoteButton => {
                sameNoteButton.classList.add(colorClass);
            });
        });
    });
    
});

resetButton.addEventListener('click', () => {
    clickedHistory = [];
  
    noteButtons.forEach(btn => {
      btn.classList.forEach(className => {
        if (className.startsWith('active-')) {
          btn.classList.remove(className);
        }
      });
    });
  });