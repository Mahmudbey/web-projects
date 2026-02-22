---
layout: page
title: publications
permalink: /publications/
nav: true
nav_order: 2
---

<style>
  /* Yillarni majburiy ko'rsatish */
  .year-header {
    color: #000000 !important;
    background-color: #f8f9fa !important;
    padding: 10px 15px !important;
    border-radius: 5px !important;
    margin: 30px 0 15px 0 !important;
    font-size: 1.5rem !important;
    font-weight: bold !important;
    border-left: 5px solid #007bff !important;
    display: block !important;
  }

  .section-header {
    color: #000 !important;
    border-bottom: 3px solid #007bff;
    margin-top: 50px;
    padding-bottom: 5px;
    text-transform: uppercase;
  }

  /* Raqamlashni majburiy qilish */
  .numbered-list {
    counter-reset: item;
    list-style-type: none;
    padding-left: 0;
  }
  .numbered-list li {
    display: block;
    position: relative;
    margin-bottom: 15px;
    padding-left: 35px;
  }
  .numbered-list li::before {
    content: counter(item) ".";
    counter-increment: item;
    position: absolute;
    left: 0;
    font-weight: bold;
    color: #007bff;
  }
</style>

<div class="publications">

  <div class="pub-filters" style="margin-bottom: 30px; padding: 20px; background: #fff; border: 1px solid #ddd; border-radius: 8px;">
    <input type="text" id="pubSearch" placeholder="Maqolalarni qidirish..." style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 6px;">
    <div style="margin-top: 15px; display: flex; gap: 10px;">
      <button onclick="exportData('bib')" class="btn btn-sm btn-primary">.BIB</button>
      <button onclick="exportData('csv')" class="btn btn-sm btn-success">.CSV</button>
      <button onclick="exportData('txt')" class="btn btn-sm btn-secondary">.TXT</button>
    </div>
  </div>

  <h1 class="section-header">Articles</h1>
  
  {% assign years = "2026,2025,2024,2023,2022,2021" | split: "," %}
  
  {% for year in years %}
    {% capture year_count %}{% bibliography -f papers -q @article[year={{year}}] %}{% endcapture %}
    {% if year_count != "" and year_count != " " %}
      <div class="year-block">
        <h2 class="year-header">{{ year }}</h2>
        <div class="numbered-list">
          {% bibliography -f papers -q @article[year={{year}}] %}
        </div>
      </div>
    {% endif %}
  {% endfor %}

  <h1 class="section-header">Conference Abstracts (Theses)</h1>
  <div class="numbered-list">
    {% bibliography -f papers -q @inproceedings %}
    {% bibliography -f papers -q @conference %}
  </div>

</div>

<script>
// Qidiruv va Eksport logikasi
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
    let results = [];
    items.forEach(item => {
        if (item.style.display !== "none") {
            results.push({
                title: item.querySelector('.title')?.innerText.trim() || "",
                author: item.querySelector('.author')?.innerText.trim() || "",
                journal: item.querySelector('.periodical')?.innerText.trim() || ""
            });
        }
    });
    if (type === 'csv') {
        let content = "Title,Author,Journal\n" + results.map(r => `"${r.title}","${r.author}","${r.journal}"`).join("\n");
        downloadFile(content, "publications.csv", "text/csv");
    } else if (type === 'txt') {
        let content = results.map(r => `${r.title}\n${r.author}\n${r.journal}\n`).join("\n---\n");
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
