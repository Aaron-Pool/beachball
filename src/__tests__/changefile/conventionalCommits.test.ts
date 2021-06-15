import { parseConventionalCommit } from '../../changefile/conventionalCommits';

describe.each<[string, ReturnType<typeof parseConventionalCommit>]>([
  ['fix: change message\nbody', { type: 'patch', comment: 'change message' }],
  ['chore: change', { type: 'patch', comment: 'change' }],
  ['feat: change', { type: 'minor', comment: 'change' }],
  ['perf(rendering): change', {
    type: 'patch',
    comment: 'change',
    annotations: { scope: 'rendering', customType: 'perf', display: 'Performance Improvements' }
  }],
  ['refactor: change', { type: 'patch', comment: 'change' }],
  ['feat(scope): change', { type: 'minor', comment: 'change', annotations: { scope: 'scope' } }],
  ['feat!: change', { type: 'major', comment: 'change' }],
  ['feat(scope)!: change', { type: 'major', comment: 'change' }],
  ['foo', undefined],
])('parse(%s)', (s, expected) => {
  test('should parse correctly', () => expect(parseConventionalCommit(s, {
    types: {
      perf: { changeType: 'patch', label: 'Performance Improvements' }, refactor: { changeType: 'patch', label: 'Refactors' }
    }
  })).toEqual(expected));
});
