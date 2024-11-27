function onOpen() {
  DocumentApp.getUi()
    .createMenu('RPG')
    .addItem('Rolador de Dados', 'openSidebar')
    .addToUi();
}

function openSidebar() {
  const html = HtmlService.createHtmlOutput(`
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@400;700&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap');
      .container { 
        text-align: left; 
        font-family: 'Montserrat', sans-serif; 
        background-color: white; 
        color: #757575; 
        font-size: 24px;
        font-weight: bold;
        padding: 10px;
        margin-top: 20px;
      }
      .highlight { 
        color: #2196F3; 
        font-weight: bold; 
      }
      .slider-container {
        margin-top: 20px;
        margin-bottom: 20px; 
      }
      .slider {
        width: 80%;
      }
      .slider-value {
        color: white;
        font-size: 20px;
        font-family: 'Roboto Mono', monospace; 
      }
      .clickable-label { 
        margin-top: 20px;
        margin-bottom: 20px;
        color: white; 
        cursor: pointer; 
        font-size: 20px; 
        font-family: 'Lexend', sans-serif; 
        text-decoration: none;  
        padding: 10px; 
        border: 1px solid #536DFE;
        border-radius: 8px; 
        background-color: #1976D2; 
        transition: background-color 0.3s, transform 0.1s ease-in-out; 
      }
      .clickable-label:hover {
        background-color: #2196F3; 
        color: white; 
        transform: scale(1.30);
      }
      .hits { 
        text-align: left; 
        margin-top: 20px;
        font-size: 20px; 
        color: #212121; 
        white-space: pre-wrap; 
        font-family: 'Lexend', sans-serif; 
        padding: 10px; 
      }
      .status { 
        text-align: left; 
        font-size: 20px; 
        color: #BDBDBD; 
        white-space: pre-wrap; 
        font-family: 'Lexend', sans-serif; 
        padding: 10px; 
      } 
      .result { 
        margin-top: 10px;
        font-size: 20px; 
        color: #212121; 
        white-space: pre-wrap; 
        font-family: 'Roboto Mono', monospace; 
        padding: 10px; 
      } 
    </style>
    <div class="container">
      Rolador de Dados
      <div class="slider-container">
        <input type="range" id="quantity" class="slider" min="1" max="10" value="3">
      </div>
      <span class="clickable-label" id="generate-btn" onclick="generateRandom()">Jogar 3 dados</span>
      <div class="hits" id="hits"></div>
      <div class="status" id="status"></div>
      <div class="result" id="result"></div>
      <script>
        document.getElementById('quantity').addEventListener('input', function() {
            const quantity = this.value;
            document.getElementById('generate-btn').innerText = 'Jogar ' + quantity + ' dados';
          });
        
        hitsElement.innerText = 'Acertos: 0'; // Show number of hits

        function generateRandom() {
          const quantity = parseInt(document.getElementById('quantity').value, 10);
          const resultElement = document.getElementById('result');
          const hitsElement = document.getElementById('hits');
          const statusElement = document.getElementById('status');
          resultElement.innerText = ''; // Show a loading message
          hitsElement.innerText = 'Acertos: 0'; // Show number of hits
          statusElement.innerText = 'Rolando os dados...'; // Clear message

          setTimeout(() => {
            resultElement.innerText = ''; // Clear the loading message
            statusElement.innerText = 'Rolando os dados...';
            let currentIndex = 0;
            let hits = 0;
            let randomNumbers = '';

            function displayNext() {
              if (currentIndex < quantity) {
                const num = Math.floor(Math.random() * 10) + 1;
                const newResult = document.createElement('div');
                if (num > 9) {
                  newResult.innerHTML += '<span class="highlight">' + num + ' 🔷🔷🔷' + '</span>';
                  hits += 3;
                } else if (num > 8) {
                  newResult.innerHTML += '<span class="highlight">' + num + '  🔷🔷 ' + '</span>';
                  hits += 2;
                } else if (num > 7) {
                  newResult.innerHTML += '<span class="highlight">' + num + '  🔷  ' + '</span>';
                  hits += 1;
                } else {
                  newResult.innerHTML += num + '     ' + '\\n';
                }

                if (hits > 0) {
                  hitsElement.innerHTML = 'Acertos: ' + '<span class="highlight">' + hits + '</span>';
                }

                resultElement.appendChild(newResult);
                currentIndex++;
                setTimeout(displayNext, 1500); // delay for the next number
              } else {
                statusElement.innerText = ' ';
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
