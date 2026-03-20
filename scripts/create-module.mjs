import { mkdirSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { join } from 'path';

const name = process.argv[2];

if (!name) {
  console.error('Usage: node scripts/create-module.mjs <nama-modul>');
  process.exit(1);
}

const base = join('modules', name);
const folders = [
  // core
  'src/core/models',
  'src/core/repositories',
  'src/core/use-cases',
  'src/core/commands',
  'src/core/queries',
  // infrastructure
  'src/infrastructure/mappers',
  'src/infrastructure/repositories',
  'src/infrastructure/providers',
  'src/infrastructure/commands',
  'src/infrastructure/queries',
  // presentation
  'src/presentation/hooks',
  'src/presentation/pages',
  'src/presentation/components',
  'src/presentation/routes',
];

// Buat folders
folders.forEach((f) => mkdirSync(join(base, f), { recursive: true }));

// Buat package.json
writeFileSync(
  join(base, 'package.json'),
  JSON.stringify(
    {
      name: `@genmedical/${name}`,
      version: '0.0.1',
      type: 'module',
      exports: {
        './hooks': './src/presentation/hooks/index.ts',
        './pages': './src/presentation/pages/index.ts',
        './components': './src/presentation/components/index.ts',
        './routes': './src/presentation/routes/index.ts',
      },
      scripts: {
        typecheck: 'tsc --noEmit',
      },
      dependencies: {
        '@genmedical/core': 'workspace:*',
        '@genmedical/api-client': 'workspace:*',
      },
      peerDependencies: {
        react: '^19.2.4',
        'react-dom': '^19.2.4',
        'react-router-dom': '^7.13.1',
      },
      devDependencies: {
        '@types/react': '^19.2.14',
        '@types/react-dom': '^19.2.3',
        typescript: '^5.9.3',
      },
    },
    null,
    2
  )
);

// Buat tsconfig.json
writeFileSync(
  join(base, 'tsconfig.json'),
  JSON.stringify(
    {
      extends: '../../tsconfig.base.json',
      compilerOptions: {
        jsx: 'react-jsx',
        noEmit: true,
      },
      include: ['src/**/*.ts', 'src/**/*.tsx'],
    },
    null,
    2
  )
);

// Buat index.ts di setiap folder presentation
const indexes = [
  // core
  'src/core/models/index.ts',
  'src/core/repositories/index.ts',
  'src/core/use-cases/index.ts',
  'src/core/commands/index.ts',
  'src/core/queries/index.ts',
  // infrastructure
  'src/infrastructure/mappers/index.ts',
  'src/infrastructure/repositories/index.ts',
  'src/infrastructure/providers/index.ts',
  'src/infrastructure/commands/index.ts',
  'src/infrastructure/queries/index.ts',
  // presentation
  'src/presentation/hooks/index.ts',
  'src/presentation/pages/index.ts',
  'src/presentation/components/index.ts',
  'src/presentation/routes/index.ts',
];

indexes.forEach((f) => writeFileSync(join(base, f), '// export di sini\n'));

console.log(`✅ Modul @genmedical/${name} berhasil dibuat!`);

// Install hanya untuk modul yang baru dibuat
console.log(`📦 Installing dependencies untuk @genmedical/${name}...`);
execSync(`pnpm install --filter @genmedical/${name}`, { stdio: 'inherit' });

console.log(`\n🚀 Selesai! Modul @genmedical/${name} siap digunakan.`);
console.log(`👉 Lokasi: modules/${name}`);
