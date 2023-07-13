async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/openchat/openchat",
        {
            headers: { Authorization: "Bearer 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" },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
}

document.addEventListener('DOMContentLoaded', function() {
    const chatbox = document.getElementById('chatbox');
    const userInputForm = document.getElementById('user-input-form');
    const userInput = document.getElementById('user-input');

    userInputForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const message = userInput.value.trim();
        if (message !== '') {
            displayUserMessage(message);
            userInput.value = '';

            // Send user input to the chatbot API
            const response = await query({ "inputs": message });
            displayChatbotMessage(response[0].generated_text);
        }
    });

    function displayUserMessage(message) {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('message-container', 'user');
        const messageBubble = document.createElement('div');
        messageBubble.classList.add('message-bubble', 'user');
        messageBubble.textContent = message;
        messageContainer.appendChild(messageBubble);
        chatbox.appendChild(messageContainer);
        chatbox.scrollTop = chatbox.scrollHeight;
    }

    function displayChatbotMessage(message) {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('message-container', 'chatbot');
        const messageBubble = document.createElement('div');
        messageBubble.classList.add('message-bubble', 'chatbot');
        messageBubble.textContent = message;
        messageContainer.appendChild(messageBubble);
        chatbox.appendChild(messageContainer);
        chatbox.scrollTop = chatbox.scrollHeight;
    }
});
