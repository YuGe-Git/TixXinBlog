/**
 * @file registry.ts
 * @description 主题注册中心：基于 manifest 的注册、查询、父子合并与运行时缓存
 * @author TixXin
 * @since 2026-03-24
 */

import type { BlogThemeManifest, BlogThemeRuntime } from './contracts'
import { DEFAULT_THEME_ID } from './contracts'

// ─── 存储 ───

const manifestMap = new Map<string, BlogThemeManifest>()
const runtimeCache = new Map<string, BlogThemeRuntime>()

// ─── 注册 ───

/** 注册一个主题 manifest */
export function registerTheme(manifest: BlogThemeManifest) {
  manifestMap.set(manifest.id, manifest)
  runtimeCache.delete(manifest.id)
}

/** 注册主题并同时预填充 runtime 缓存（仅用于同步导入的内置主题） */
export function registerThemeWithRuntime(manifest: BlogThemeManifest, runtime: BlogThemeRuntime) {
  manifestMap.set(manifest.id, manifest)
  runtimeCache.set(manifest.id, runtime)
}

// ─── 查询 ───

/** 根据 ID 获取 manifest（已解析父子继承），未找到时回退默认主题 */
export function resolveManifest(id: string): BlogThemeManifest {
  const manifest = manifestMap.get(id)
  if (!manifest) return manifestMap.get(DEFAULT_THEME_ID)!
  if (!manifest.parent) return manifest
  const parent = resolveManifest(manifest.parent)
  return mergeManifests(parent, manifest)
}

/**
 * 同步获取已缓存的运行时产物，未缓存时返回 undefined。
 * 内置主题在注册时已预填充缓存，可保证同步可用。
 */
export function getCachedRuntime(id: string): BlogThemeRuntime | undefined {
  return runtimeCache.get(id)
}

/**
 * 异步获取运行时产物。
 * 若尚未加载，调用 manifest.load() 并缓存结果。
 */
export async function resolveRuntime(id: string): Promise<BlogThemeRuntime> {
  const cached = runtimeCache.get(id)
  if (cached) return cached

  const manifest = resolveManifest(id)
  const runtime = await manifest.load()
  runtimeCache.set(id, runtime)
  return runtime
}

/** 获取所有已注册主题的 manifest 列表 */
export function getRegisteredThemes(): BlogThemeManifest[] {
  return Array.from(manifestMap.values())
}

/** 检查指定 ID 的主题是否已注册 */
export function isThemeRegistered(id: string): boolean {
  return manifestMap.has(id)
}

/** 获取所有已注册主题的 ID 集合 */
export function getRegisteredThemeIds(): string[] {
  return Array.from(manifestMap.keys())
}

// ─── 卸载 ───

/** 卸载主题：清除 manifest 与 runtime 缓存，默认主题不可卸载 */
export function unregisterTheme(id: string): boolean {
  if (id === DEFAULT_THEME_ID) return false
  manifestMap.delete(id)
  runtimeCache.delete(id)
  return true
}

// ─── 兼容性校验 ───

export interface CompatibilityResult {
  ok: boolean
  reason?: string
}

/**
 * 校验主题 manifest 与当前宿主的兼容性。
 * 后续接入后端时，appVersion 应从 runtimeConfig 获取。
 */
export function checkCompatibility(
  manifest: BlogThemeManifest,
  appVersion = '1.0.0',
): CompatibilityResult {
  const required = manifest.compatibility.app
  if (required && !satisfiesSemver(appVersion, required)) {
    return { ok: false, reason: `需要宿主版本 ${required}，当前 ${appVersion}` }
  }
  if (manifest.parent && !manifestMap.has(manifest.parent)) {
    return { ok: false, reason: `父主题 ${manifest.parent} 未安装` }
  }
  return { ok: true }
}

/**
 * 简易 semver 范围匹配（仅支持 >=x.y.z 格式）。
 * 后续可替换为完整的 semver 库。
 */
function satisfiesSemver(current: string, range: string): boolean {
  const match = range.match(/^>=(\d+\.\d+\.\d+)$/)
  if (!match) return true
  const toNum = (v: string) => v.split('.').reduce((a, b) => a * 1000 + Number(b), 0)
  return toNum(current) >= toNum(match[1]!)
}

// ─── 向后兼容 ───

import type { BlogLayoutTheme } from './types'

/**
 * @deprecated 使用 resolveManifest + resolveRuntime 替代
 */
export function resolveTheme(id: string): BlogLayoutTheme {
  return resolveManifest(id)
}

// ─── 父子合并 ───

function mergeManifests(
  parent: BlogThemeManifest,
  child: BlogThemeManifest,
): BlogThemeManifest {
  return {
    ...parent,
    ...child,
    capabilities: { ...parent.capabilities, ...child.capabilities },
    defaults: { ...parent.defaults, ...child.defaults },
    load: child.load,
  }
}

// ─── 内置主题注册 ───

import classicTheme, { classicRuntime } from './classic/theme'
import docsTheme, { docsRuntime } from './docs/theme'
import minimalTheme, { minimalRuntime } from './minimal/theme'

/** 注册内置主题，使用同步导入确保 SSR 水合一致性 */
export function registerBuiltinThemesSync() {
  registerThemeWithRuntime(classicTheme, classicRuntime)
  registerThemeWithRuntime(docsTheme, docsRuntime)
  registerThemeWithRuntime(minimalTheme, minimalRuntime)
}
