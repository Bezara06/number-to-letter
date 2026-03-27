const toolConfig = {
  letters: {
    title: "Nombre en lettres",
    description: "Ecris un nombre decimal pour obtenir sa version en lettres.",
    format: "DEC -> TXT",
    inputLabel: "Nombre decimal",
    placeholder: "Ex: 2026",
    helper: "Accepte uniquement les chiffres de 0 a 999 999 999.",
    examples: ["125", "2026", "4096"]
  },
  decToBin: {
    title: "DEC to BIN",
    description: "Convertit un nombre decimal positif en representation binaire.",
    format: "DEC -> BIN",
    inputLabel: "Nombre decimal",
    placeholder: "Ex: 42",
    helper: "Accepte uniquement les chiffres decimaux positifs.",
    examples: ["8", "42", "255"]
  },
  binToDec: {
    title: "BIN to DEC",
    description: "Lis un nombre binaire et affiche son equivalent decimal.",
    format: "BIN -> DEC",
    inputLabel: "Nombre binaire",
    placeholder: "Ex: 101010",
    helper: "Utilise seulement 0 et 1.",
    examples: ["1010", "11111111", "100000"]
  },
  octToDec: {
    title: "OCTAL to DEC",
    description: "Convertit un nombre en base 8 vers le systeme decimal.",
    format: "OCT -> DEC",
    inputLabel: "Nombre octal",
    placeholder: "Ex: 17",
    helper: "Utilise uniquement des chiffres de 0 a 7.",
    examples: ["17", "144", "777"]
  },
  decToOct: {
    title: "DEC to OCTAL",
    description: "Transforme un nombre decimal en notation octale.",
    format: "DEC -> OCT",
    inputLabel: "Nombre decimal",
    placeholder: "Ex: 64",
    helper: "Accepte uniquement les chiffres decimaux positifs.",
    examples: ["9", "64", "512"]
  },
  decToHex: {
    title: "DEC to HEXA",
    description: "Convertit un decimal vers l'hexadecimal en majuscules.",
    format: "DEC -> HEX",
    inputLabel: "Nombre decimal",
    placeholder: "Ex: 255",
    helper: "Accepte uniquement les chiffres decimaux positifs.",
    examples: ["15", "255", "4095"]
  }
};

const toolButtons = document.querySelectorAll('.tool-item');
const input = document.getElementById('nombre');
const convertButton = document.getElementById('button');
const clearButton = document.getElementById('del');
const result = document.getElementById('div2');
const feedback = document.getElementById('feedback');
const copyButton = document.getElementById('copy-result');
const helperText = document.getElementById('helper-text');
const inputLabel = document.getElementById('input-label');
const toolHeading = document.getElementById('tool-heading');
const toolDescription = document.getElementById('tool-description');
const toolFormat = document.getElementById('tool-format');
const examplesContainer = document.getElementById('quick-examples');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

let activeTool = 'letters';

menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  navLinks.classList.toggle('open');
  document.body.classList.toggle('menu-open', !expanded);
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.nav') && navLinks.classList.contains('open')) {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  });
});

function setFeedback(message, type = '') {
  feedback.textContent = message;
  feedback.className = type ? `feedback ${type}` : 'feedback';
}

function normalizeSpaces(value) {
  return value.replace(/\s+/g, ' ').trim();
}

function renderExamples(values) {
  examplesContainer.innerHTML = values
    .map((value) => `<button type="button" class="example-chip" data-value="${value}">${value}</button>`)
    .join('');

  examplesContainer.querySelectorAll('.example-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      input.value = chip.dataset.value;
      input.focus();
      setFeedback('Exemple charge. Tu peux convertir maintenant.', 'success');
    });
  });
}

function updateTool(toolKey) {
  activeTool = toolKey;
  const config = toolConfig[toolKey];

  toolButtons.forEach((button) => {
    const isActive = button.dataset.tool === toolKey;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-selected', String(isActive));
  });

  toolHeading.textContent = config.title;
  toolDescription.textContent = config.description;
  toolFormat.textContent = config.format;
  inputLabel.textContent = config.inputLabel;
  input.placeholder = config.placeholder;
  helperText.textContent = config.helper;
  renderExamples(config.examples);
  input.value = '';
  result.value = '';
  setFeedback('');
}

function validateDigits(value) {
  return /^\d+$/.test(value);
}

function convertNumberToLetters(rawValue) {
  if (!validateDigits(rawValue)) {
    throw new Error('Entre un nombre decimal valide compose uniquement de chiffres.');
  }

  const number = Number(rawValue);

  if (!Number.isSafeInteger(number) || number < 0 || number > 999999999) {
    throw new Error('Le nombre doit etre compris entre 0 et 999 999 999.');
  }

  if (number === 0) {
    return 'zero';
  }

  const units = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf'];
  const teens = ['dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'];
  const tens = ['', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante'];

  function belowHundred(value) {
    if (value < 10) {
      return units[value];
    }

    if (value < 20) {
      return teens[value - 10];
    }

    if (value < 70) {
      const ten = Math.floor(value / 10);
      const unit = value % 10;
      if (unit === 0) {
        return tens[ten];
      }
      if (unit === 1) {
        return `${tens[ten]} et un`;
      }
      return `${tens[ten]}-${units[unit]}`;
    }

    if (value < 80) {
      if (value === 71) {
        return 'soixante et onze';
      }
      return `soixante-${belowHundred(value - 60)}`;
    }

    if (value === 80) {
      return 'quatre-vingts';
    }

    return `quatre-vingt-${belowHundred(value - 80)}`;
  }

  function belowThousand(value) {
    if (value < 100) {
      return belowHundred(value);
    }

    const hundred = Math.floor(value / 100);
    const rest = value % 100;

    if (hundred === 1) {
      return rest === 0 ? 'cent' : `cent ${belowHundred(rest)}`;
    }

    const hundredWord = rest === 0 ? 'cents' : 'cent';
    return rest === 0
      ? `${units[hundred]} ${hundredWord}`
      : `${units[hundred]} cent ${belowHundred(rest)}`;
  }

  const parts = [];
  const millions = Math.floor(number / 1000000);
  const thousands = Math.floor((number % 1000000) / 1000);
  const remainder = number % 1000;

  if (millions > 0) {
    parts.push(millions === 1 ? 'un million' : `${belowThousand(millions)} millions`);
  }

  if (thousands > 0) {
    if (thousands === 1) {
      parts.push('mille');
    } else {
      parts.push(`${belowThousand(thousands)} mille`);
    }
  }

  if (remainder > 0) {
    parts.push(belowThousand(remainder));
  }

  return normalizeSpaces(parts.join(' '));
}

function parseDecimal(value) {
  if (!validateDigits(value)) {
    throw new Error('Entre un nombre decimal valide compose uniquement de chiffres.');
  }

  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed < 0) {
    throw new Error('Le nombre decimal doit etre un entier positif.');
  }
  return parsed;
}

function convertValue(toolKey, rawValue) {
  const value = rawValue.trim();

  if (!value) {
    throw new Error('Saisis une valeur avant de convertir.');
  }

  switch (toolKey) {
    case 'letters':
      return convertNumberToLetters(value);
    case 'decToBin':
      return parseDecimal(value).toString(2);
    case 'binToDec':
      if (!/^[01]+$/.test(value)) {
        throw new Error('Le format binaire accepte uniquement 0 et 1.');
      }
      return parseInt(value, 2).toString(10);
    case 'octToDec':
      if (!/^[0-7]+$/.test(value)) {
        throw new Error('Le format octal accepte uniquement les chiffres de 0 a 7.');
      }
      return parseInt(value, 8).toString(10);
    case 'decToOct':
      return parseDecimal(value).toString(8);
    case 'decToHex':
      return parseDecimal(value).toString(16).toUpperCase();
    default:
      throw new Error('Outil introuvable.');
  }
}

function handleConvert() {
  try {
    const output = convertValue(activeTool, input.value);
    result.value = output;
    setFeedback('Conversion terminee avec succes.', 'success');
  } catch (error) {
    result.value = '';
    setFeedback(error.message, 'error');
  }
}

convertButton.addEventListener('click', handleConvert);

input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    handleConvert();
  }
});

clearButton.addEventListener('click', () => {
  input.value = '';
  result.value = '';
  setFeedback('Champ vide.');
  input.focus();
});

copyButton.addEventListener('click', async () => {
  if (!result.value) {
    setFeedback('Aucun resultat a copier.', 'error');
    return;
  }

  try {
    await navigator.clipboard.writeText(result.value);
    setFeedback('Resultat copie dans le presse-papiers.', 'success');
  } catch (error) {
    setFeedback('Copie impossible dans ce navigateur.', 'error');
  }
});

toolButtons.forEach((button) => {
  button.addEventListener('click', () => updateTool(button.dataset.tool));
});

updateTool(activeTool);
