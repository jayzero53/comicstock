import Confirmation from './Confirmation.jsx';
import { createConfirmation } from 'react-confirm';

const defaultConfirmation = createConfirmation(Confirmation);

export default function confirm(confirmation, options = {}) {
  return defaultConfirmation({ confirmation, ...options });
}
