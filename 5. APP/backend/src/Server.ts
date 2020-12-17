import "@tsed/platform-express"; // /!\ keep this import
import bodyParser from "body-parser";
import compress from "compression";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import cors from "cors";
import "@tsed/ajv";
import "@tsed/swagger";
import "@tsed/passport";
import {Configuration, Inject} from "@tsed/di";
import {PlatformApplication} from "@tsed/common";

export const rootDir = __dirname;

@Configuration({
  rootDir,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8083,
  httpsPort: false, // CHANGE
  mount: {
    "/api": [
      `${rootDir}/controllers/**/*.ts`
    ]
  },
  componentsScan: [
    `${rootDir}/protocols/*{.ts,.js}` // scan protocols directory
  ],
  passport: {},
  swagger: [
    {
      path: "/docs",
      specVersion: "3.0.1"
    }
  ],
  statics: {
    "/statics": [
      {
        root: `${rootDir}/public`,
      }
    ]
  },
  multer: {
    dest: `${rootDir}/storage`
  },
  exclude: [
    "**/*.spec.ts"
  ]
})
export class Server {
  @Inject()
  app: PlatformApplication;

  @Configuration()
  settings: Configuration;

  $beforeRoutesInit(): void {
    this.app
      .use(cors())
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }));
  }
}
