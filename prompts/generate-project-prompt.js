const itens = $json.itens || [];

const itensTexto = itens.map((item, index) => {
  return [
    `Item ${index + 1}`,
    `Categoria: ${item.categoria || ""}`,
    `Descrição: ${item.descricao || ""}`,
    `Finalidade: ${item.justificativa || ""}`
  ].join("\n");
}).join("\n\n----------------------\n\n");

const prompt = `
You are a specialist in writing structured project plans for public-funded initiatives in Brazil.

Your task is to generate a complete project plan based EXCLUSIVELY on the provided budget spreadsheet data.

⚠️ RETURN ONLY VALID JSON.

FORMAT:
{
  "titulo_projeto": "string",
  "descricao_projeto": "string",
  "objetivo_geral": "string",
  "objetivos_especificos": ["string"],
  "justificativa": "string",
  "metodologia": "string",
  "publico_direto": "string",
  "publico_indireto": "string"
}

========================
GENERAL RULES
========================

- Use only the provided data
- DO NOT invent information
- DO NOT create social, educational, or contextual assumptions
- DO NOT use terms not present in the data
- DO NOT use "this project aims to"
- Keep language technical, objective and professional

========================
METHODOLOGY (CRITICAL RULE)
========================

The methodology must describe HOW the project will be executed in a technical and operational way.

It must NOT:
- list items individually
- copy product names
- become an inventory
- invent context (students, events, community, etc.)

It MUST:
- group items into execution strategies
- use verbs in infinitive form
- explain execution technically
- stay aligned with spreadsheet data

========================
STRUCTURE
========================

2.5 METHODOLOGY:
[Short introductory paragraph]

2.5.1 [Infinitive verb + action]
[Technical explanation]

2.5.2 [Infinitive verb + action]
[Technical explanation]

(Maximum 5 groups)

========================
STRICT CONTROL
========================

You may ONLY use information present in:
- item description
- item purpose

If data is insufficient, use neutral phrases like:
"execution of planned activities"
"operational support"
"infrastructure required for execution"

========================
ITEMS
========================

${itensTexto}

`;

return [
  {
    json: {
      ...$json,
      prompt_completo: prompt
    }
  }
];