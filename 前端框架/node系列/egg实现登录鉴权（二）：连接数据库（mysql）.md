前一篇实现了基本的生成token和验证token的功能，这其实并没什么用。这一篇主要实现对数据库里的人员进行验证。
## 开发环境

- [node下载地址](http://nodejs.cn/download/)
- [mysql下载地址](https://dev.mysql.com/downloads/mysql/)
```
node  v12.10.0
mysql 
```

## 需求
登录：查询数据库的user表验证该人员是否存在
user表中存在该nickname，生成token返回
user表中不存在该nickname，返回{code:'404',msg:'不存在该人员'}
查询
查询所有user，无需传token
通过id查询指定user，需要传token
状态码
201：成功
404：不存在
400：业务逻辑错误
实现
数据库表没有变，依旧只有一张user表
数据库名称（database）：test，用户名（user）：root，密码（password）：123456
image.png
在egg实现登录鉴权（一）的基础之上继续安装依赖包
npm install --save egg-cors egg-jwt
目录
image.png
config/config.default.js
 

/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1576461360545_5788';

  // add your middleware config here
  config.middleware = [];
  config.jwt = {
    secret: '123456',
  };
  // 安全配置 （https://eggjs.org/zh-cn/core/security.html）
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    // 允许访问接口的白名单
    domainWhiteList: [ 'http://localhost:8080' ],
  };
  // 跨域配置
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'test',
    define: {
      underscored: true,
      freezeTableName: true,
    },
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
 

 

config/plugin.js
 

'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
};
 

 

app/model/user.js
 

'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    nickname: STRING(20),
  }, {
    timestamps: false,
  });
  return User;
};
 
 

app/controller/user.js
 

'use strict';

const Controller = require('egg').Controller;


class UserController extends Controller {
  // 登录
  async login() {
    const { ctx, app } = this;
    const data = ctx.request.body;
    // 判断该用户是否存在
    const isValid = await ctx.service.user.isValidUser('nickname', data.nickname);
    if (isValid) {
      const token = app.jwt.sign({
        nickname: data.nickname,
      }, app.config.jwt.secret);
      ctx.body = token;
    } else {
      ctx.body = { code: 404, msg: '不存在该用户' };
    }
  }
  // 获取所有用户
  async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.getUser();
  }
  // 通过id获取用户
  async show() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.getUser(ctx.params.id);
  }
}

module.exports = UserController;
 

 

app/service/user.js
 

'use strict';

const Service = require('egg').Service;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class UserService extends Service {
  // 查询test数据库user表，验证是否存在该用户
  async isValidUser(key, value) {
    const data = await this.getUser();
    for (const item of data) {
      if (item[key] === value) return true;
    }
    return false;
  }
  // 获取用户，不传id则查询所有
  async getUser(id) {
    const { ctx } = this;
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    if (id) {
      return await ctx.model.User.findByPk(toInt(id));
    }
    return await ctx.model.User.findAll(query);
  }
}
module.exports = UserService;
 

app/router.js
 

'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  router.get('/', controller.home.index);

  router.post('/user/login', controller.user.login);
  // 查询 不做鉴权
  router.get('/user', controller.user.index);
  router.get('/user/:id',jwt, controller.user.show);
};
 

package.json
{
  "name": "jwt",
  "version": "1.0.0",
  "description": "",
  "private": true,
  "egg": {
    "declarations": true
  },
  "dependencies": {
    "egg": "^2.15.1",
    "egg-cors": "^2.2.3",
    "egg-jwt": "^3.1.7",
    "egg-scripts": "^2.11.0",
    "egg-sequelize": "^5.2.0",
    "mysql2": "^2.0.2"
  },
  "devDependencies": {
    "autod": "^3.0.1",
    "autod-egg": "^1.1.0",
    "egg-bin": "^4.11.0",
    "egg-ci": "^1.11.0",
    "egg-mock": "^3.21.0",
    "eslint": "^5.13.0",
    "eslint-config-egg": "^7.1.0"
  },
  "engines": {
    "node": ">=10.0.0"
  },
  "scripts": {
    "start": "egg-scripts start --daemon --title=egg-server-jwt",
    "stop": "egg-scripts stop --title=egg-server-jwt",
    "dev": "egg-bin dev",
    "debug": "egg-bin debug",
    "test": "npm run lint -- --fix && npm run test-local",
    "test-local": "egg-bin test",
    "cov": "egg-bin cov",
    "lint": "eslint .",
    "ci": "npm run lint && npm run cov",
    "autod": "autod"
  },
  "ci": {
    "version": "10"
  },
  "repository": {
    "type": "git",
    "url": ""
  },
  "author": "",
  "license": "MIT"
}
 

自测
登录
　　　image.png

查询所有

查询指定id的人员

 

 

参考
egg+sequelize+mysql实现CRUD
egg实现登录鉴权（一）：生成token  
- ["Can’t be opened because Apple cannot check it for malicious software" 解决方案](https://www.cnblogs.com/wangzhihang/p/12085076.html)