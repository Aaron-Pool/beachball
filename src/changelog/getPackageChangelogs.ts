import { ChangeInfo, ChangeSet } from '../types/ChangeInfo';
import { PackageInfo } from '../types/PackageInfo';
import { ChangelogEntry, PackageChangelog } from '../types/ChangeLog';
import { generateTag } from '../tag';

export function getPackageChangelogs(
  changeSet: ChangeSet,
  dependentChangeInfos: Array<ChangeInfo>,
  packageInfos: {
    [pkg: string]: PackageInfo;
  }
) {
  const changeInfos = Array.from(changeSet.values()).concat(dependentChangeInfos);
  const changelogs: {
    [pkgName: string]: PackageChangelog;
  } = {};
  for (let change of changeInfos) {
    const { packageName } = change;
    if (!changelogs[packageName]) {
      const version = packageInfos[packageName].version;
      changelogs[packageName] = {
        name: packageName,
        version,
        tag: generateTag(packageName, version),
        date: new Date(),
        comments: {},
      };
    }

    changelogs[packageName].comments = changelogs[packageName].comments || {};
    changelogs[packageName].comments[change.type] = changelogs[packageName].comments[change.type] || [];

    const newEntry: ChangelogEntry = {
      comment: change.comment,
      author: change.email,
      commit: change.commit,
      package: packageName,
    }

    if (change.annotations && Object.keys(change.annotations).length > 0) {
      newEntry.annotations = change.annotations;
    }

    changelogs[packageName].comments[change.type]!.push(newEntry);
  }
  return changelogs;
}
