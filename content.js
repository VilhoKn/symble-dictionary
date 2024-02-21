(() => {
	chrome.runtime.onMessage.addListener((obj, sender) => {
		if (obj.type === "init") initDictionary()
	})
})();


function initDictionary() {
    const dictContainer = document.createElement("div")
    let showing = false
    dictContainer.style.cssText = ""
    setInterval(() => {
        const infGame = JSON.parse(localStorage.infiniteGameState)
        if (!infGame.answer || !infGame.gameOver) { dictContainer = "none"; showing = false; return }
        if (showing) return
        dictContainer = "block"
        showing = true
        const url = "https://api.dictionaryapi.dev/api/v2/entries/en/"

        fetch(url + infGame.answer).then(res => res.json()).then(response => {
            const title = document.createElement("h1")
            title.textContent = response.word
            for (i of response.meanings) {
                const meaning = document.createElement("div")
                const speech = document.createElement("p")
                speech.textContent = i.partOfSpeech
                meaning.appendChild(speech)
                for (j of i.definitions) {
                    const definition = document.createElement("p")
                    definition.textContent = j.definition
                    meaning.appendChild(definition)
                }
            }
        });

    }, 100)
}