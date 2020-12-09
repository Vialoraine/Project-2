axios.get('/api/lists')
  .then(( {data: lists}) => {
    console.log(lists)
    lists.forEach(list => {
      let listElem = document.createElement('div')
      listElem.innerHTML = `
        <p>${list.name}</p>
        <p>${list.action}</p>
        <p>${list.price}</p>
      `
      document.getElementById('items').append(listElem)
    })
  })
  .catch(err => console.log(err))

  document.getElementById('addItem').addEventListener('click', event => {
    event.preventDefault()
    let listObj = {
      name: document.getElementById('name').value,
      action: document.getElementById('action').value,
      price: document.getElementById('price').value
    }
    axios.post('/api/lists', listObj)
      .then(({data: newList}) => {
        console.log(newList)
        let listElem = document.createElement('div')
        listElem.innerHTML = `
        <p>${newList.name}</p>
        <p>${newList.action}</p>
        <p>${newList.price}</p>
      `
        document.getElementById('items').append(listElem)
        document.getElementById('name').value = ''
        document.getElementById('action').value = ''
        document.getElementById('price').value = ''
      })
      .catch(err => console.log(err))
  })