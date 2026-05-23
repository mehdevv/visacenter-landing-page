import Home from "./pages/Home";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { LocaleAnimatedPage } from "@/components/LocaleAnimatedPage";
import { MobileStickyCta } from "@/components/MobileStickyCta";
import { LanguageProvider } from "@/i18n/LanguageContext";

export default function App() {
  return (
    <LanguageProvider>
      <LanguageSwitcher />
      <LocaleAnimatedPage>
        <Home />
      </LocaleAnimatedPage>
      <MobileStickyCta />
    </LanguageProvider>
  );
}
