import { ChangeType } from '../types/ChangeInfo';
import { ConventionalCommitsOptions } from '../types/ConventionalCommitsOptions';
interface Change {
    type: ChangeType;
    message: string;
}
export declare function parseConventionalCommit(commitMessage: string, { types }: ConventionalCommitsOptions): Change | undefined;
export {};
//# sourceMappingURL=conventionalCommits.d.ts.map