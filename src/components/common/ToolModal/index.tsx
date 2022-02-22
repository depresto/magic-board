import OriginalModal from "./Modal";
import Header from "./Header";
import { ModalProvider } from "./ModalContext";

type ToolModalType = typeof OriginalModal & {
  Provider: typeof ModalProvider;
  Header: typeof Header;
};

const ToolModal = OriginalModal as ToolModalType;
ToolModal.Provider = ModalProvider;
ToolModal.Header = Header;

export default ToolModal;
