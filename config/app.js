
module.exports = {
    serverPort: process.env.SERVER_PORT || 9000,
    prefixApiVersion: process.env.PREFIX_API_VERSION || "/api/v1",
    router: `${__dirname}/../src/routers/web`,
    staticFolder: `${__dirname}/../src/public/`,
    staticImages: `${__dirname}/../template/images`,
    viewsFolder: `${__dirname}/../src/apps/views`,
    viewEngine: "ejs",
    tmpUploadPath: `${__dirname}/../src/tmp`,
    sessionKey: "vietpro_session",
    baseImageUrl: `${__dirname}/../src/public/uploads/images`,

    jwtAccessKey: process.env.JWT_ACCESS_KEY || "vietproAccessKey",
    jwtRefreshKey: process.env.JWT_REFRESH_KEY || "vietproRefreshKey"
}