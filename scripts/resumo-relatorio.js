const fs = require('fs');
const path = require('path');

const resultadosDir = path.join(process.cwd(), 'cypress', 'resultados');
const arquivos = fs.existsSync(resultadosDir)
  ? fs.readdirSync(resultadosDir).filter((arquivo) => arquivo.endsWith('.json') && arquivo !== 'unificado.json')
  : [];

const resultados = arquivos.flatMap((arquivo) => {
  try {
    return JSON.parse(fs.readFileSync(path.join(resultadosDir, arquivo), 'utf8')).results || [];
  } catch {
    return [];
  }
});

const testes = resultados.flatMap((resultado) => {
  const coletar = (suite, acumulado = []) => {
    for (const teste of suite.tests || []) acumulado.push(teste);
    for (const filha of suite.suites || []) coletar(filha, acumulado);
    return acumulado;
  };
  return (resultado.suites || []).flatMap((suite) => coletar(suite));
});

const aprovados = testes.filter((teste) => teste.state === 'passed').length;
const falhas = testes.filter((teste) => teste.state === 'failed').length;
const pendentes = testes.filter((teste) => teste.state === 'pending').length;
const duracao = (testes.reduce((total, teste) => total + (teste.duration || 0), 0) / 1000).toFixed(1);

const linhas = resultados.map((resultado) => {
  const nome = path.basename(resultado.fullFile || resultado.file || 'spec desconhecida');
  const suiteTestes = [];
  for (const suite of resultado.suites || []) {
    const coletar = (item) => { suiteTestes.push(...(item.tests || [])); (item.suites || []).forEach(coletar); };
    coletar(suite);
  }
  const passou = suiteTestes.filter((teste) => teste.state === 'passed').length;
  const falhou = suiteTestes.filter((teste) => teste.state === 'failed').length;
  const tempo = (suiteTestes.reduce((total, teste) => total + (teste.duration || 0), 0) / 1000).toFixed(1);
  return `| ${nome} | ${suiteTestes.length} | ${passou} | ${falhou} | ${tempo}s |`;
}).join('\n');

const resumo = `## Relatório dos testes E2E\n\n` +
  `**Resultado geral:** ${falhas === 0 ? '✅ Todos os testes foram aprovados' : '❌ Existem testes com falha'}\n\n` +
  `| Indicador | Quantidade |\n|---|---:|\n| Total de testes | ${testes.length} |\n| Aprovados | ${aprovados} |\n| Falhas | ${falhas} |\n| Pendentes | ${pendentes} |\n| Duração total | ${duracao}s |\n\n` +
  `### Resultado por spec\n\n| Spec | Total | Aprovados | Falhas | Duração |\n|---|---:|---:|---:|---:|\n${linhas || '| Nenhum resultado encontrado | - | - | - | - |'}\n\n` +
  `### Cenários cobertos\n\n` +
  `- CT 1, 2, 3, 4 e 5: autenticação e cadastro\n` +
  `- CT 8 e 9: catálogo e pesquisa de produtos\n` +
  `- CT 10: assinatura no rodapé\n` +
  `- CT 15 e 16: realização de pedidos\n\n` +
  `Os relatórios detalhados, screenshots de falhas e resultados JSON estão disponíveis nos artefatos deste workflow.`;

if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, resumo);
console.log(resumo);
