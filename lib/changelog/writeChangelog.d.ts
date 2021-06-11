import { ChangeInfo, ChangeSet } from '../types/ChangeInfo';
import { PackageInfo } from '../types/PackageInfo';
import { BeachballOptions } from '../types/BeachballOptions';
export declare function writeChangelog(options: BeachballOptions, changeSet: ChangeSet, dependentChangeInfos: Array<ChangeInfo>, packageInfos: {
    [pkg: string]: PackageInfo;
}): Promise<void>;
//# sourceMappingURL=writeChangelog.d.ts.map