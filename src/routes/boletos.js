module.exports = (app) => {
  const getAll = (req, res) => {
    app.services.boleto.findAll()
      .then((result) => {
        const linha_digitavel = result.linha_digitavel;

        const barcode_field1 = linha_digitavel.substr(0, 3);
        const barcode_field2 = linha_digitavel.substr(3, 1);
        const barcode_field3 = linha_digitavel.substr(4, 5);
        const barcode_field4 = linha_digitavel.substr(10, 6);
        const barcode_field5 = linha_digitavel.substr(16, 4);
        const barcode_field6 = linha_digitavel.substr(21, 10);
        const barcode_field7 = linha_digitavel.substr(32, 15);

        const barCode = barcode_field1 + barcode_field2 + barcode_field7 + barcode_field3 + barcode_field4 + barcode_field5 + barcode_field6;
        const amount = parseFloat(linha_digitavel.substr(37)) / 100;

        const expirationDate = (linhaDigitavel) => {
          const moment = require('moment-timezone');
          linhaDigitavel = linha_digitavel.replace(/[^0-9]/g, '');

          let fatorData = '';
          const dataBoleto = moment.tz('1997-10-07 20:54:59.000Z', 'UTC');

          fatorData = linha_digitavel.substr(33, 4);

          dataBoleto.add(Number(fatorData), 'days');

          return dataBoleto.toDate();
        };

        function calculaMod10(numero) {
          numero = numero.replace(/\D/g, '');
          let i;
          let mult = 2;
          let soma = 0;
          let s = '';

          for (i = numero.length - 1; i >= 0; i--) {
            s = (mult * parseInt(numero.charAt(i))) + s;
            if (--mult < 1) {
              mult = 2;
            }
          }
          for (i = 0; i < s.length; i++) {
            soma += parseInt(s.charAt(i));
          }
          soma %= 10;
          if (soma != 0) {
            soma = 10 - soma;
          }
          return soma;
        }

        function calculaMod11(x) {
          const sequencia = [4, 3, 2, 9, 8, 7, 6, 5];
          let digit = 0;
          let j = 0;
          let DAC = 0;

          // FEBRABAN https://cmsportal.febraban.org.br/Arquivos/documentos/PDF/Layout%20-%20C%C3%B3digo%20de%20Barras%20-%20Vers%C3%A3o%205%20-%2001_08_2016.pdf
          for (let i = 0; i < x.length; i++) {
            const mult = sequencia[j];
            j++;
            j %= sequencia.length;
            digit += mult * parseInt(x.charAt(i));
          }

          DAC = digit % 11;

          if (DAC == 0 || DAC == 1) { return 0; }
          if (DAC == 10) { return 1; }

          return (11 - DAC);
        }

        const validarCodigoComDV = (linha_digitavel) => {
          linhaDigitavel = linha_digitavel.replace(/[^0-9]/g, '');
          let resultado;

          const bloco1 = linhaDigitavel.substr(0, 9) + calculaMod10(linhaDigitavel.substr(0, 9));
          const bloco2 = linhaDigitavel.substr(10, 10) + calculaMod10(linhaDigitavel.substr(10, 10));
          const bloco3 = linhaDigitavel.substr(21, 10) + calculaMod10(linhaDigitavel.substr(21, 10));
          const bloco4 = linhaDigitavel.substr(32, 1);
          const bloco5 = linhaDigitavel.substr(33);

          resultado = (bloco1 + bloco2 + bloco3 + bloco4 + bloco5).toString();

          return resultado;
        };

        const obj = {};

        obj.barCode = barCode;
        obj.amount = amount;
        obj.expirationDate = expirationDate();

        res.status(200).json(obj);
      });
  };

  const create = async (req, res) => {
    const result = await app.services.boleto.save(req.body);
    if (result.error) return res.status(400).json(result);
    return res.status(201).json(result[0]);
  };
  return { getAll, create };
};
