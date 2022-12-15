const socket = io()
let user// client that is going to be identify
let chatBox = document.getElementById('chatBox')//get reference where we are going to write
Swal.fire({
    title: 'Identificate',
    input: "text",
    text: 'Ingresa tu usuario para identificarte en el chat',
    inputValidator: (value) => {
        return !value && 'Necesitas introducir un nombre para contuniar!'
    },
    allowOutsideClick: false//restricts the user to click outside alert

}).then((result) => {
    user = result.value
    socket.emit("userConected", { user })
})

chatBox.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
        if (chatBox.value.trim().length > 0) {
            socket.emit("message", { user, message: chatBox.value })
            chatBox.value = ""
        }
    }
})

socket.on('messageLogs', data => {
    let log = document.getElementById('messageLogs')
    let messages = ""
    data.forEach(message => {
        messages = messages + `${message.user} dice: ${message.message} </br>`
    })
    log.innerHTML = messages
})

socket.on('userConected', data => {

})

socket.on('userConectedAll', data => {
    Swal.fire({
        text: `${data} se ha conectado`,
        toast: true,
        position: "top-right"
    })
})
