import { ChangeType } from './ChangeInfo'

export interface ConventionalCommitsOptions {
  types?: Record<string, ChangeType>
}