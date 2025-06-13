
document.addEventListener("DOMContentLoaded", () => {
  fetch("posts.json")
    .then(response => response.json())
    .then(posts => {
      const list = document.getElementById("post-list");
      const searchBox = document.getElementById("search-box");
      const searchButton = document.getElementById("search-button");
      const categoryFilter = document.getElementById("category-filter");
      const tagFilter = document.getElementById("tag-filter");

      function render(filteredPosts) {
        list.innerHTML = "";
        filteredPosts.forEach(post => {
          const li = document.createElement("li");
          li.innerHTML = `<a href="posts/${post.file}">${post.title}</a> <span style="color:gray;">(${post.date})</span>`;
          list.appendChild(li);
        });
      }

      function filterPosts() {
        const search = searchBox.value.toLowerCase();
        const category = categoryFilter.value;
        const tag = tagFilter.value;

        const filtered = posts.filter(post => {
          const matchSearch = post.title.toLowerCase().includes(search);
          const matchCategory = !category || post.category === category;
          const matchTag = !tag || post.tags.includes(tag);
          return matchSearch && matchCategory && matchTag;
        });

        render(filtered);
      }

      searchBox.addEventListener("input", filterPosts);
      searchButton.addEventListener("click", filterPosts);
      categoryFilter.addEventListener("change", filterPosts);
      tagFilter.addEventListener("change", filterPosts);

      render(posts);
    });
});
