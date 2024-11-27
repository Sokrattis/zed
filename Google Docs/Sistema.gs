function onOpen() {
  DocumentApp.getUi()
    .createMenu('RPG')
    .addItem('Rolador de Dados', 'openSidebar')
    .addToUi();
}

function openSidebar() {
  const html = HtmlService.createHtmlOutput(`
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@400;700&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap');
      .container { 
        text-align: left; 
        font-family: 'Lexend', sans-serif; 
        background-color: black; 
        color: white; 
        font-size: 18px; 
        padding: 10px; 
      }
      .clickable-label { 
        color: white; 
        cursor: pointer; 
        font-size: 18px; 
        text-decoration: none;  
        padding: 10px; 
        border: 2px solid white; 
        border-radius: 8px; 
        background-color: transparent; 
        transition: background-color 0.3s, transform 0.1s ease-in-out; 
      }
      .clickable-label:hover {
        background-color: white; 
        color: black; 
        transform: scale(1.05);
      }
      .highlight { 
        color: cyan; 
        font-weight: bold; 
      }
      .result { 
        margin-top: 20px; 
        font-size: 20px; 
        color: white; 
        white-space: pre-wrap; 
        font-family: 'Roboto Mono', monospace; 
        padding: 10px; 
      }
      .hits { 
        text-align: left; 
        margin-top: 20px; 
        font-size: 20px; 
        color: white; 
        white-space: pre-wrap; 
        font-family: 'Lexend', sans-serif; 
        padding: 10px; 
      }
      select { 
        margin-top: 10px; 
        padding: 10px; 
        font-family: 'Lexend', sans-serif; 
        font-size: 16px; 
        background-color: black; 
        color: white; 
        border: 1px solid white; 
      }
      .slider-container {
        margin-top: 20px;
      }
      .slider {
        width: 100%;
        margin: 10px 0;
      }
      .slider-value {
        color: white;
        font-size: 18px;
      }
    </style>
    <div class="container">
      <label for="quantity">Parada de Dados</label><br>
      <select id="quantity">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
      <br><br>
      <span class="clickable-label" onclick="generateRandom()">Rolar!</span>
      <div class="result" id="result"></div>
      <div class="hits" id="hits"></div>
      <script>
        function generateRandom() {
          const quantity = parseInt(document.getElementById('quantity').value, 10);
          const resultElement = document.getElementById('result');
          const hitsElement = document.getElementById('hits');
          resultElement.innerText = 'Rolando os dados...'; // Show a loading message
          hitsElement.innerText = 'Acertos: 0'; // Show number of hits

          setTimeout(() => {
            resultElement.innerText = ''; // Clear the loading message
            let currentIndex = 0;
            let hits = 0;
            let randomNumbers = '';

            function displayNext() {
              if (currentIndex < quantity) {
                const num = Math.floor(Math.random() * 10) + 1;
                const newResult = document.createElement('div');
                if (num > 9) {
                  newResult.innerHTML += '<span class="highlight">' + num + ' 🟦🟦🟦' + '</span>';
                  hits += 3;
                } else if (num > 8) {
                  newResult.innerHTML += '<span class="highlight">' + num + '  🟦🟦⬜' + '</span>';
                  hits += 2;
                } else if (num > 7) {
                  newResult.innerHTML += '<span class="highlight">' + num + '  🟦⬜⬜' + '</span>';
                  hits += 1;
                } else {
                  newResult.innerHTML += num + '  ⬜⬜⬜' + '\\n';
                }

                if (hits > 0) {
                  hitsElement.innerHTML = 'Acertos: ' + '<span class="highlight">' + hits + '</span>';
                }

                resultElement.appendChild(newResult);
                currentIndex++;
                setTimeout(displayNext, 1500); // delay for the next number
              }
            }
            displayNext();
          }, 2000); // 2-second delay
        }
      </script>
    </div>
  `)
    .setWidth(400)
    .setHeight(400);

  DocumentApp.getUi().showSidebar(html);
}
