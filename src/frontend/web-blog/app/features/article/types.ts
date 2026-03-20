/**
 * @file types.ts
 * @description 文章归档模块类型定义
 * @author TixXin
 * @since 2025-03-17
 */

export type ArchiveCategoryColor =
  | 'emerald'
  | 'rose'
  | 'sky'
  | 'amber'
  | 'blue'
  | 'slate'
  | 'orange'

export interface ArchivePost {
  date: string
  title: string
  category: string
  categoryColor: ArchiveCategoryColor
  href: string
}

export interface ArchiveYear {
  year: number
  shortYear: string
  count: number
  posts: ArchivePost[]
}

export interface ArchiveStat {
  label: string
  value: string
}

export interface CategoryDistribution {
  name: string
  count: number
  percent: number
}
