---
layout: page
title: publications
permalink: /publications/
nav: true
nav_order: 2
---

<style>
  /* 1. Global font o'lchamini bir xil qilish */
  .publications, 
  .publications .title, 
  .publications .author, 
  .publications .periodical, 
  .publications .links a {
    font-size: 1rem !important; /* Hamma yozuvlar bir xil o'lchamda */
    line-height: 1.5 !important;
  }

  /* 2. O'ng tarafdagi ko'rinmas yoki ortiqcha yilni o'chirish */
  .publications .year, 
  .publications .badge {
    display: none !important; /* Bibliografiya ichidagi yillarni butunlay yashiradi */
  }

  /* 3. Chap tarafdagi yillarni qora va aniq qilish */
  .year-header {
    color: #000000 !important;
    background-color: #f0f0f0 !important;
    padding: 10px 15px !important;
    display: block !important;
    border-radius: 4px !important;
    margin: 40px 0 20px 0 !important;
    font-size: 1.2rem !important; /* Faqat yil sarlavhasi biroz ajralib turadi */
    font-weight: bold !important;
    border-left: 5px solid #000 !important;
  }

  /* 4. Uzluksiz raqamlash */
  .publications {
    counter-reset: global-counter;
  }
  .publications ol.bibliography {
    list-style: none !important;
    padding-left: 0 !important;
  }
  .publications ol.bibliography > li {
    counter-increment: global-counter;
    position: relative;
    padding-left: 35px !important;
    margin-bottom: 15px !important;
  }
  .publications ol.bibliography > li::before {
    content: counter(global-counter) ".";
    position: absolute;
    left: 0;
    font-weight: bold;
    color: #000;
  }

  .main-header {
    font-weight: bold;
    text-transform: uppercase;
    border-bottom: 2px solid #000;
    margin-bottom: 20px;
  }
</style>

<div class="publications">

  <div class="pub-filters" style="margin-bottom: 30px; padding: 15px; background: #fafafa; border: 1px solid #eee; border-radius: 8px;">
    <input type="text" id="pubSearch" placeholder="Qidiruv..." style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px;">
    <div style="margin-top: 10px; display: flex; gap: 8px;">
      <button onclick="exportData('bib')" class="btn btn-sm btn-outline-dark">.BIB</button>
      <button onclick="exportData('csv')" class="btn btn-sm btn-outline-dark">.CSV</button>
      <button onclick="exportData('txt')" class="btn btn-sm btn-outline-dark">.TXT</button>
    </div>
  </div>

  <h1 class="main-header">All Publications</h1>

  {% assign current_years = "2026,2025,2024,2023,2022,2021" | split: "," %}
  
  {% for y in current_years %}
    {% capture entries %}{% bibliography -f papers -q @*[year={{y}}]* %}{% endcapture %}
    {% if entries != "" and entries != " " and entries.size > 100 %}
      <h2 class="year-header">{{ y }}</h2>
      <div class="year-block">
        {{ entries }}
      </div>
    {% endif %}
  {% endfor %}

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
                t: item.querySelector('.title')?.innerText.trim() || "",
                a: item.querySelector('.author')?.innerText.trim() || "",
                j: item.querySelector('.periodical')?.innerText.trim() || ""
            });
        }
    });
    let content = "";
    if (type === 'csv') {
        content = "Title,Author,Journal\n" + data.map(d => `"${d.t}","${d.a}","${d.j}"`).join("\n");
        downloadFile(content, "publications.csv", "text/csv");
    } else if (type === 'txt') {
        content = data.map(d => `${d.t}\n${d.a}\n${d.j}\n`).join("\n---\n");
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
