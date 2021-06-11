import { ChangeType } from '../types/ChangeInfo';
interface Change {
    type: ChangeType;
    message: string;
}
export declare function parseConventionalCommit(commitMessage: string): Change | undefined;
export {};
//# sourceMappingURL=conventionalCommits.d.ts.map