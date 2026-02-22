---
layout: page
title: publications
permalink: /publications/
nav: true
nav_order: 2
---

<div class="publications">

  <div class="pub-filters" style="margin-bottom: 30px; padding: 20px; background: #fdfdfd; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
    <h5 style="margin-top: 0;">🔎 Maqolalarni qidirish va yuklash</h5>
    <input type="text" id="pubSearch" placeholder="Sarlavha, muallif yoki yil..." 
           style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 6px; margin-bottom: 15px;">
    
    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
      <button onclick="exportData('bib')" class="btn btn-sm" style="background: #007bff; color: white;">Eksport .BIB</button>
      <button onclick="exportData('csv')" class="btn btn-sm" style="background: #28a745; color: white;">Eksport .CSV</button>
      <button onclick="exportData('txt')" class="btn btn-sm" style="background: #6c757d; color: white;">Eksport .TXT</button>
    </div>
  </div>

  <div id="publications-list">
    {% bibliography %}
  </div>

</div>

<script>
// Filtr funksiyasi
document.getElementById('pubSearch').addEventListener('keyup', function() {
    let filter = this.value.toLowerCase();
    let items = document.querySelectorAll('.bibliography > li');
    items.forEach(item => {
        let text = item.innerText.toLowerCase();
        item.style.display = text.includes(filter) ? "" : "none";
    });
});

// Mukammal Eksport (Hamma ma'lumotlarni yig'ish)
function exportData(type) {
    if (type === 'bib') {
        // MUHIM: Fayl assets papkasida bo'lishi kerak
        window.open('{{ site.baseurl }}/assets/bibliography/papers.bib', '_blank');
        return;
    }

    let items = document.querySelectorAll('.bibliography > li');
    let results = [];

    items.forEach(item => {
        if (item.style.display !== "none") {
            let title = item.querySelector('.title')?.innerText.trim() || "";
            let author = item.querySelector('.author')?.innerText.trim() || "";
            let periodical = item.querySelector('.periodical')?.innerText.trim() || "";
            let doi = item.querySelector('a[href*="doi.org"]')?.innerText.trim() || "";
            
            // Periodical matnidan yil, jild va sahifalarni ajratishga urinish
            results.push({ title, author, periodical, doi });
        }
    });

    if (type === 'csv') {
        let csv = "Title,Authors,Journal Info,DOI\n";
        results.forEach(r => {
            csv += `"${r.title.replace(/"/g, '""')}","${r.author.replace(/"/g, '""')}","${r.periodical.replace(/"/g, '""')}","${r.doi}"\n`;
        });
        downloadFile(csv, "publications.csv", "text/csv");
    } else if (type === 'txt') {
        let txt = results.map(r => `TITL: ${r.title}\nAUTH: ${r.author}\nJOUR: ${r.periodical}\nDOI: ${r.doi}\n`).join("\n---\n");
        downloadFile(txt, "publications.txt", "text/plain");
    }
}

function downloadFile(content, fileName, contentType) {
    let a = document.createElement("a");
    let file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}
</script>

<style>
  .bibliography li { margin-bottom: 20px; list-style: none; }
  .btn { cursor: pointer; border-radius: 4px; padding: 5px 15px; border: none; font-size: 0.85rem; }
  .btn:hover { opacity: 0.9; }
</style>
