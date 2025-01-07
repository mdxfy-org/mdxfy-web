import ptBR from "../../messages/pt-BR.json";

type Messages = typeof ptBR;

declare global {
  // Use type safe message keys with `next-intl`
  type IntlMessages = Messages;
}
