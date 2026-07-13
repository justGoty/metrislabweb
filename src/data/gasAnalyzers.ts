export type GasAnalyzerType = 'stationary' | 'portable';

export interface GasAnalyzer {
  id: string;
  nameKey: string;
  descriptionKey: string;
  manufacturer: {
    ru: string;
    en: string;
  };
  type: GasAnalyzerType;
  image: string;
  aliases: string[];
}

export const gasAnalyzers: GasAnalyzer[] = [
  {
    id: 'mirax-safety-atom',
    nameKey: 'analyzers.model1',
    descriptionKey: 'analyzers.model1_desc',
    manufacturer: { ru: 'MIRAX', en: 'MIRAX' },
    type: 'stationary',
    image: '/images/gas-analyzers/mirax-atom.png',
    aliases: ['mirax', 'safety atom', 'миракс', 'атом'],
  },
  {
    id: 'sta-kd1',
    nameKey: 'analyzers.model2',
    descriptionKey: 'analyzers.model2_desc',
    manufacturer: { ru: 'СТА', en: 'STA' },
    type: 'stationary',
    image: '/images/gas-analyzers/sta-kd1.png',
    aliases: ['ста кд1', 'ста-кд1', 'sta kd1', 'sta-kd1'],
  },
  {
    id: 'kip-mg1',
    nameKey: 'analyzers.model3',
    descriptionKey: 'analyzers.model3_desc',
    manufacturer: { ru: 'КИП', en: 'KIP' },
    type: 'portable',
    image: '/images/gas-analyzers/kip-mg1.png',
    aliases: ['кип мг1', 'кип-мг1', 'kip mg1', 'kip-mg1'],
  },
  {
    id: 'kip-mg4',
    nameKey: 'analyzers.model4',
    descriptionKey: 'analyzers.model4_desc',
    manufacturer: { ru: 'КИП', en: 'KIP' },
    type: 'portable',
    image: '/images/gas-analyzers/kip-mg4-clean.png',
    aliases: ['кип мг4', 'кип-мг4', 'kip mg4', 'kip-mg4'],
  },
];
