const resposta = $json;

let content = '';

if (resposta.choices?.[0]?.message?.content) {
  content = resposta.choices[0].message.content;
} else if (resposta.data?.choices?.[0]?.message?.content) {
  content = resposta.data.choices[0].message.content;
} else if (resposta.message?.content) {
  content = resposta.message.content;
} else {
  throw new Error('AI response format not recognized.');
}

// Clean markdown
const limpar = (txt) => {
  return String(txt || '')
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```$/i, '')
    .trim();
};

// Clean formatting
const limparTextoIA = (txt) => {
  return String(txt || '')
    .replace(/\r/g, '')
    .replace(/\*\*/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

// Extract JSON safely
const extrairJson = (txt) => {
  const texto = limpar(txt);

  try {
    return JSON.parse(texto);
  } catch (_) {}

  const inicio = texto.indexOf('{');
  const fim = texto.lastIndexOf('}');

  if (inicio !== -1 && fim !== -1 && fim > inicio) {
    return JSON.parse(texto.slice(inicio, fim + 1));
  }

  throw new Error('Invalid JSON from AI.');
};

const bruto = limpar(content);

let parsed;
let erroParse = '';

try {
  parsed = extrairJson(bruto);
} catch (error) {
  erroParse = error.message || 'Invalid JSON';

  parsed = {
    titulo_projeto: '',
    descricao_projeto: '',
    objetivo_geral: '',
    objetivos_especificos: [],
    justificativa: '',
    metodologia: '',
    publico_direto: '',
    publico_indireto: ''
  };
}

const textoSeguro = (valor) => limparTextoIA(valor);

// Methodology validation
let metodologia = textoSeguro(parsed.metodologia);

if (!metodologia) {
  metodologia = '2.5 METHODOLOGY:\nExecution will follow structured use of available resources.';
}

const temTitulo = /^2\.5\s+METHODOLOGY:?/i.test(metodologia);
const temGrupos = /2\.5\.1/i.test(metodologia);
const usaSubitens = /2\.5\.\d+\.\d+/i.test(metodologia);

const metodologiaInvalida =
  !temTitulo ||
  !temGrupos ||
  usaSubitens;

return [
  {
    json: {
      titulo_projeto: textoSeguro(parsed.titulo_projeto),
      descricao_projeto: textoSeguro(parsed.descricao_projeto),
      objetivo_geral: textoSeguro(parsed.objetivo_geral),
      objetivos_especificos_array: parsed.objetivos_especificos || [],
      justificativa: textoSeguro(parsed.justificativa),
      metodologia,
      publico_direto: textoSeguro(parsed.publico_direto),
      publico_indireto: textoSeguro(parsed.publico_indireto),

      erro_parse: erroParse,
      metodologia_invalida: metodologiaInvalida,
      usa_subitens: usaSubitens,

      raw_response: bruto
    }
  }
];