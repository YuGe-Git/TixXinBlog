/**
 * @file clear.js
 * @description 清理项目依赖：删除根目录与 web-blog 的 node_modules、pnpm-lock.yaml，并执行 pnpm store prune
 * @author TixXin
 * @since 2025-03-23
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

const targets = [
  { path: path.join(rootDir, 'node_modules'), type: 'dir' },
  { path: path.join(rootDir, 'src', 'frontend', 'web-blog', 'node_modules'), type: 'dir' },
  { path: path.join(rootDir, 'pnpm-lock.yaml'), type: 'file' },
]

function rmSync(targetPath, type) {
  try {
    if (fs.existsSync(targetPath)) {
      if (type === 'dir') {
        fs.rmSync(targetPath, { recursive: true, force: true })
        console.log(`已删除目录: ${path.relative(rootDir, targetPath)}`)
      } else {
        fs.unlinkSync(targetPath)
        console.log(`已删除文件: ${path.relative(rootDir, targetPath)}`)
      }
    } else {
      console.log(`跳过（不存在）: ${path.relative(rootDir, targetPath)}`)
    }
  } catch (err) {
    console.error(`删除失败 ${targetPath}:`, err)
  }
}

console.clear()
console.log('开始清理依赖...\n')

for (const { path: p, type } of targets) {
  rmSync(p, type)
}

console.log('\n执行 pnpm store prune...')
const prune = spawnSync('pnpm', ['store', 'prune'], {
  cwd: rootDir,
  stdio: 'inherit',
  shell: true,
})

if (prune.status !== 0) {
  console.warn(
    '\n警告: pnpm store prune 执行失败（Windows 上常见 EPERM，可能是其他进程占用 store）。',
    '\n项目 node_modules 与 lock 文件已清理完毕，可执行 pnpm install 恢复依赖。',
    '\n如需清理 store，请关闭其他 Node 进程后手动执行: pnpm store prune\n',
  )
}

console.log('\n清理完成。')
