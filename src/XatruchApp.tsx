import { AppRouter } from "./router/AppRouter";
import { ScrollToAnchor, ScrollToTop } from "./ui";

export const XatruchApp = () => {
  return (
    <>
      <ScrollToTop />
      <ScrollToAnchor />
      <AppRouter />
    </>
  );
};
