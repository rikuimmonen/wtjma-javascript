const sodexoFormat = (items, outputLang) => {
  const en = [];
  const fi = [];
  for (let i = 1; i < Object.keys(items).length + 1; i++) {
    en.push(items[i].title_en);
    fi.push(items[i].title_fi);
  }

  if (outputLang === 'en') {
    return en;
  } else if (outputLang === 'fi') {
    return fi;
  }
};

const SodexoData = {sodexoFormat};
export default SodexoData;
