function onOpen() {
  DocumentApp.getUi()
    .createMenu('RPG')
    .addItem('Rolador de Dados', 'openSidebar')
    .addToUi();  
}

function writeToDocument(data) {
  // Get the active document and write the received data
  const doc = DocumentApp.getActiveDocument();
  const documentTab = doc.getActiveTab().asDocumentTab();
  const body = documentTab.getBody();

  const now = new Date();
  const date = now.toLocaleDateString(); // Format the date as MM/DD/YYYY (default format in most locales)
  const time = now.toLocaleTimeString(); // Format the time as HH:MM:SS AM/PM
  const email = Session.getActiveUser().getEmail();
  body.appendParagraph(`\nJogador: ${email}`);
  timestamp = `Data e Hora: ${date} ${time}`;
  body.appendParagraph(timestamp);
  body.appendParagraph(data);
}

function openSidebar() {
  const doc = DocumentApp.getActiveDocument();

  const html = HtmlService.createHtmlOutput(`
    <head>
      <base target="_top">
    </head>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@400;700&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap');
      .container { 
        text-align: left; 
        font-family: 'Montserrat', sans-serif; 
        background-color: white; 
        color: #757575; 
        font-size: 14px;
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
        width: 100%;
      }
      .slider-value {
        color: white;
        font-size: 14px;
        font-family: 'Roboto Mono', monospace; 
      }
      .clickable-label { 
        margin-top: 20px;
        margin-bottom: 20px;
        color: white; 
        cursor: pointer; 
        font-size: 14px; 
        font-family: 'Lexend', sans-serif; 
        text-decoration: none;  
        padding: 5px; 
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
        margin-top: 10px;
        font-size: 14px; 
        color: #1976D2; 
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
      Dados
      <div class="slider-container">
        <input type="range" id="quantity" class="slider" min="1" max="12" value="3">
      </div>
      Modificador
      <div class="slider-container">
        <input type="range" id="modifier" class="slider" min="-6" max="6" value="0">
      </div>
      Classe de Dificuldade
      <div class="slider-container">
        <input type="range" id="dificuldade" class="slider" min="1" max="21" value="1">
      </div>
      <span class="clickable-label" id="generate-btn" onclick="generateRandom()">Jogar 3 dados (+0) com CD 1</span>
      <div class="hits" id="hits"></div>
      <div class="result" id="result"></div>
      <script>
        let quantity = 3;
        let modifier = 0;
        let dificuldade = 1;

        document.getElementById('quantity').addEventListener('input', function() {
            quantity = this.value;
            document.getElementById('generate-btn').innerText = 'Jogar ' + quantity + ' dados (' + (modifier >= 0 ? '+' : '') + modifier + ') com CD ' + dificuldade;
          });

        document.getElementById('modifier').addEventListener('input', function() {
            modifier = this.value;
            document.getElementById('generate-btn').innerText = 'Jogar ' + quantity + ' dados (' + (modifier >= 0 ? '+' : '') + modifier + ') com CD ' + dificuldade;
          });

        document.getElementById('dificuldade').addEventListener('input', function() {
            dificuldade = this.value;
            document.getElementById('generate-btn').innerText = 'Jogar ' + quantity + ' dados (' + (modifier >= 0 ? '+' : '') + modifier + ') com CD ' + dificuldade;
          });

        function generateRandom() {
          const quantity = parseInt(document.getElementById('quantity').value, 10);
          const modifier = parseInt(document.getElementById('modifier').value, 10);
          const dificuldade = parseInt(document.getElementById('dificuldade').value, 10);
          const resultElement = document.getElementById('result');
          const hitsElement = document.getElementById('hits');
          resultElement.innerText = ''; // Show a loading message
          hitsElement.innerText = 'Rolando os dados...'; // Clear message
          let returnValue = 'Teste de ' + quantity + ' dados (' + (modifier >= 0 ? '+' : '') + modifier + '): ';

          setTimeout(() => {
            resultElement.innerText = ''; // Clear the loading message
            let currentIndex = 0;
            let hits = 0;

            function displayNext() {
              if (currentIndex < quantity) {
                const num = Math.floor(Math.random() * 10) + 1;
                returnValue += currentIndex > 0 ? ', ' : ' ';  // Add comma if not the first number
                if (num > 9) {
                  returnValue += num + ' 🔆🔆🔆';
                  hits += 3;
                } else if (num > 8) {
                  returnValue +=  num + ' 🔆🔆';
                  hits += 2;
                } else if (num > 7) {
                  returnValue +=  num + ' 🔆';
                  hits += 1;
                } else {
                  returnValue +=  num;
                }
                currentIndex++;
                setTimeout(displayNext, 100); // Recursively roll dice
              } else {              
                hitsElement.innerHTML = 'Resultado enviado para o fim da guia ativa.';
                
                if(hits <= 0) {
                  returnValue += '\\nAcertos: ' + hits + ' (modificador desconsiderado pois não houve acerto nos dados) ';
                  returnValue += '\\nResultado (CD ' + dificuldade + '): Fracasso';
                } else if((hits+modifier) >= dificuldade) {
                  returnValue += '\\nAcertos: ' + hits + ' + ' + modifier + ' = ' + (hits+modifier);
                  if((hits+modifier-dificuldade+1) == 0) {
                    returnValue += '\\nResultado (CD ' + dificuldade + '): Êxito';
                  } else if((hits+modifier-dificuldade+1) == 1) {
                    returnValue += '\\nResultado (CD ' + dificuldade + '): Êxito com ' + (hits+modifier-dificuldade+1) + ' sucesso ';
                  } else {
                    returnValue += '\\nResultado (CD ' + dificuldade + '): Êxito com ' + (hits+modifier-dificuldade+1) + ' sucessos ';
                  }
                } else {
                  returnValue += '\\nAcertos: ' + hits + ' + ' + modifier + ' = ' + (hits+modifier);
                  if((hits+modifier) == 1) {
                    returnValue += '\\nResultado (CD ' + dificuldade + '): Êxito parcial com ' + (hits+modifier) + ' acerto';
                  } else {
                    returnValue += '\\nResultado (CD ' + dificuldade + '): Êxito parcial com ' + (hits+modifier) + ' acertos';
                  }
                }
                google.script.run.writeToDocument(returnValue); // Send results to Google Docs
              }
            }
            displayNext();
          }, 1000); // Delay to simulate dice rolling
        }
      </script>
    </div>
  `)
    .setWidth(400)
    .setHeight(400);

  DocumentApp.getUi().showSidebar(html);
}
