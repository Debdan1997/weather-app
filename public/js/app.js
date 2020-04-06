

// fetch('http://localhost:3000/weather?address=whatdefuck').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(data.error)
//         }
//         else{
//             console.log(data.temperature)
//         }
//     })
// })
console.log('javascript loaded')
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message = document.querySelector('#message')



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                console.log(data.temperature)
                message.textContent = data.temperature
            }
        })
    })
})