axios.get('/api/lists')
  .then(({ data: lists }) => {
    console.log(lists)
    lists.forEach(list => {
      let listElem = document.createElement('div')
      listElem.innerHTML = `
        <li class="list-group-item">${list.name}</li>
        <li class="list-group-item">${list.action}</li>
        <li class="list-group-item">${list.price}</li>
        <div>
          <button class="btn btn-success done" data-id=${list.id}>✓</button>
          <button class="btn btn-danger delete" data-id=${list.id}>X</button>
        </div>
      `
      document.getElementById('items').append(listElem)
    })
    let totalBudget = 0
    lists.forEach(({price}) => {
      totalBudget += price 
    })
    console.log(totalBudget)
    document.getElementById('month-budget').innerText = '$' + totalBudget
  })
  .catch(err => console.log(err))

document.getElementById('addItem').addEventListener('click', event => {
  event.preventDefault()
  let listObj = {
    name: document.getElementById('name').value,
    action: document.getElementById('description').value,
    price: document.getElementById('price').value
  }
  axios.post('/api/lists', listObj)
    .then(({ data: newList }) => {
      console.log(newList)
      let listElem = document.createElement('ul')
      listElem.innerHTML = `
        <li class="list-group-item">${newList.name}</li>
        <li class="list-group-item">${newList.action}</li>
        <li class="list-group-item">${newList.price}</li>
        <div>
          <button class="btn btn-success done" data-id=${newList.id}>✓</button>
          <button class="btn btn-danger delete" data-id=${newList.id}>X</button>
        </div>
      `
      document.getElementById('items').append(listElem)
      document.getElementById('name').value = ''
      document.getElementById('description').value = ''
      document.getElementById('price').value = ''
    })
    .catch(err => console.log(err))
})


document.addEventListener('click', event => {

  if (event.target.classList.contains('delete')) {
    axios.delete(`/api/lists/${event.target.dataset.id}`)
    .then(() => {
      window.location.reload()
    })
    console.log(event.target)
  }
})
document.addEventListener('click', event => {

  if (event.target.classList.contains('done')) {
    event.target.parentNode.parentNode.style.color = "green"
  }
})