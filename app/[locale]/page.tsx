import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("home");
  return <main>{t("title")}</main>;
}
