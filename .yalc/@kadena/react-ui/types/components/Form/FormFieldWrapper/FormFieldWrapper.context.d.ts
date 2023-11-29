import type { vars } from '../../../styles/vars.css';
import type { FormFieldStatus } from '../Form.css';
export type OpenSections = string[];
interface IFormFieldWrapperContext {
    status?: FormFieldStatus;
    leadingTextWidth?: keyof typeof vars.sizes;
}
export declare const FormFieldWrapperContext: import("react").Context<IFormFieldWrapperContext>;
export {};
//# sourceMappingURL=FormFieldWrapper.context.d.ts.map