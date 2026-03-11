import { CARDAPIO, CATEGORIA_GRUPO } from './cardapio';

// Seeded PRNG for deterministic data
function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const NOITES = {
  FLOW: { id: 'flow', nome: 'Flow Like SP', dia: 4, cor: '#8B5CF6' },
  ANOS2000: { id: 'anos2000', nome: 'Especial Anos 2000', dia: 5, cor: '#EC4899' },
  SALSEIRO: { id: 'salseiro', nome: 'Salseiro', dia: 5, cor: '#F59E0B' },
  RITMOS: { id: 'ritmos', nome: 'Ritmos', dia: 6, cor: '#10B981' },
};

export { NOITES };

const NOMES_M = [
  'Gabriel', 'Lucas', 'Pedro', 'Rafael', 'Matheus', 'Gustavo', 'Felipe', 'Bruno',
  'Leonardo', 'Arthur', 'Henrique', 'Daniel', 'Thiago', 'Caio', 'Vinícius',
  'André', 'João', 'Rodrigo', 'Marcelo', 'Eduardo', 'Diego', 'Igor',
  'Renato', 'Samuel', 'Murilo', 'Leandro', 'Fernando', 'Carlos', 'Ricardo', 'Otávio',
  'Bernardo', 'Enzo', 'Miguel', 'Davi', 'Luan', 'Nicolas', 'Victor', 'Cauã',
  'Yuri', 'Guilherme', 'Renan', 'Breno', 'Wesley', 'Patrick', 'Alex',
];

const NOMES_F = [
  'Ana', 'Beatriz', 'Camila', 'Daniela', 'Eduarda', 'Fernanda', 'Gabriela',
  'Helena', 'Isabela', 'Julia', 'Karla', 'Larissa', 'Mariana', 'Natália',
  'Olivia', 'Paloma', 'Rafaela', 'Sabrina', 'Tatiana', 'Valentina',
  'Amanda', 'Bruna', 'Carolina', 'Débora', 'Elisa', 'Flávia', 'Giovanna',
  'Heloísa', 'Ingrid', 'Jéssica', 'Letícia', 'Manuela', 'Nicole', 'Patrícia',
  'Renata', 'Sofia', 'Thaís', 'Vanessa', 'Yasmin', 'Bianca', 'Clara',
  'Diana', 'Érica', 'Gisele', 'Laura',
];

const SOBRENOMES = [
  'Silva', 'Santos', 'Oliveira', 'Souza', 'Pereira', 'Costa', 'Rodrigues',
  'Almeida', 'Nascimento', 'Lima', 'Araújo', 'Fernandes', 'Carvalho', 'Gomes',
  'Martins', 'Rocha', 'Ribeiro', 'Barros', 'Freitas', 'Moreira', 'Nunes',
  'Cardoso', 'Mendes', 'Vieira', 'Correia', 'Pinto', 'Batista', 'Teixeira',
  'Machado', 'Monteiro', 'Dias', 'Castro', 'Melo', 'Ferreira', 'Reis',
];

// Pesos de produtos por noite temática
const PESOS_NOITE = {
  flow: {
    // Quinta: mais cerveja barata, menos combos
    cervejaBarata: 3.0, cervejaPremium: 1.0, drinksAutorais: 0.8, classicos: 1.0,
    doses: 0.7, combos: 0.3, food: 1.2, soft: 1.5, espumantes: 0.2,
  },
  anos2000: {
    cervejaBarata: 1.5, cervejaPremium: 1.2, drinksAutorais: 1.5, classicos: 1.3,
    doses: 1.0, combos: 0.8, food: 1.0, soft: 1.0, espumantes: 0.6,
  },
  salseiro: {
    cervejaBarata: 1.3, cervejaPremium: 1.0, drinksAutorais: 1.2, classicos: 1.5,
    doses: 1.2, combos: 0.7, food: 0.9, soft: 1.1, espumantes: 0.5,
  },
  ritmos: {
    cervejaBarata: 1.5, cervejaPremium: 1.3, drinksAutorais: 1.8, classicos: 1.2,
    doses: 1.0, combos: 1.5, food: 1.0, soft: 0.8, espumantes: 1.2,
  },
};

function getPesoProduto(produto, noiteId) {
  const pesos = PESOS_NOITE[noiteId];
  const cat = produto.categoria;

  // Cervejas baratas (Sol, Amstel, Heineken, PRAYA)
  if (['Cervejas & Ice'].includes(cat) && produto.preco <= 21) return pesos.cervejaBarata;
  if (['Cervejas & Ice'].includes(cat) && produto.preco > 21) return pesos.cervejaPremium;
  if (cat === 'Drinks Autorais') return pesos.drinksAutorais;
  if (['Clássicos', 'Gin Tônica', "Jack Daniel's Drinks"].includes(cat)) return pesos.classicos;
  if (['Whiskey', 'Vodka', 'Gin', 'Tequila', 'Aperitivo & Cachaça'].includes(cat)) return pesos.doses;
  if (cat === 'Combos') return pesos.combos;
  if (cat === 'Comidinhas') return pesos.food;
  if (['Soft Drinks', 'Drinks Sem Álcool'].includes(cat)) return pesos.soft;
  if (cat === 'Espumantes & Vinhos') return pesos.espumantes;
  return 1.0;
}

// Popularidade base de cada produto (alguns vendem mais que outros)
function getPopularidadeBase(produto) {
  const pop = {
    'Heineken': 10, 'Sol': 8, 'PRAYA': 7, 'Amstel Ultra': 5,
    'Red Bull': 9, 'Água sem Gás': 6, 'Coca-Cola': 5, 'Água de Coco': 4,
    'Vodka + Red Bull': 8, 'Caipirinha Sagatiba': 6, 'Moscow Mule': 5,
    'Aperol Spritz': 5, 'Long Island Iced Tea': 4, 'Jägerbomb': 5,
    'Summertime': 6, 'R.T.B.': 5, 'Atlântica': 5, 'Tennessee Marmelade': 4,
    'Gin-ger': 4, 'Capim-Limão': 4,
    'Fritas Parmesão e Salsinha': 5, 'Cheeseburger': 4,
    'Pasteizinhos (Carne Seca/Queijo)': 4,
    'Gin Tanqueray + Red Bull': 3, 'Cîroc + Red Bull': 3,
    'Red Label + Red Bull': 3, 'Jack Daniel\'s Nº7 + Red Bull': 3,
    'Chandon Garden Spritz': 1.5, 'Chandon Rosé': 1.5,
    'Smirnoff Ice': 4, 'Blue Moon': 2, 'Jack & Coke': 4,
  };
  return pop[produto.nome] || 2;
}

export function generateMockData() {
  const rand = mulberry32(42);

  // Helper functions
  const randInt = (min, max) => Math.floor(rand() * (max - min + 1)) + min;
  const randFloat = (min, max) => rand() * (max - min) + min;
  const pick = (arr) => arr[Math.floor(rand() * arr.length)];
  const pickWeighted = (items, weights) => {
    const total = weights.reduce((s, w) => s + w, 0);
    let r = rand() * total;
    for (let i = 0; i < items.length; i++) {
      r -= weights[i];
      if (r <= 0) return items[i];
    }
    return items[items.length - 1];
  };

  // Generate dates for last 90 days (only Thu/Fri/Sat)
  const hoje = new Date(2026, 2, 11); // March 11, 2026
  const noites = [];

  for (let d = 89; d >= 0; d--) {
    const date = new Date(hoje);
    date.setDate(date.getDate() - d);
    const dow = date.getDay(); // 0=Sun...6=Sat

    if (dow === 4) {
      noites.push({ date: new Date(date), noite: NOITES.FLOW });
    } else if (dow === 5) {
      // Week number determines which Friday event
      const weekNum = Math.floor((date.getDate() - 1) / 7) + 1;
      const isEven = weekNum % 2 === 0;
      noites.push({ date: new Date(date), noite: isEven ? NOITES.ANOS2000 : NOITES.SALSEIRO });
    } else if (dow === 6) {
      noites.push({ date: new Date(date), noite: NOITES.RITMOS });
    }
  }

  // Generate clients (~10,000)
  const NUM_CLIENTES = 10000;
  const clientes = [];

  for (let i = 0; i < NUM_CLIENTES; i++) {
    const genero = rand() < 0.48 ? 'M' : (rand() < 0.97 ? 'F' : 'O');
    const nomes = genero === 'F' ? NOMES_F : NOMES_M;
    const nome = `${pick(nomes)} ${pick(SOBRENOMES)}`;

    // Age distribution: 18-35 dominant
    const ageWeights = [0.15, 0.30, 0.28, 0.17, 0.10]; // 18-21, 22-25, 26-30, 31-35, 36+
    const ageGroup = pickWeighted([0, 1, 2, 3, 4], ageWeights);
    const ageRanges = [[18, 21], [22, 25], [26, 30], [31, 35], [36, 45]];
    const age = randInt(ageRanges[ageGroup][0], ageRanges[ageGroup][1]);

    const birthYear = 2026 - age;
    const birthMonth = randInt(1, 12);
    const birthDay = randInt(1, 28);

    // Client preference for nights
    const noitePrefs = {
      flow: rand() < 0.25 ? randFloat(0.5, 2.0) : randFloat(0, 0.3),
      anos2000: rand() < 0.35 ? randFloat(0.5, 2.0) : randFloat(0, 0.4),
      salseiro: rand() < 0.30 ? randFloat(0.5, 2.0) : randFloat(0, 0.3),
      ritmos: rand() < 0.55 ? randFloat(0.8, 2.5) : randFloat(0, 0.5),
    };

    // Age-based adjustment
    if (age <= 24) noitePrefs.flow *= 1.5;
    if (age >= 25 && age <= 32) noitePrefs.anos2000 *= 1.4;
    if (age >= 22 && age <= 30) noitePrefs.salseiro *= 1.2;

    // Gender adjustments
    if (genero === 'M') noitePrefs.flow *= 1.2;
    if (genero === 'F') {
      noitePrefs.anos2000 *= 1.1;
      noitePrefs.salseiro *= 1.15;
      noitePrefs.ritmos *= 1.05;
    }

    const ddd = pick(['11']);
    const tel = `(${ddd}) 9${randInt(1000, 9999)}-${randInt(1000, 9999)}`;
    const emailDomains = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com.br', 'icloud.com'];

    clientes.push({
      id: i + 1,
      nome,
      genero,
      data_nascimento: `${birthYear}-${String(birthMonth).padStart(2, '0')}-${String(birthDay).padStart(2, '0')}`,
      idade: age,
      faixa_etaria: ageGroup,
      telefone: tel,
      email: `${nome.toLowerCase().replace(/\s/g, '.').normalize('NFD').replace(/[\u0300-\u036f]/g, '')}${randInt(1, 99)}@${pick(emailDomains)}`,
      noitePrefs,
      primeiro_cadastro: new Date(2025, randInt(0, 11), randInt(1, 28)),
    });
  }

  // Generate events (check-ins + transactions)
  const checkins = [];
  const transacoes = [];
  let txId = 1;

  // Target attendance per night type
  const publicoConfig = {
    flow: { min: 350, max: 550, ticketMin: 80, ticketMax: 110 },
    anos2000: { min: 750, max: 900, ticketMin: 110, ticketMax: 140 },
    salseiro: { min: 650, max: 850, ticketMin: 100, ticketMax: 130 },
    ritmos: { min: 1000, max: 1150, ticketMin: 130, ticketMax: 160 },
  };

  for (const noiteEvento of noites) {
    const { date, noite } = noiteEvento;
    const config = publicoConfig[noite.id];

    // Add some weekly variation
    const variacao = randFloat(0.85, 1.15);
    const publico = Math.round(randInt(config.min, config.max) * variacao);
    const ticketMedio = randFloat(config.ticketMin, config.ticketMax);

    // Select clients for this night based on preferences
    const clientesCandidatos = clientes
      .map((c) => ({ cliente: c, peso: c.noitePrefs[noite.id] * randFloat(0.5, 1.5) }))
      .sort((a, b) => b.peso - a.peso)
      .slice(0, publico)
      .map((c) => c.cliente);

    for (const cliente of clientesCandidatos) {
      // Check-in time: mostly 22h-01h arrival
      const horaChegada = pickWeighted(
        [22, 23, 0, 1, 2],
        [0.25, 0.35, 0.25, 0.10, 0.05]
      );
      const minChegada = randInt(0, 59);

      checkins.push({
        cliente_id: cliente.id,
        data: date.toISOString().split('T')[0],
        hora_chegada: `${String(horaChegada).padStart(2, '0')}:${String(minChegada).padStart(2, '0')}`,
        noite_id: noite.id,
        noite_nome: noite.nome,
      });

      // Generate transactions for this client
      const gastoAlvo = ticketMedio * randFloat(0.3, 2.5);
      let gastoAcumulado = 0;

      // Each client makes 2-8 purchases
      const numCompras = randInt(2, 8);

      for (let c = 0; c < numCompras && gastoAcumulado < gastoAlvo * 1.3; c++) {
        // Pick product weighted by night preferences and popularity
        const pesos = CARDAPIO.map(
          (p) => getPesoProduto(p, noite.id) * getPopularidadeBase(p) * randFloat(0.3, 1.7)
        );
        const produto = pickWeighted(CARDAPIO, pesos);
        const qtd = produto.categoria === 'Combos' || produto.categoria === 'Espumantes & Vinhos' ? 1 : randInt(1, 3);

        // Transaction time: spread throughout the night
        const horasTx = [22, 23, 0, 1, 2, 3, 4];
        const pesosTx = [0.10, 0.20, 0.25, 0.20, 0.15, 0.07, 0.03];
        const horaTx = pickWeighted(horasTx, pesosTx);
        const minTx = randInt(0, 59);

        transacoes.push({
          id: txId++,
          cliente_id: cliente.id,
          data: date.toISOString().split('T')[0],
          hora: `${String(horaTx).padStart(2, '0')}:${String(minTx).padStart(2, '0')}`,
          hora_num: horaTx < 6 ? horaTx + 24 : horaTx, // normalize for sorting
          produto_id: produto.id,
          produto_nome: produto.nome,
          categoria: produto.categoria,
          categoria_grupo: CATEGORIA_GRUPO[produto.categoria],
          quantidade: qtd,
          valor_unitario: produto.preco,
          valor_total: produto.preco * qtd,
          noite_id: noite.id,
          noite_nome: noite.nome,
        });

        gastoAcumulado += produto.preco * qtd;
      }
    }
  }

  return { clientes, checkins, transacoes, noites };
}

// Pre-compute aggregated data for the dashboard
export function computeAggregations(data, filters) {
  const { clientes, checkins, transacoes, noites } = data;

  // Apply date filter
  const hoje = new Date(2026, 2, 11);
  const diasFiltro = filters.periodo || 90;
  const dataInicio = new Date(hoje);
  dataInicio.setDate(dataInicio.getDate() - diasFiltro);
  const dataInicioStr = dataInicio.toISOString().split('T')[0];

  let txFiltradas = transacoes.filter((t) => t.data >= dataInicioStr);
  let cisFiltrados = checkins.filter((c) => c.data >= dataInicioStr);

  // Filter by night
  if (filters.noite && filters.noite !== 'todas') {
    txFiltradas = txFiltradas.filter((t) => t.noite_id === filters.noite);
    cisFiltrados = cisFiltrados.filter((c) => c.noite_id === filters.noite);
  }

  // KPIs — current period
  const receitaTotal = txFiltradas.reduce((s, t) => s + t.valor_total, 0);
  const clientesUnicos = new Set(cisFiltrados.map((c) => c.cliente_id)).size;
  const totalPublico = cisFiltrados.length;
  const ticketMedio = totalPublico > 0 ? receitaTotal / totalPublico : 0;

  // KPIs — previous period (for variation)
  const dataInicioPrev = new Date(dataInicio);
  dataInicioPrev.setDate(dataInicioPrev.getDate() - diasFiltro);
  const dataInicioPrevStr = dataInicioPrev.toISOString().split('T')[0];
  const txPrev = transacoes.filter((t) => t.data >= dataInicioPrevStr && t.data < dataInicioStr)
    .filter((t) => !filters.noite || filters.noite === 'todas' || t.noite_id === filters.noite);
  const cisPrev = checkins.filter((c) => c.data >= dataInicioPrevStr && c.data < dataInicioStr)
    .filter((c) => !filters.noite || filters.noite === 'todas' || c.noite_id === filters.noite);

  const receitaPrev = txPrev.reduce((s, t) => s + t.valor_total, 0);
  const publicoPrev = cisPrev.length;
  const unicosPrev = new Set(cisPrev.map((c) => c.cliente_id)).size;
  const ticketPrev = publicoPrev > 0 ? receitaPrev / publicoPrev : 0;

  const calcVar = (cur, prev) => prev > 0 ? (cur - prev) / prev : 0;

  // Per-night aggregations
  const noitesConfig = [
    { id: 'ritmos', nome: 'Ritmos', cor: '#10B981' },
    { id: 'anos2000', nome: 'Anos 2000', cor: '#EC4899' },
    { id: 'salseiro', nome: 'Salseiro', cor: '#F59E0B' },
    { id: 'flow', nome: 'Flow Like SP', cor: '#8B5CF6' },
  ];

  const porNoite = noitesConfig.map((n) => {
    const txN = transacoes.filter((t) => t.noite_id === n.id && t.data >= dataInicioStr);
    const cisN = checkins.filter((c) => c.noite_id === n.id && c.data >= dataInicioStr);
    const datasUnicas = [...new Set(cisN.map((c) => c.data))];
    const numNoites = datasUnicas.length || 1;

    const receita = txN.reduce((s, t) => s + t.valor_total, 0);
    const publico = cisN.length;

    // Mix de consumo por grupo
    const grupos = ['Drinks Autorais', 'Cervejas', 'Clássicos', 'Doses', 'Combos', 'Food', 'Soft Drinks', 'Espumantes'];
    const mix = {};
    const receitaPorGrupo = {};
    for (const g of grupos) {
      const txG = txN.filter((t) => t.categoria_grupo === g);
      receitaPorGrupo[g] = txG.reduce((s, t) => s + t.valor_total, 0);
    }
    const receitaTotalN = Object.values(receitaPorGrupo).reduce((s, v) => s + v, 0) || 1;
    for (const g of grupos) {
      mix[g] = ((receitaPorGrupo[g] / receitaTotalN) * 100).toFixed(1);
    }

    return {
      ...n,
      receita,
      receitaMedia: receita / numNoites,
      publico,
      publicoMedio: Math.round(publico / numNoites),
      ticketMedio: publico > 0 ? receita / publico : 0,
      numNoites,
      mix,
      receitaPorGrupo,
    };
  });

  // Weekly revenue evolution
  const semanasMap = {};
  for (const tx of txFiltradas) {
    const d = new Date(tx.data + 'T12:00:00');
    const weekStart = new Date(d);
    weekStart.setDate(d.getDate() - d.getDay());
    const weekKey = weekStart.toISOString().split('T')[0];
    if (!semanasMap[weekKey]) semanasMap[weekKey] = { semana: weekKey, flow: 0, anos2000: 0, salseiro: 0, ritmos: 0 };
    semanasMap[weekKey][tx.noite_id] += tx.valor_total;
  }
  const evolucaoSemanal = Object.values(semanasMap).sort((a, b) => a.semana.localeCompare(b.semana));

  // Perfil de público
  const faixasEtarias = ['18-21', '22-25', '26-30', '31-35', '36+'];
  const perfilPorNoite = noitesConfig.map((n) => {
    const cisN = checkins.filter((c) => c.noite_id === n.id && c.data >= dataInicioStr);
    const clienteIds = [...new Set(cisN.map((c) => c.cliente_id))];
    const clientesN = clienteIds.map((id) => clientes.find((c) => c.id === id)).filter(Boolean);

    const porFaixa = faixasEtarias.map((f, idx) => ({
      faixa: f,
      count: clientesN.filter((c) => c.faixa_etaria === idx).length,
    }));

    const generoM = clientesN.filter((c) => c.genero === 'M').length;
    const generoF = clientesN.filter((c) => c.genero === 'F').length;
    const generoO = clientesN.filter((c) => c.genero === 'O').length;
    const total = clientesN.length || 1;

    return {
      ...n,
      totalClientes: clientesN.length,
      porFaixa,
      genero: {
        masculino: ((generoM / total) * 100).toFixed(1),
        feminino: ((generoF / total) * 100).toFixed(1),
        outro: ((generoO / total) * 100).toFixed(1),
      },
    };
  });

  // CRM - Top clients
  const gastosPorCliente = {};
  const visitasPorCliente = {};
  const noitesPorCliente = {};
  const ultimaVisita = {};

  for (const ci of cisFiltrados) {
    visitasPorCliente[ci.cliente_id] = (visitasPorCliente[ci.cliente_id] || 0) + 1;
    if (!noitesPorCliente[ci.cliente_id]) noitesPorCliente[ci.cliente_id] = {};
    noitesPorCliente[ci.cliente_id][ci.noite_id] = (noitesPorCliente[ci.cliente_id][ci.noite_id] || 0) + 1;
    if (!ultimaVisita[ci.cliente_id] || ci.data > ultimaVisita[ci.cliente_id]) {
      ultimaVisita[ci.cliente_id] = ci.data;
    }
  }

  for (const tx of txFiltradas) {
    gastosPorCliente[tx.cliente_id] = (gastosPorCliente[tx.cliente_id] || 0) + tx.valor_total;
  }

  const clienteRanking = Object.keys(gastosPorCliente)
    .map((id) => {
      const cid = parseInt(id);
      const cliente = clientes.find((c) => c.id === cid);
      if (!cliente) return null;
      const visitas = visitasPorCliente[cid] || 0;
      const gasto = gastosPorCliente[cid] || 0;
      const noitesFreq = noitesPorCliente[cid] || {};
      const noiteFav = Object.entries(noitesFreq).sort((a, b) => b[1] - a[1])[0];
      const noiteNomeMap = { flow: 'Flow Like SP', anos2000: 'Anos 2000', salseiro: 'Salseiro', ritmos: 'Ritmos' };

      return {
        id: cid,
        nome: cliente.nome,
        gasto,
        visitas,
        ticketMedio: visitas > 0 ? gasto / visitas : 0,
        noiteFavorita: noiteFav ? noiteNomeMap[noiteFav[0]] : '-',
        ultimaVisita: ultimaVisita[cid] || '-',
        genero: cliente.genero,
        idade: cliente.idade,
        data_nascimento: cliente.data_nascimento,
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.gasto - a.gasto);

  const top20 = clienteRanking.slice(0, 20);

  // Segmentation
  const totalClientesPeriodo = clienteRanking.length;
  const top5pct = Math.ceil(totalClientesPeriodo * 0.05);
  const top20pct = Math.ceil(totalClientesPeriodo * 0.20);
  const hojeStr = hoje.toISOString().split('T')[0];
  const d60ago = new Date(hoje);
  d60ago.setDate(d60ago.getDate() - 60);
  const d60str = d60ago.toISOString().split('T')[0];

  const segmentos = {
    vip: clienteRanking.slice(0, top5pct),
    frequente: clienteRanking.slice(top5pct, top20pct),
    ocasional: clienteRanking.filter((c) => c.visitas <= 2),
    dorminte: clienteRanking.filter((c) => c.ultimaVisita < d60str),
  };

  const segmentacao = [
    { nome: 'VIP (top 5%)', count: segmentos.vip.length, gastoMedio: avg(segmentos.vip, 'gasto'), freqMedia: avg(segmentos.vip, 'visitas'), cor: '#D4A843' },
    { nome: 'Frequente (top 20%)', count: segmentos.frequente.length, gastoMedio: avg(segmentos.frequente, 'gasto'), freqMedia: avg(segmentos.frequente, 'visitas'), cor: '#3A7D52' },
    { nome: 'Ocasional (1-2 visitas)', count: segmentos.ocasional.length, gastoMedio: avg(segmentos.ocasional, 'gasto'), freqMedia: avg(segmentos.ocasional, 'visitas'), cor: '#6B7280' },
    { nome: 'Dorminte (>60d)', count: segmentos.dorminte.length, gastoMedio: avg(segmentos.dorminte, 'gasto'), freqMedia: avg(segmentos.dorminte, 'visitas'), cor: '#EF4444' },
  ];

  // Birthday: this week and month
  const hojeDate = new Date(2026, 2, 11);
  const mesAtual = hojeDate.getMonth() + 1;
  const diaAtual = hojeDate.getDate();
  const fimSemana = diaAtual + 7;

  const aniversariantesMes = clienteRanking
    .filter((c) => {
      const parts = c.data_nascimento.split('-');
      return parseInt(parts[1]) === mesAtual;
    })
    .slice(0, 30);

  const aniversariantesSemana = aniversariantesMes.filter((c) => {
    const dia = parseInt(c.data_nascimento.split('-')[2]);
    return dia >= diaAtual && dia < fimSemana;
  });

  // Churn risk: clients that were Frequente or VIP but last visit > 30 days ago
  const d30agoChurn = new Date(hoje);
  d30agoChurn.setDate(d30agoChurn.getDate() - 30);
  const d30churnStr = d30agoChurn.toISOString().split('T')[0];
  const churnClientes = clienteRanking
    .slice(0, top20pct) // VIP + Frequente
    .filter((c) => c.ultimaVisita < d30churnStr);
  const churnGastoTotal = churnClientes.reduce((s, c) => s + c.gasto, 0);

  // Birthdays module data
  const statusOptions = ['Identificado', 'Contatado', 'Confirmado'];
  const aniversariantesDetalhados = aniversariantesMes.slice(0, 20).map((c, i) => {
    const statusWeights = [0.35, 0.35, 0.30];
    let r = (i * 7 + 3) % 10 / 10;
    let status;
    if (r < statusWeights[0]) status = 'Identificado';
    else if (r < statusWeights[0] + statusWeights[1]) status = 'Contatado';
    else status = 'Confirmado';
    return { ...c, status };
  });

  const confirmados = aniversariantesDetalhados.filter((a) => a.status === 'Confirmado');
  const convidadosMediaEstimada = 12;
  const gastoMedioPorPessoa = 145;
  const receitaPotencialSemana = aniversariantesSemana.length * convidadosMediaEstimada * gastoMedioPorPessoa;
  const receitaConfirmada = confirmados.length * convidadosMediaEstimada * gastoMedioPorPessoa;
  const contatados = aniversariantesDetalhados.filter((a) => a.status !== 'Identificado').length;
  const taxaConversao = contatados > 0 ? ((confirmados.length / contatados) * 100).toFixed(0) : 0;

  const receitaMediaComAniversario = 127500;
  const receitaMediaSemAniversario = 89000;
  const deltaAniversario = receitaMediaComAniversario - receitaMediaSemAniversario;
  const deltaAniversarioPct = ((deltaAniversario / receitaMediaSemAniversario) * 100).toFixed(0);

  // Ocupação próximas 4 semanas (mock)
  // Hoje é 11/03/2026 (quarta). Próximas datas:
  const ocupacaoSemanas = [
    {
      label: 'Sem. 12/03',
      quinta: { data: '12/03', reservas: 2 },
      sexta: { data: '13/03', reservas: 1 },
      sabado: { data: '14/03', reservas: 3 },
    },
    {
      label: 'Sem. 19/03',
      quinta: { data: '19/03', reservas: 1 },
      sexta: { data: '20/03', reservas: 0 },
      sabado: { data: '21/03', reservas: 2 },
    },
    {
      label: 'Sem. 26/03',
      quinta: { data: '26/03', reservas: 0 },
      sexta: { data: '27/03', reservas: 1 },
      sabado: { data: '28/03', reservas: 1 },
    },
    {
      label: 'Sem. 02/04',
      quinta: { data: '02/04', reservas: 0 },
      sexta: { data: '03/04', reservas: 0 },
      sabado: { data: '04/04', reservas: 0 },
    },
  ];

  // University module data
  const faculdades = [
    { nome: 'Mauá', alunos: 1420, presencas: 3850, ultimaPresenca: '2026-03-07', maturidade: 82 },
    { nome: 'Mackenzie', alunos: 1180, presencas: 3200, ultimaPresenca: '2026-03-08', maturidade: 78 },
    { nome: 'Insper', alunos: 890, presencas: 2400, ultimaPresenca: '2026-03-06', maturidade: 71 },
    { nome: 'FGV', alunos: 750, presencas: 1800, ultimaPresenca: '2026-03-01', maturidade: 63 },
    { nome: 'ESPM', alunos: 680, presencas: 1650, ultimaPresenca: '2026-03-08', maturidade: 58 },
    { nome: 'PUC-SP', alunos: 620, presencas: 1400, ultimaPresenca: '2026-02-28', maturidade: 52 },
    { nome: 'USP', alunos: 540, presencas: 1100, ultimaPresenca: '2026-03-05', maturidade: 44 },
    { nome: 'FEI', alunos: 380, presencas: 750, ultimaPresenca: '2026-02-22', maturidade: 35 },
  ];

  const cenarios = {
    normal: {
      label: 'Quinta Normal',
      publico: 320,
      receitaBar: 48000,
      receitaEntrada: 19200,
      descEntrada: 'R$60 seco',
      ticketBar: 150,
    },
    lista: {
      label: 'Quinta c/ Lista Universitária',
      publico: 580,
      receitaBar: 72500,
      receitaEntrada: 24750,
      descEntrada: 'mix R$60 + R$75 consuma',
      ticketBar: 125,
    },
    evento: {
      label: 'Quinta Evento Fechado',
      publico: 900,
      receitaBar: 135000,
      receitaEntrada: 67500,
      descEntrada: 'R$75 consuma',
      ticketBar: 150,
    },
  };

  const evolucaoUniversitaria = [
    { mes: 'Out/25', total: 120 },
    { mes: 'Nov/25', total: 280 },
    { mes: 'Dez/25', total: 520 },
    { mes: 'Jan/26', total: 830 },
    { mes: 'Fev/26', total: 1100 },
    { mes: 'Mar/26', total: 1430 },
  ];

  const receitaEventoFechado = cenarios.evento.receitaBar + cenarios.evento.receitaEntrada;
  const receitaNormal = cenarios.normal.receitaBar + cenarios.normal.receitaEntrada;
  const equivaleQuintas = (receitaEventoFechado / receitaNormal).toFixed(1);
  const faculdadesProntas = faculdades.filter((f) => f.maturidade >= 75).length;

  // Cross-selling: Saturday clients who never came on Thursday
  const clientesSabado = new Set(checkins.filter((c) => c.noite_id === 'ritmos' && c.data >= dataInicioStr).map((c) => c.cliente_id));
  const clientesQuinta = new Set(checkins.filter((c) => c.noite_id === 'flow' && c.data >= dataInicioStr).map((c) => c.cliente_id));
  const sabadoNuncaQuinta = [...clientesSabado].filter((id) => !clientesQuinta.has(id));
  const crossSellPct = clientesSabado.size > 0 ? ((sabadoNuncaQuinta.length / clientesSabado.size) * 100).toFixed(1) : 0;

  // Frequency metrics
  const retorno30d = new Set();
  const d30ago = new Date(hoje);
  d30ago.setDate(d30ago.getDate() - 30);
  const d30str = d30ago.toISOString().split('T')[0];
  const clientesRecentes = clienteRanking.filter((c) => c.ultimaVisita >= d30str);
  const taxaRetorno = totalClientesPeriodo > 0 ? ((clientesRecentes.length / totalClientesPeriodo) * 100).toFixed(1) : 0;

  // Module 4: Cardápio analysis
  const produtoVendas = {};
  for (const tx of txFiltradas) {
    if (!produtoVendas[tx.produto_id]) {
      produtoVendas[tx.produto_id] = {
        id: tx.produto_id,
        nome: tx.produto_nome,
        categoria: tx.categoria,
        categoria_grupo: tx.categoria_grupo,
        quantidade: 0,
        receita: 0,
        preco: tx.valor_unitario,
      };
    }
    produtoVendas[tx.produto_id].quantidade += tx.quantidade;
    produtoVendas[tx.produto_id].receita += tx.valor_total;
  }

  const rankingProdutos = Object.values(produtoVendas).sort((a, b) => b.receita - a.receita);
  const top15Produtos = rankingProdutos.slice(0, 15);

  // Revenue by category group
  const receitaPorCategoria = {};
  for (const p of rankingProdutos) {
    receitaPorCategoria[p.categoria_grupo] = (receitaPorCategoria[p.categoria_grupo] || 0) + p.receita;
  }
  const categoriasChart = Object.entries(receitaPorCategoria)
    .map(([nome, receita]) => ({ nome, receita }))
    .sort((a, b) => b.receita - a.receita);

  // Heatmap: consumption by hour
  const horasLabel = ['22h', '23h', '00h', '01h', '02h', '03h', '04h'];
  const horasNum = [22, 23, 0, 1, 2, 3, 4];
  const heatmapData = noitesConfig.map((n) => {
    const txN = txFiltradas.filter((t) => t.noite_id === n.id);
    const porHora = {};
    for (const h of horasNum) {
      const normalH = h < 6 ? h + 24 : h;
      porHora[h] = txN.filter((t) => t.hora_num === normalH).reduce((s, t) => s + t.valor_total, 0);
    }
    return { noite: n.nome, cor: n.cor, ...porHora };
  });

  // Top 5 products per night
  const top5PorNoite = {};
  for (const n of noitesConfig) {
    const txN = txFiltradas.filter((t) => t.noite_id === n.id);
    const pv = {};
    for (const tx of txN) {
      if (!pv[tx.produto_id]) pv[tx.produto_id] = { nome: tx.produto_nome, receita: 0, qtd: 0 };
      pv[tx.produto_id].receita += tx.valor_total;
      pv[tx.produto_id].qtd += tx.quantidade;
    }
    top5PorNoite[n.id] = Object.values(pv).sort((a, b) => b.receita - a.receita).slice(0, 5);
  }

  return {
    kpis: {
      receitaTotal, ticketMedio, totalPublico, clientesUnicos,
      receitaTotalVariacao: calcVar(receitaTotal, receitaPrev),
      ticketMedioVariacao: calcVar(ticketMedio, ticketPrev),
      totalPublicoVariacao: calcVar(totalPublico, publicoPrev),
      clientesUnicosVariacao: calcVar(clientesUnicos, unicosPrev),
    },
    porNoite,
    evolucaoSemanal,
    perfilPorNoite,
    top20,
    segmentacao,
    aniversariantesSemana,
    aniversariantesMes,
    university: {
      cenarios,
      faculdades,
      evolucaoUniversitaria,
      projecao: {
        receitaEvento: receitaEventoFechado,
        equivaleQuintas,
        faculdadesProntas,
      },
    },
    birthdays: {
      aniversariantes: aniversariantesDetalhados,
      receitaPotencialSemana,
      receitaConfirmada,
      taxaConversao,
      ocupacaoSemanas,
      comparativo: {
        comAniversario: receitaMediaComAniversario,
        semAniversario: receitaMediaSemAniversario,
        delta: deltaAniversario,
        deltaPct: deltaAniversarioPct,
      },
    },
    churnRisk: { count: churnClientes.length, gastoTotal: churnGastoTotal },
    crossSell: { pct: crossSellPct, total: sabadoNuncaQuinta.length, totalSabado: clientesSabado.size },
    crm: {
      clientesUnicos30d: clientesRecentes.length,
      taxaRetorno,
      freqMediaRetorno: clienteRanking.length > 0
        ? (clienteRanking.reduce((s, c) => s + c.visitas, 0) / clienteRanking.length).toFixed(1)
        : 0,
    },
    cardapio: { top15Produtos, categoriasChart, heatmapData, top5PorNoite },
    horasLabel,
  };
}

function avg(arr, key) {
  if (arr.length === 0) return 0;
  return arr.reduce((s, item) => s + item[key], 0) / arr.length;
}
