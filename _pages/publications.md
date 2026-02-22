---
layout: page
title: publications
permalink: /publications/
nav: true
nav_order: 2
---

<div class="publications">

  <div class="pub-filters" style="margin-bottom: 30px; padding: 15px; background: #fdfdfd; border: 1px solid #eee; border-radius: 8px;">
    <input type="text" id="pubSearch" placeholder="Title, author or keywords..." style="width: 100%; padding: 10px; margin-bottom: 15px; border-radius: 5px; border: 1px solid #ccc;">
    
    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
      <div>
        <button onclick="exportData('bib')" class="btn btn-sm btn-outline-primary">Export .BIB</button>
        <button onclick="exportData('csv')" class="btn btn-sm btn-outline-success">Export .CSV</button>
        <button onclick="exportData('txt')" class="btn btn-sm btn-outline-secondary">Export .TXT</button>
      </div>
    </div>
  </div>

  <div id="publications-list">
    {% bibliography -f papers %}
  </div>

</div>

<script src="{{ '/assets/js/pub-tools.js' | relative_url }}"></script>
