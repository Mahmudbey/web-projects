document.getElementById('pubSearch').addEventListener('keyup', function() {
    let filter = this.value.toLowerCase();
    let items = document.querySelectorAll('.bibliography > li');
    items.forEach(item => {
        let text = item.innerText.toLowerCase();
        item.style.display = text.includes(filter) ? "" : "none";
    });
});

function exportData(type) {
    let items = document.querySelectorAll('.bibliography > li');
    let data = [];
    
    items.forEach(item => {
        if (item.style.display !== "none") {
            // Ma'lumotlarni aniq klasslar bo'yicha yig'ish
            let title = item.querySelector('.title')?.innerText.trim() || "";
            let author = item.querySelector('.author')?.innerText.trim() || "";
            let periodical = item.querySelector('.periodical')?.innerText.trim() || "";
            
            // Yilni periodical matni ichidan ajratib olish (masalan, "Mathematics, 2026")
            let yearMatch = periodical.match(/\d{4}/);
            let year = yearMatch ? yearMatch[0] : "";
            
            // DOI linkini topish
            let doiLink = item.querySelector('a[href*="doi.org"]')?.href || "";
            let doi = doiLink.split('doi.org/')[1] || "";

            data.push({ title, author, journal: periodical.replace(year, "").replace(/, $/, ""), year, doi });
        }
    });

    if (type === 'csv') {
        const header = "Title,Authors,Journal,Year,DOI\n";
        const rows = data.map(d => `"${d.title}","${d.author}","${d.journal}","${d.year}","${d.doi}"`).join("\n");
        downloadFile(header + rows, "publications_export.csv", "text/csv");
    } else if (type === 'txt') {
        const content = data.map(d => 
            `TITLE: ${d.title}\nAUTHORS: ${d.author}\nJOURNAL: ${d.journal}\nYEAR: ${d.year}\nDOI: ${d.doi}\n`
        ).join("\n---\n");
        downloadFile(content, "publications_citations.txt", "text/plain");
    } else if (type === 'bib') {
        // Asosiy .bib fayliga yo'naltirish
        window.open('/publication/assets/bibliography/papers.bib', '_blank');
    }
}

function downloadFile(content, fileName, contentType) {
    let a = document.createElement("a");
    let file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}
