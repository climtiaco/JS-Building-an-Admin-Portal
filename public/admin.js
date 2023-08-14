async function bookList(){
   let response =  await fetch('http://localhost:3001/listBooks')
   let books = await response.json();
   const bookList = document.getElementById('bookList');

   books.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `${book.title}`;
        bookList.appendChild(li);

        const input = document.createElement('input');
        input.type = 'text';
        input.id = `quantity_${book.id}`;
        input.name = 'quantity'
        input.value = `${book.quantity}`;
        bookList.appendChild(input);

        const submit = document.createElement('button');
        submit.type = 'button';
        submit.textContent = 'Submit'
        bookList.appendChild(submit);

        submit.addEventListener('click', async () => {
            const newQuantity = document.getElementById(`quantity_${book.id}`).value;

            const updateResponse = await fetch(`http://localhost:3001/updateBook`, {
                method: 'PATCH',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: book.id, 
                    quantity: newQuantity })
            });

        })

   })
}

bookList();
