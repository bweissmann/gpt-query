// ChatGPT rejects messages before the page hydrates -- it gives an auth error
// Waiting for the big "ChatGPT" on the background + 300ms seems like enough time 
function main() {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q')
    if (query) {
        let intervalId = setInterval(() => {
            let headers = [...document.querySelectorAll('h1')]
            if (headers && headers.some(header => header.textContent.includes('ChatGPT'))) {
                setTimeout(() => { applyQuery(query) }, 300)
                clearInterval(intervalId);
            }
        }, 50);
    }
}

function applyQuery(query) {
    let promptTextarea = document.querySelector('#prompt-textarea');
    let submitButton = promptTextarea.parentElement.querySelector('button');

    promptTextarea.focus();
    promptTextarea.value = query;
    promptTextarea.dispatchEvent(new Event('input', {
        'bubbles': true,
        'cancelable': true
    }));
    promptTextarea.dispatchEvent(new Event('change', {
        'bubbles': true,
        'cancelable': true
    }));
    
    submitButton.click();
}

main()