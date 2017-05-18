
这是重构所用到的知识的集合。

## 目录

* [JavaScript 语言](#javascript-语言)
  * [变量声明](#变量声明)
    * [const 和 let](#const-和-let)
    * [模板字符串](#模板字符串)
    * [默认参数](#默认参数)
  * [箭头函数](#箭头函数)
  * [模块的 Import 和 Export](#模块的-import-和-export)
  * [ES6 对象和数组](#es6-对象和数组)
    * [析构赋值](#析构赋值)
    * [对象字面量改进](#对象字面量改进)
    * [Spread Operator](#spread-operator)
  * [Promises](#promises)
  * [Generators](#generators)
* [CSS 语言](#CSS-语言)
  * [SUITM命名法](#SUITM命名法)

## JavaScript 语言

### 变量声明

#### const 和 let

不要用 `var`，而是用 `const` 和 `let`，分别表示常量和变量。不同于 `var` 的函数作用域，`const` 和 `let` 都是块级作用域。

```javascript
const DELAY = 1000;

let count = 0;
count = count + 1;
```

#### 模板字符串

模板字符串提供了另一种做字符串组合的方法。

```javascript
const user = 'world';
console.log(`hello ${user}`);  // hello world

// 多行
const content = `
  Hello ${firstName},
  Thanks for ordering ${qty} tickets to ${event}.
`;
```

#### 默认参数

```javascript
function logActivity(activity = 'skiing') {
  console.log(activity);
}

logActivity();  // skiing
```

### 箭头函数

函数的快捷写法，不需要通过 `function` 关键字创建函数，并且还可以省略 `return` 关键字。

同时，箭头函数还会继承当前上下文的 `this` 关键字。

比如：

```javascript
[1, 2, 3].map(x => x + 1);  // [2, 3, 4]
```

等同于：

```javascript
[1, 2, 3].map((function(x) {
  return x + 1;
}).bind(this));
```

### 模块的 Import 和 Export

`import` 用于引入模块，`export` 用于导出模块。

比如：

```javascript
// 引入全部
import dva from 'dva';

// 引入部分
import { connect } from 'dva';
import { Link, Route } from 'dva/router';

// 引入全部并作为 github 对象
import * as github from './services/github';

// 导出默认
export default App;
// 部分导出，需 import { App } from './file'; 引入
export class App extend Component {};
```

### ES6 对象和数组

#### 析构赋值

析构赋值让我们从 Object 或 Array 里取部分数据存为变量。

```javascript
// 对象
const user = { name: 'guanguan', age: 2 };
const { name, age } = user;
console.log(`${name} : ${age}`);  // guanguan : 2

// 数组
const arr = [1, 2];
const [foo, bar] = arr;
console.log(foo);  // 1
```

我们也可以析构传入的函数参数。

```javascript
const add = (state, { payload }) => {
  return state.concat(payload);
};
```

析构时还可以配 alias，让代码更具有语义。

```javascript
const add = (state, { payload: todo }) => {
  return state.concat(todo);
};
```

#### 对象字面量改进

这是析构的反向操作，用于重新组织一个 Object 。

```javascript
const name = 'duoduo';
const age = 8;

const user = { name, age };  // { name: 'duoduo', age: 8 }
```

定义对象方法时，还可以省去 `function` 关键字。

```javascript
app.model({
  reducers: {
    add() {}  // 等同于 add: function() {}
  },
  effects: {
    *addRemote() {}  // 等同于 addRemote: function*() {}
  },
});
```

#### Spread Operator

Spread Operator 即 3 个点 `...`，有几种不同的使用方法。

可用于组装数组。

```javascript
const todos = ['Learn dva'];
[...todos, 'Learn antd'];  // ['Learn dva', 'Learn antd']
```

也可用于获取数组的部分项。

```javascript
const arr = ['a', 'b', 'c'];
const [first, ...rest] = arr;
rest;  // ['b', 'c']

// With ignore
const [first, , ...rest] = arr;
rest;  // ['c']
```

还可收集函数参数为数组。

```javascript
function directions(first, ...rest) {
  console.log(rest);
}
directions('a', 'b', 'c');  // ['b', 'c'];
```

代替 apply。

```javascript
function foo(x, y, z) {}
const args = [1,2,3];

// 下面两句效果相同
foo.apply(null, args);
foo(...args);
```

对于 Object 而言，用于组合成新的 Object 。(ES2017 stage-2 proposal)

```javascript
const foo = {
  a: 1,
  b: 2,
};
const bar = {
  b: 3,
  c: 2,
};
const d = 4;

const ret = { ...foo, ...bar, d };  // { a:1, b:3, c:2, d:4 }
```

此外，在 JSX 中 Spread Operator 还可用于扩展 props，详见 [Spread Attributes](#spread-attributes)。

### Promises

Promise 用于更优雅地处理异步请求。比如发起异步请求：

```javascript
fetch('/api/todos')
  .then(res => res.json())
  .then(data => ({ data }))
  .catch(err => ({ err }));
```

定义 Promise 。

```javascript
const delay = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

delay(1000).then(_ => {
  console.log('executed');
});
```

### Generators

dva 的 effects 是通过 generator 组织的。Generator 返回的是迭代器，通过 `yield` 关键字实现暂停功能。

这是一个典型的 dva effect，通过 `yield` 把异步逻辑通过同步的方式组织起来。

```javascript
app.model({
  namespace: 'todos',
  effects: {
    *addRemote({ payload: todo }, { put, call }) {
      yield call(addTodo, todo);
      yield put({ type: 'add', payload: todo });
    },
  },
});
```

## CSS语言

#### SUIT命名法

SUIT命名法是著名的BEM命名法的一个变种或者说是改进。SUIT命名法包括六个概念，分别是结构（Utilities）,组件（Componnet），修饰器（Modifier），后代/子组件（Descendants）和状态（states）。

Component后面又可以追加修饰器，后台/子组件和状态。

SUIT使用 Pascal命名法（别名叫做大驼峰命名法） 、 驼峰命名法 和破折号。在BEM中，约定命名使用到的破折号和下划线的数量，常常给人带来困惑。例如，在BEM中的命名方式 .search-form__text-field 和SUIT的命名方式 .SearchForm-textField 。

##### Utilities

Utilities是用来处理结构和位置方面的样式，组件中也可以用这种方式来写。常常在驼峰命名前加一个 u- 前缀。例如 .u-clearFix 。

##### Components

SUIT中的Components就相当于BEM中的Block。组件的命名方式常常使用pascal命名，也更适合SUIT，使它们更容易识别。例如 .SearcForm 。

##### 组件命名空间

组件可以在命名前加一个 nmsp- 这样的命名空间，用来防止类名的冲突。比如 .mine-SearchForm 。

##### Descendants

SUIT中的Descendants相当于BEM中的Element。它使用破折号 - 和驼峰命名结合在一起来。例如 .SearchForm-heading ， .SearchForm-textField 和 .SearchForm-submitButto 。


##### Modifier

SUIT中的Modifier和BEM中的一样，但SUIT对他们的角色控制的更为严格。SUIT中的Modifier只用于组件(Components)上，不用于Dedicated上。它也不能用于表示状态(State)变化，就算要用于状态的变化，SUIT也有自己一套专用的命名约定。

Modifier都用两个破折号 -- 来连接。一般用形容词来传达语义。例如： SearchForm--advanced，person--tall 。

##### State

State是用来反映组件更改的状态。通过不同的修饰词，反映出组件修改后的基本外观。如果有必要，State也可以应用于Descendent中。

State一般都在驼峰命名前添加 is- 前缀。一般用is+形容词来传达语义。如： .SearchForm.is-invalid 。

注：这段落的知识收集和整理来自于[这个网址](http://www.tuicool.com/articles/aayEF3)。



