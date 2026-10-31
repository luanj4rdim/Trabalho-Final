const fs = require('fs');
const path = require('path');

for (const pasta of ['cypress/resultados', 'cypress/relatorios', 'cypress/screenshots']) {
  const diretorio = path.join(process.cwd(), pasta);
  fs.mkdirSync(diretorio, { recursive: true });
  for (const arquivo of fs.readdirSync(diretorio)) {
    fs.rmSync(path.join(diretorio, arquivo), { recursive: true, force: true });
  }
}

console.log('Relatórios, screenshots e resultados anteriores removidos.');
