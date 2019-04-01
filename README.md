# 自助下单系统

### 模块

#### 1.User 用户

##### 属性&copy;

- userName 用户名
- password 密码

##### 接口

- [ ] 注册
- [ ] 登陆

#### 2.Shop 店铺

##### 属性&copy;

- name 店铺名
- address 地址
- category 分类
- dishes 菜品
- avatar 店铺头像

##### 接口

- [ ] 创建店铺
- [ ] 获取店铺列表
- [ ] 修改店铺

#### 3.dishes 菜品

##### 属性&copy;

- name 菜品名
- price 价格
- category(belongsTo) 分类
- avatar 菜品头像

##### 接口

- [ ] 创建菜品
- [ ] 获取菜品列表
- [ ] 修改菜品

#### 4.category 分类

##### 属性&copy;

- name 分类名
- dishes(hasMany) 菜品

##### 接口

- [ ] 创建分类
- [ ] 获取分类列表
- [ ] 修改分类
