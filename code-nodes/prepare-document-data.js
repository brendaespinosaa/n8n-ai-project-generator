function formatCurrencyBR(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(Number(value || 0));
}

function safeText(value) {
  if (value === null || value === undefined) return '';
  return String(value).trim();
}

function cleanText(txt) {
  return safeText(txt)
    .replace(/\r/g, '')
    .replace(/\*\*/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function parseBRNumber(value) {
  if (!value) return 0;

  let text = String(value)
    .replace(/R\$\s?/gi, '')
    .replace(/\./g, '')
    .replace(',', '.');

  const num = Number(text);
  return isNaN(num) ? 0 : num;
}

// INPUT
const data = $json;

// Clean fields
const titulo = cleanText(data.titulo_projeto) || 'Project';
const descricao = cleanText(data.descricao_projeto);
const objetivo = cleanText(data.objetivo_geral);
const justificativa = cleanText(data.justificativa);

let metodologia = cleanText(data.metodologia);

if (!/^2\.5\s+METHODOLOGY:/i.test(metodologia)) {
  metodologia = `2.5 METHODOLOGY:\n${metodologia}`;
}

// Objectives
let objetivos = [];

if (Array.isArray(data.objetivos_especificos_array)) {
  objetivos = data.objetivos_especificos_array;
}

if (!objetivos.length) {
  objetivos = [
    'Structure required resources',
    'Organize operational inputs',
    'Ensure execution conditions'
  ];
}

const objetivosFormatados = objetivos
  .map((o, i) => `Objective ${i + 1} — ${o}`)
  .join('\n');

// VALUE CALCULATION (simplified)
let total = 0;

try {
  const itens = $('Consolidar Itens da Planilha').first().json.itens || [];

  for (const item of itens) {
    const valor = parseBRNumber(item.valor_total);
    total += valor;
  }
} catch (e) {}

const valorGlobal = formatCurrencyBR(total);

// OUTPUT
return [
  {
    json: {
      titulo_projeto: titulo,
      descricao_projeto: descricao,
      objetivo_geral: objetivo,
      objetivos_especificos: objetivosFormatados,
      justificativa,
      metodologia,
      valor_global: valorGlobal,
      publico_direto: safeText(data.publico_direto),
      publico_indireto: safeText(data.publico_indireto)
    }
  }
];