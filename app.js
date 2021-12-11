if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}

async function fetchData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  return res.json();
}

async function renderData() {
  const data = await fetchData();
  const cards = document.querySelector('.cards');
  data.forEach(obj => {
    const html = `
    <div class="card" data-id="${obj.id}">
      <h2 style="margin-bottom: 1rem">${obj.name} <em style="font-weight: 400">@${obj.username}</span> </h4>
      <p>
        <strong>Email:</strong> <a href="mailto:${obj.email}">${obj.email}</a>
      </p>
      <p>
        <strong>Phone:</strong> <a href="tel:${obj.phone}"> ${obj.phone}</a>
      </p>
      <br />
      <strong>Website: </strong> <a href="https://${obj.website}" target="_blank">${obj.website}</a>
    </div>
  `;
    cards.insertAdjacentHTML('beforeend', html);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderData();
});
