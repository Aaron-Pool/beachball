import { ChangeAnnotations, ChangeFileInfo } from '../types/ChangeInfo';
import { ConventionalCommitsOptions, ConventionalTypes } from '../types/ConventionalCommitsOptions';

/**
 * 1. type
 * 2. scope
 * 3. breaking
 * 4. message
 */
const COMMIT_RE = /([a-z]+)(?:\(([a-z]+)\))?(!)?: (.+)/;

interface ConventionalCommit {
  type: string;
  scope?: string;
  breaking: boolean;
  message: string;
}

export function parseConventionalCommit(
  commitMessage: string,
  { types = {} }: ConventionalCommitsOptions
): Partial<ChangeFileInfo> | undefined {
  const match = commitMessage.match(COMMIT_RE);
  const data: ConventionalCommit | undefined = match
    ? { type: match[1], scope: match[2], breaking: !!match[3], message: match[4] }
    : undefined;

  return data && map(data, types);
}

function map(d: ConventionalCommit, types: ConventionalTypes): Partial<ChangeFileInfo> | undefined {
  const annotations: ChangeAnnotations = {}
  if (d.scope) {
    annotations.scope = d.scope;
  }

  if (d.breaking) {
    return { type: 'major', comment: d.message, annotations };
  }

  const mappedType = types[d.type] ?? null;
  if (mappedType) {
    const { changeType, label } = mappedType;
    annotations.customType = d.type;
    annotations.display = label ?? d.type;
    return { type: changeType, comment: d.message, annotations };
  }

  switch (d.type) {
    case 'fix':
    case 'chore':
      return { type: 'patch', comment: d.message, annotations };
    case 'feat':
      return { type: 'minor', comment: d.message, annotations };
  }
}
