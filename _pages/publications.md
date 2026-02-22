---
layout: page
title: publications
permalink: /publications/
nav: true
nav_order: 2
---

<style>
  h2.year { 
    color: #000000 !important; 
    border-bottom: 2px solid #333; 
    margin-top: 40px;
    font-weight: bold;
  }
  .section-title {
    background: #f1f1f1;
    padding: 10px;
    margin-top: 20px;
    border-left: 5px solid #007bff;
    font-weight: bold;
    text-transform: uppercase;
  }
  /* Avtomatik raqamlash tizimi */
  ol.bibliography {
    list-style: none;
    counter-reset: pub-counter;
  }
  ol.bibliography > li {
    counter-increment: pub-counter;
    position: relative;
    margin-bottom: 15px;
  }
  ol.bibliography > li::before {
    content: counter(pub-counter) ". ";
    font-weight: bold;
    position: absolute;
    left: -25px;
    color: #333;
  }
</style>

<div class="publications">

  <div class="pub-filters" style="margin-bottom: 30px; padding: 20px; background: #fafafa; border: 1px solid #ddd; border-radius: 8px;">
    <input type="text" id="pubSearch" placeholder="Qidiruv..." style="width: 100%; padding: 10px; border-radius: 5px; border: 1px solid #ccc;">
    <div style="margin-top: 15px;">
      <button onclick="exportData('bib')" class="btn btn-sm btn-primary">.BIB</button>
      <button onclick="exportData('csv')" class="btn btn-sm btn-success">.CSV</button>
      <button onclick="exportData('txt')" class="btn btn-sm btn-secondary">.TXT</button>
    </div>
  </div>

  <h1 class="section-title">Articles</h1>
  {% bibliography -f papers -q @article %}

  <h1 class="section-title" style="margin-top: 50px;">Conference Abstracts (Theses)</h1>
  <p style="color: #666; font-style: italic;">Ushbu bo'limga tezislar keyinchalik qo'shiladi.</p>
  </div>

<script>
document.getElementById('pubSearch').addEventListener('keyup', function() {
  let filter = this.value.toLowerCase();
  let items = document.querySelectorAll('.bibliography > li');
  items.forEach(item => {
    item.style.display = item.innerText.toLowerCase().includes(filter) ? "" : "none";
  });
});

function exportData(type) {
  if (type === 'bib') {
    window.open('{{ site.baseurl }}/assets/bibliography/papers.bib', '_blank');
    return;
  }
  let items = document.querySelectorAll('.bibliography > li');
  let data = [];
  items.forEach(item => {
    if (item.style.display !== "none") {
      data.push({
        title: item.querySelector('.title')?.innerText.trim() || "",
        author: item.querySelector('.author')?.innerText.trim() || "",
        info: item.querySelector('.periodical')?.innerText.trim() || ""
      });
    }
  });
  if (type === 'csv') {
    let content = "Title,Author,Journal\n" + data.map(d => `"${d.title}","${d.author}","${d.info}"`).join("\n");
    downloadFile(content, "publications.csv", "text/csv");
  } else if (type === 'txt') {
    let content = data.map(d => `${d.title}\n${d.author}\n${d.info}\n`).join("\n---\n");
    downloadFile(content, "publications.txt", "text/plain");
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
