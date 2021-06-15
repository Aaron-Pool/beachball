import { ChangeType } from './ChangeInfo';
export interface ConventionalType {
    changeType: ChangeType;
    label: string;
}
export declare type ConventionalTypes = Record<string, ConventionalType>;
export interface ConventionalCommitsOptions {
    types?: ConventionalTypes;
}
//# sourceMappingURL=ConventionalCommitsOptions.d.ts.map