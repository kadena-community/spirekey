import { ICap } from '@kadena/client';

/* valueLabels to be used to explain cmd.code */
const capTranslations: Record<string, any> = {
  [`${process.env.NAMESPACE}.webauthn-wallet.TRANSFER`]: {
    default: 'nl',
    en: {
      title: 'Transfer',
      description: 'Transfer {{2}} KDA from {{0}} to {{1}}',
      valueLabels: ['From', 'To', 'Amount'],
    },
    nl: {
      title: 'Transfer',
      description: 'Transfer {{2}} KDA van {{0}} naar {{1}}',
      valueLabels: ['Van', 'Naar', 'Hoeveelheid'],
    },
  },
  [`${process.env.NAMESPACE}.webauthn-wallet.GAS_PAYER`]: {
    default: 'nl',
    en: {
      title: 'Gas payer',
      description: 'You will pay for the transaction costs',
    },
    nl: {
      title: 'Gas payer',
      description: 'Jij betaalt de transactiekosten',
    },
  },
};

const getDescription = (key: string, args: any, language: string) => {
  const translation =
    capTranslations?.[key]?.[language] ||
    capTranslations[key]?.[capTranslations[key]?.default];

  if (!translation) return null;

  return {
    title: translation.title,
    description: translation.description.replace(
      /\{\{(\w+)\}\}/g,
      (match: string, index: string) => args[parseInt(index, 10)] || match,
    ),
  };
};

const getArgValue = (x: any) => (x?.decimal ? x.decimal : x?.int ? x.int : x);

export const getLabels = (signers: any[], language: string) =>
  signers.flatMap((signer) =>
    Array.isArray(signer.clist)
      ? signer.clist.flatMap((c: ICap) => {
          const { title, description } =
            getDescription(c.name, c.args, language) || {};
          const valuesString = c.args.map(getArgValue).join(', ');

          return [
            title
              ? {
                  raw: c,
                  label: title,
                  description,
                  valuesString,
                }
              : { raw: c, label: c.name, values: valuesString },
          ];
        })
      : [],
  );
