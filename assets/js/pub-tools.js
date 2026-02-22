// 1. Haqiqiy vaqtda qidirish (Filtering)
document.getElementById('pubSearch').addEventListener('keyup', function() {
    let filter = this.value.toLowerCase();
    let items = document.querySelectorAll('.bibliography > li');

    items.forEach(item => {
        let text = item.innerText.toLowerCase();
        item.style.display = text.includes(filter) ? "" : "none";
    });
});

// 2. Eksport qilish funksiyasi
function exportData(type) {
    let items = document.querySelectorAll('.bibliography > li');
    let data = [];
    
    items.forEach(item => {
        if (item.style.display !== "none") {
            let title = item.querySelector('.title')?.innerText || "";
            let author = item.querySelector('.author')?.innerText || "";
            let period = item.querySelector('.periodical')?.innerText || "";
            data.push({ title, author, period });
        }
    });

    if (type === 'csv') {
        let content = "Title,Author,Journal/Source\n" + data.map(d => `"${d.title}","${d.author}","${d.period}"`).join("\n");
        downloadFile(content, "my_publications.csv", "text/csv");
    } else if (type === 'txt') {
        let content = data.map(d => `${d.title}\n${d.author}\n${d.period}\n`).join("\n---\n");
        downloadFile(content, "my_publications.txt", "text/plain");
    } else if (type === 'bib') {
        // Bu qismpapers.bib faylidagi barcha ma'lumotlarni yuklab olishni soddalashtiradi
        window.open('/assets/bibliography/papers.bib', '_blank');
    }
}

function downloadFile(content, fileName, contentType) {
    let a = document.createElement("a");
    let file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}
