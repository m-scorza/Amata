// Cardápio completo do AMATA SP com categorias
export const CATEGORIAS = {
  FOOD: 'Comidinhas',
  DRINKS_AUTORAIS: 'Drinks Autorais',
  DRINKS_SEM_ALCOOL: 'Drinks Sem Álcool',
  CLASSICOS: 'Clássicos',
  GIN_TONICA: 'Gin Tônica',
  CERVEJAS: 'Cervejas & Ice',
  JACK_DANIELS: "Jack Daniel's Drinks",
  WHISKEY: 'Whiskey',
  VODKA: 'Vodka',
  GIN: 'Gin',
  TEQUILA: 'Tequila',
  APERITIVO: 'Aperitivo & Cachaça',
  ESPUMANTES: 'Espumantes & Vinhos',
  COMBOS: 'Combos',
  SOFT: 'Soft Drinks',
};

// Mapeamento simplificado para gráficos
export const CATEGORIA_GRUPO = {
  [CATEGORIAS.FOOD]: 'Food',
  [CATEGORIAS.DRINKS_AUTORAIS]: 'Drinks Autorais',
  [CATEGORIAS.DRINKS_SEM_ALCOOL]: 'Soft Drinks',
  [CATEGORIAS.CLASSICOS]: 'Clássicos',
  [CATEGORIAS.GIN_TONICA]: 'Clássicos',
  [CATEGORIAS.CERVEJAS]: 'Cervejas',
  [CATEGORIAS.JACK_DANIELS]: 'Clássicos',
  [CATEGORIAS.WHISKEY]: 'Doses',
  [CATEGORIAS.VODKA]: 'Doses',
  [CATEGORIAS.GIN]: 'Doses',
  [CATEGORIAS.TEQUILA]: 'Doses',
  [CATEGORIAS.APERITIVO]: 'Doses',
  [CATEGORIAS.ESPUMANTES]: 'Espumantes',
  [CATEGORIAS.COMBOS]: 'Combos',
  [CATEGORIAS.SOFT]: 'Soft Drinks',
};

export const CARDAPIO = [
  // COMIDINHAS
  { id: 1, nome: 'Pasteizinhos (Carne Seca/Queijo)', preco: 34, categoria: CATEGORIAS.FOOD },
  { id: 2, nome: 'Pasteizinhos (Costela/Aipim)', preco: 34, categoria: CATEGORIAS.FOOD },
  { id: 3, nome: 'Pasteizinhos (Três Queijos)', preco: 34, categoria: CATEGORIAS.FOOD },
  { id: 4, nome: 'Dadinho de Tapioca c/ Palmito Pupunha', preco: 34, categoria: CATEGORIAS.FOOD },
  { id: 5, nome: 'Camarão Empanado', preco: 66, categoria: CATEGORIAS.FOOD },
  { id: 6, nome: 'Fritas Parmesão e Salsinha', preco: 44, categoria: CATEGORIAS.FOOD },
  { id: 7, nome: 'Parma, Brie & Mel', preco: 59, categoria: CATEGORIAS.FOOD },
  { id: 8, nome: 'Pastrami', preco: 59, categoria: CATEGORIAS.FOOD },
  { id: 9, nome: 'Cheeseburger', preco: 54, categoria: CATEGORIAS.FOOD },
  { id: 10, nome: 'Mousse de Chocolate c/ Cachaça', preco: 22, categoria: CATEGORIAS.FOOD },

  // DRINKS AUTORAIS
  { id: 11, nome: 'Summertime', preco: 49, categoria: CATEGORIAS.DRINKS_AUTORAIS },
  { id: 12, nome: 'R.T.B.', preco: 49, categoria: CATEGORIAS.DRINKS_AUTORAIS },
  { id: 13, nome: 'Atlântica', preco: 47, categoria: CATEGORIAS.DRINKS_AUTORAIS },
  { id: 14, nome: 'Tennessee Marmelade', preco: 49, categoria: CATEGORIAS.DRINKS_AUTORAIS },
  { id: 15, nome: 'Capim-Limão', preco: 45, categoria: CATEGORIAS.DRINKS_AUTORAIS },
  { id: 16, nome: 'Gin-ger', preco: 45, categoria: CATEGORIAS.DRINKS_AUTORAIS },

  // DRINKS SEM ÁLCOOL
  { id: 17, nome: 'Energya', preco: 38, categoria: CATEGORIAS.DRINKS_SEM_ALCOOL },
  { id: 18, nome: '#Cem Calorias', preco: 38, categoria: CATEGORIAS.DRINKS_SEM_ALCOOL },
  { id: 19, nome: 'Red Spritzer', preco: 38, categoria: CATEGORIAS.DRINKS_SEM_ALCOOL },

  // CLÁSSICOS
  { id: 20, nome: 'Vodka + Red Bull', preco: 49, categoria: CATEGORIAS.CLASSICOS },
  { id: 21, nome: 'Tropical Gin', preco: 49, categoria: CATEGORIAS.CLASSICOS },
  { id: 22, nome: 'Boulevardier', preco: 47, categoria: CATEGORIAS.CLASSICOS },
  { id: 23, nome: 'Aperol Spritz', preco: 46, categoria: CATEGORIAS.CLASSICOS },
  { id: 24, nome: 'Bramble Gordon\'s', preco: 44, categoria: CATEGORIAS.CLASSICOS },
  { id: 25, nome: 'Bramble Tanqueray', preco: 49, categoria: CATEGORIAS.CLASSICOS },
  { id: 26, nome: 'Caipirinha Sagatiba', preco: 39, categoria: CATEGORIAS.CLASSICOS },
  { id: 27, nome: 'Caipiroska Absolut', preco: 47, categoria: CATEGORIAS.CLASSICOS },
  { id: 28, nome: 'Caipiroska Cîroc', preco: 62, categoria: CATEGORIAS.CLASSICOS },
  { id: 29, nome: 'Campari Tonic', preco: 42, categoria: CATEGORIAS.CLASSICOS },
  { id: 30, nome: 'Cuba Libre Bacardi', preco: 40, categoria: CATEGORIAS.CLASSICOS },
  { id: 31, nome: 'Daiquiri Bacardi', preco: 40, categoria: CATEGORIAS.CLASSICOS },
  { id: 32, nome: 'Fitzgerald Gordon\'s', preco: 44, categoria: CATEGORIAS.CLASSICOS },
  { id: 33, nome: 'Fitzgerald Tanqueray', preco: 49, categoria: CATEGORIAS.CLASSICOS },
  { id: 34, nome: 'Long Island Iced Tea', preco: 44, categoria: CATEGORIAS.CLASSICOS },
  { id: 35, nome: 'Moscow Mule', preco: 44, categoria: CATEGORIAS.CLASSICOS },
  { id: 36, nome: 'Negroni Gordon\'s', preco: 42, categoria: CATEGORIAS.CLASSICOS },
  { id: 37, nome: 'Negroni Tanqueray', preco: 49, categoria: CATEGORIAS.CLASSICOS },
  { id: 38, nome: 'Old Fashioned', preco: 44, categoria: CATEGORIAS.CLASSICOS },
  { id: 39, nome: 'Saqueirinha', preco: 46, categoria: CATEGORIAS.CLASSICOS },
  { id: 40, nome: 'Penicillin', preco: 48, categoria: CATEGORIAS.CLASSICOS },
  { id: 41, nome: 'Jägerbomb', preco: 48, categoria: CATEGORIAS.CLASSICOS },

  // GIN TÔNICA
  { id: 42, nome: 'Schweppes Gin Tônica Pink LATA', preco: 25, categoria: CATEGORIAS.GIN_TONICA },
  { id: 43, nome: 'Schweppes Gin Tônica LATA', preco: 25, categoria: CATEGORIAS.GIN_TONICA },
  { id: 44, nome: 'Gin Tanqueray Tônica', preco: 46, categoria: CATEGORIAS.GIN_TONICA },
  { id: 45, nome: 'Classic (Gordon\'s Tônica)', preco: 42, categoria: CATEGORIAS.GIN_TONICA },
  { id: 46, nome: 'Herbal (Tanqueray Capim-Limão)', preco: 49, categoria: CATEGORIAS.GIN_TONICA },
  { id: 47, nome: 'Laranjeiras (Tanqueray Bitter)', preco: 49, categoria: CATEGORIAS.GIN_TONICA },

  // CERVEJAS & ICE
  { id: 48, nome: 'Amstel Ultra', preco: 19, categoria: CATEGORIAS.CERVEJAS },
  { id: 49, nome: 'Blue Moon', preco: 36, categoria: CATEGORIAS.CERVEJAS },
  { id: 50, nome: 'Lagunitas Day Time', preco: 36, categoria: CATEGORIAS.CERVEJAS },
  { id: 51, nome: 'PRAYA', preco: 21, categoria: CATEGORIAS.CERVEJAS },
  { id: 52, nome: 'Heineken', preco: 21, categoria: CATEGORIAS.CERVEJAS },
  { id: 53, nome: 'Heineken 0.0', preco: 21, categoria: CATEGORIAS.CERVEJAS },
  { id: 54, nome: 'Sol', preco: 19, categoria: CATEGORIAS.CERVEJAS },
  { id: 55, nome: 'Lagunitas IPA', preco: 36, categoria: CATEGORIAS.CERVEJAS },
  { id: 56, nome: 'Smirnoff Ice', preco: 28, categoria: CATEGORIAS.CERVEJAS },

  // JACK DANIEL'S DRINKS
  { id: 57, nome: 'Jack Honey LATA', preco: 29, categoria: CATEGORIAS.JACK_DANIELS },
  { id: 58, nome: 'Jack Apple & Tonic', preco: 43, categoria: CATEGORIAS.JACK_DANIELS },
  { id: 59, nome: 'Jack & Coke', preco: 43, categoria: CATEGORIAS.JACK_DANIELS },
  { id: 60, nome: 'Jack Fire & Ginger', preco: 45, categoria: CATEGORIAS.JACK_DANIELS },
  { id: 61, nome: 'Jack Honey & Lemonade', preco: 43, categoria: CATEGORIAS.JACK_DANIELS },
  { id: 62, nome: 'Maracujack', preco: 43, categoria: CATEGORIAS.JACK_DANIELS },
  { id: 63, nome: 'Jack Tennessee Mule', preco: 43, categoria: CATEGORIAS.JACK_DANIELS },

  // WHISKEY (dose)
  { id: 64, nome: "Ballantine's Sunshine", preco: 32, categoria: CATEGORIAS.WHISKEY },
  { id: 65, nome: "Jack Daniel's Nº7 (dose)", preco: 38, categoria: CATEGORIAS.WHISKEY },
  { id: 66, nome: "Jack Daniel's Honey (dose)", preco: 38, categoria: CATEGORIAS.WHISKEY },
  { id: 67, nome: 'Gentleman Jack (dose)', preco: 49, categoria: CATEGORIAS.WHISKEY },
  { id: 68, nome: 'Single Barrel Collection', preco: 59, categoria: CATEGORIAS.WHISKEY },
  { id: 69, nome: 'J.W. Red Label (dose)', preco: 36, categoria: CATEGORIAS.WHISKEY },
  { id: 70, nome: 'J.W. Black Label (dose)', preco: 42, categoria: CATEGORIAS.WHISKEY },
  { id: 71, nome: 'J.W. Double Black (dose)', preco: 51, categoria: CATEGORIAS.WHISKEY },
  { id: 72, nome: 'J.W. Gold Label (dose)', preco: 59, categoria: CATEGORIAS.WHISKEY },
  { id: 73, nome: 'Cardhu (dose)', preco: 55, categoria: CATEGORIAS.WHISKEY },
  { id: 74, nome: 'Talisker (dose)', preco: 66, categoria: CATEGORIAS.WHISKEY },

  // VODKA (dose)
  { id: 75, nome: 'Cîroc (dose)', preco: 49, categoria: CATEGORIAS.VODKA },
  { id: 76, nome: 'Absolut (dose)', preco: 34, categoria: CATEGORIAS.VODKA },

  // GIN (dose)
  { id: 77, nome: 'Beefeater (dose)', preco: 35, categoria: CATEGORIAS.GIN },
  { id: 78, nome: 'Tanqueray (dose)', preco: 39, categoria: CATEGORIAS.GIN },

  // TEQUILA (dose)
  { id: 79, nome: 'El Jimador Blanco', preco: 36, categoria: CATEGORIAS.TEQUILA },
  { id: 80, nome: 'El Jimador Reposado', preco: 42, categoria: CATEGORIAS.TEQUILA },

  // APERITIVO & CACHAÇA
  { id: 81, nome: 'Jambuzada', preco: 29, categoria: CATEGORIAS.APERITIVO },
  { id: 82, nome: 'Campari (dose)', preco: 29, categoria: CATEGORIAS.APERITIVO },
  { id: 83, nome: '5 Tiros do Caçador', preco: 149, categoria: CATEGORIAS.APERITIVO },
  { id: 84, nome: 'Jägermeister (dose)', preco: 38, categoria: CATEGORIAS.APERITIVO },
  { id: 85, nome: 'Cointreau', preco: 44, categoria: CATEGORIAS.APERITIVO },
  { id: 86, nome: 'Licor 43', preco: 43, categoria: CATEGORIAS.APERITIVO },
  { id: 87, nome: 'Bananinha', preco: 29, categoria: CATEGORIAS.APERITIVO },
  { id: 88, nome: 'Sagatiba (dose)', preco: 28, categoria: CATEGORIAS.APERITIVO },

  // ESPUMANTES & VINHOS
  { id: 89, nome: 'Chandon Garden Spritz', preco: 345, categoria: CATEGORIAS.ESPUMANTES },
  { id: 90, nome: 'Casal Garcia Maracujá', preco: 225, categoria: CATEGORIAS.ESPUMANTES },
  { id: 91, nome: 'Casal Garcia Strawberry', preco: 225, categoria: CATEGORIAS.ESPUMANTES },
  { id: 92, nome: 'Chandon Rosé', preco: 299, categoria: CATEGORIAS.ESPUMANTES },
  { id: 93, nome: 'Chandon Brut', preco: 279, categoria: CATEGORIAS.ESPUMANTES },

  // COMBOS
  { id: 94, nome: 'Jägermeister + Red Bull', preco: 570, categoria: CATEGORIAS.COMBOS },
  { id: 95, nome: 'Gin Beefeater + Red Bull', preco: 620, categoria: CATEGORIAS.COMBOS },
  { id: 96, nome: 'Gin Beefeater + Tônica', preco: 560, categoria: CATEGORIAS.COMBOS },
  { id: 97, nome: 'Gin Tanqueray + Tônica', preco: 570, categoria: CATEGORIAS.COMBOS },
  { id: 98, nome: 'Gin Tanqueray + Red Bull', preco: 670, categoria: CATEGORIAS.COMBOS },
  { id: 99, nome: 'Red Label + Red Bull', preco: 590, categoria: CATEGORIAS.COMBOS },
  { id: 100, nome: 'Red Label + Água de Coco', preco: 520, categoria: CATEGORIAS.COMBOS },
  { id: 101, nome: 'Black Label + Red Bull', preco: 720, categoria: CATEGORIAS.COMBOS },
  { id: 102, nome: 'Black Label + Água de Coco', preco: 720, categoria: CATEGORIAS.COMBOS },
  { id: 103, nome: "Jack Daniel's Nº7 + Red Bull", preco: 620, categoria: CATEGORIAS.COMBOS },
  { id: 104, nome: "Jack Daniel's Nº7 + Coca-Cola", preco: 590, categoria: CATEGORIAS.COMBOS },
  { id: 105, nome: 'Cîroc + Red Bull', preco: 730, categoria: CATEGORIAS.COMBOS },
  { id: 106, nome: 'Absolut + Red Bull', preco: 520, categoria: CATEGORIAS.COMBOS },

  // SOFT DRINKS
  { id: 107, nome: 'Red Bull', preco: 27, categoria: CATEGORIAS.SOFT },
  { id: 108, nome: 'Água de Coco', preco: 27, categoria: CATEGORIAS.SOFT },
  { id: 109, nome: 'Coca-Cola', preco: 17, categoria: CATEGORIAS.SOFT },
  { id: 110, nome: 'Sprite', preco: 17, categoria: CATEGORIAS.SOFT },
  { id: 111, nome: 'Tônica', preco: 17, categoria: CATEGORIAS.SOFT },
  { id: 112, nome: 'Citrus', preco: 17, categoria: CATEGORIAS.SOFT },
  { id: 113, nome: 'Água sem Gás', preco: 12, categoria: CATEGORIAS.SOFT },
  { id: 114, nome: 'Água com Gás', preco: 12, categoria: CATEGORIAS.SOFT },
];
