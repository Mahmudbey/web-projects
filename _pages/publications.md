---
layout: page
title: publications
permalink: /publications/
nav: true
nav_order: 2
---

<style>
  /* Yillar rangi - To'q qora va ko'rinadigan */
  .year-label {
    color: #000000 !important;
    background-color: #f1f1f1 !important;
    padding: 8px 15px !important;
    display: inline-block !important;
    border-radius: 4px !important;
    margin: 35px 0 15px 0 !important;
    font-size: 1.4rem !important;
    font-weight: 800 !important;
    border-bottom: 3px solid #333 !important;
  }

  /* Nomeratsiyani majburan chiqarish */
  .publications .bibliography {
    list-style: decimal !important; /* Standart raqamlash */
    padding-left: 2.5rem !important;
    margin-bottom: 2rem !important;
  }

  .publications .bibliography > li {
    display: list-item !important; /* Flex yoki block-ni bekor qiladi */
    margin-bottom: 1.5rem !important;
    color: #333 !important;
  }

  /* Sarlavha dizayni */
  .main-section-title {
    color: #000 !important;
    font-weight: bold;
    text-transform: uppercase;
    border-bottom: 4px solid #007bff;
    padding-bottom: 5px;
    margin-bottom: 20px;
  }
</style>

<div class="publications">

  <div class="pub-filters" style="margin-bottom: 30px; padding: 20px; background: #fff; border: 1px solid #eee; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
    <input type="text" id="pubSearch" placeholder="Maqolalarni qidirish (nomi, yili, muallifi)..." 
           style="width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 6px; font-size: 1rem;">
    <div style="margin-top: 15px; display: flex; gap: 10px;">
      <button onclick="exportData('bib')" class="btn btn-sm" style="background: #007bff; color: white;">Export .BIB</button>
      <button onclick="exportData('csv')" class="btn btn-sm" style="background: #28a745; color: white;">Export .CSV</button>
      <button onclick="exportData('txt')" class="btn btn-sm" style="background: #6c757d; color: white;">Export .TXT</button>
    </div>
  </div>

  <h1 class="main-section-title">All Publications</h1>
  
  {% assign years = "2026,2025,2024,2023,2022,2021" | split: "," %}
  
  {% for year in years %}
    {% capture year_entries %}{% bibliography -f papers -q @*[year={{year}}]* %}{% endcapture %}
    
    {% if year_entries != "" and year_entries != " " and year_entries.size > 50 %}
      <div class="year-group">
        <div class="year-label">{{ year }}</div>
        {% bibliography -f papers -q @*[year={{year}}]* %}
      </div>
    {% endif %}
  {% endfor %}

</div>

<script>
// Qidiruv funksiyasi
document.getElementById('pubSearch').addEventListener('keyup', function() {
    let filter = this.value.toLowerCase();
    let items = document.querySelectorAll('.bibliography > li');
    items.forEach(item => {
        item.style.display = item.innerText.toLowerCase().includes(filter) ? "" : "none";
    });
});

// Eksport funksiyasi
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
    if (type === 'csv') {
        let csv = "Title,Author,Journal\n" + data.map(d => `"${d.t}","${d.a}","${d.j}"`).join("\n");
        downloadFile(csv, "publications.csv", "text/csv");
    } else if (type === 'txt') {
        let txt = data.map(d => `${d.t}\n${d.a}\n${d.j}\n`).join("\n---\n");
        downloadFile(txt, "publications_list.txt", "text/plain");
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
