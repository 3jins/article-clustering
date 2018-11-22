import * as koalanlp from 'koalanlp';

export default async (text) => {
  const nlpTools = {};

  await koalanlp.initialize({
    packages: [
      koalanlp.API.EUNJEON, // Use 은전한닢 for 품사분석(POS Tagging)
      koalanlp.API.KKMA, // Use 꼬꼬마 for 의존구문분석(Dependency Parsing)
    ],
    version: '1.9.2', // KoalaNLP version
    javaOptions: ['-Xmx4g'], // max heap memory size = 4GB
    debug: true,
  });
  nlpTools.tagger = new koalanlp.Tagger(koalanlp.API.EUNJEON);
  nlpTools.parser = new koalanlp.Parser(koalanlp.API.KKMA, koalanlp.API.EUNJEON);

  if (!nlpTools.parser) {
    console.error('Parser is not initialized!');
    return;
  }
  if (!text) {
    console.error('Text not exist!');
    return;
  }

  const parsed = await nlpTools.parser.parse(text);
  console.log(parsed);
  parsed.map((s) => {
    console.log(s.nouns());
    console.log(s.verbs());
  });
};
