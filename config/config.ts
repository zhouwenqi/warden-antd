import {defineConfig} from 'umi';
import routes from './routes';
export default defineConfig({
  plugins: [
    '@umijs/plugins/dist/initial-state',
    '@umijs/plugins/dist/model',
  ],
  npmClient: 'yarn',
  mfsu:false,
  initialState:{},
  model:{},
  theme: {
    'root-entry-name': 'variable',
    'border-radius-base': '4px',
    'btn-shadow': 'none',
    'btn-primary-shadow': 'none',
    'btn-text-shadow': 'none',
  },
  routes:routes
})