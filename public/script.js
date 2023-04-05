
const form = document.getElementById('form')
const password = document.getElementById('password')
const email = document.getElementById('email')

form.addEventListener('submit', async e => {

  // Stop form sending
  e.preventDefault()

  try{

    // Fetch for login
    const res = await fetch('/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // Send a json with email and password
      body: JSON.stringify({ email: email.value, password: password.value })
    })

    // Get json data of response
    const data = await res.json()

    // Show data in console
    console.log(data)

  }catch(e){

    // Show error
    console.log(e)
    
  }
})