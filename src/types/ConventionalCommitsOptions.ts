import { ChangeType } from './ChangeInfo'

export interface ConventionalType {
  changeType: ChangeType,
  label: string
}

export type ConventionalTypes = Record<string, ConventionalType>;

export interface ConventionalCommitsOptions {
  types?: ConventionalTypes
}