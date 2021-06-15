export type ChangeType = 'prerelease' | 'patch' | 'minor' | 'major' | 'none';

export interface ChangeAnnotations {
  scope?: string,
  customType?: string
  display?: string
}

/**
 * Info saved in each change file.
 */
export interface ChangeFileInfo {
  type: ChangeType;
  comment: string;
  packageName: string;
  email: string;
  dependentChangeType?: ChangeType;
  annotations?: ChangeAnnotations;
}

/**
 * Info saved in each change file, plus the commit hash.
 */
export interface ChangeInfo extends ChangeFileInfo {
  commit: string;
}

export type ChangeSet = Map<string, ChangeInfo>;
