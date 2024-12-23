const path = require('path');
module.exports = {
  webpack: {
    alias: {
      '@api': path.resolve(__dirname, 'src/app/api'),
      '@cards': path.resolve(__dirname, 'src/app/cards'),
      '@components': path.resolve(__dirname, 'src/app/components'),
      '@dialogs': path.resolve(__dirname, 'src/app/dialogs'),
      '@global': path.resolve(__dirname, 'src/app/global'),
      '@guards': path.resolve(__dirname, 'src/app/guards'),
      '@helper': path.resolve(__dirname, 'src/app/helper'),
      '@hooks': path.resolve(__dirname, 'src/app/hooks'),
      '@model': path.resolve(__dirname, 'src/app/model'),
      '@navigation': path.resolve(__dirname, 'src/app/navigation'),
      '@providers': path.resolve(__dirname, 'src/app/providers'),
      '@redux': path.resolve(__dirname, 'src/app/redux'),
      '@screens': path.resolve(__dirname, 'src/app/screens'),
    },
  },
};
