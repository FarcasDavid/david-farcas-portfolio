import { initTheme } from "./scripts/appearance/theme-controller.js";
import { initPointerEffects } from "./scripts/appearance/pointer-effects.js";
import { initViewNavigation } from "./scripts/navigation/view-navigation.js";
import { initWorkflowExplorer } from "./scripts/workflow/workflow-explorer.js";
import { initContactForm } from "./scripts/contact/contact-form.js";
import { createFormSubmitDelivery } from "./scripts/contact/formsubmit-delivery.js";

// The composition root supplies browser capabilities and coordinates features.
const copyText = (text) => navigator.clipboard.writeText(text);
initTheme({ document, window });
const contact = initContactForm({
  document,
  window,
  deliverMessage: createFormSubmitDelivery({ fetch: window.fetch.bind(window) }),
  copyText,
});
initViewNavigation({
  document,
  window,
  onViewChange(view) {
    if (view !== "contact") contact.close({ restoreFocus: false });
  },
});
initWorkflowExplorer({ document });
initPointerEffects({ document, window });
