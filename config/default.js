module.exports = {
  app: {
    router: `${__dirname}/../src/routers/web`,
    staticFolder: `${__dirname}/../src/public/`,
    staticImages: `${__dirname}/../template/images`,
    viewsFolder: `${__dirname}/../src/apps/views`,
    viewEngine: "ejs",
    tmpUploadPath: `${__dirname}/../src/tmp`
  },
};
