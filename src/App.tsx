import Home from "./pages/Home";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { LanguageProvider } from "@/i18n/LanguageContext";

export default function App() {
  return (
    <LanguageProvider>
      <LanguageSwitcher />
      <Home />
    </LanguageProvider>
  );
}
