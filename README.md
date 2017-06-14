
## 引言
  该技术规范文档是根据笔者多年的前端实践经验和对相关技术的最佳实践总结的，如有失偏颇，还请读者指出和修正，或者提供更好的规范作为代替。                                       
<div style="text-align:right;">刘其深</div>
<div style="text-align:right;">2017-06-04</div>
                                          
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
  * [Classnames](#classnames)
* [CSS 语言](#css-语言)
  * [SUITM命名法](#suit命名法)
  * [样式预处理器](#样式预处理器)
  * [布局方案](#布局方案)
  * [尺寸单位](#尺寸单位)
* [图片资源](#图片资源)
* [React/JSX](#react/jsx)
* [项目技术方案选型](#项目技术方案选型)

## JavaScript 语言

当今无疑时`ES6`的时代了。为了利用`ES6`给生产所带来的便利，我们得开始统一使用`ES6`的语法来编写代码。ES6的主流的语法包括一下几点：

### 变量声明

#### const 和 let

不要用 `var`，而是用 `const` 和 `let`，分别表示常量和变量。不同于 `var` 的函数作用域，`const` 和 `let` 都是块级作用域。

```javascript
const DELAY = 1000;

let count = 0;
count = count + 1;
```

### 模板字符串

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

### 默认参数

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
import React from 'react';

// 引入部分
import React, { Component, PropTypes } from 'react;
import { Link, Route } from 'react-router';

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

### 对象字面量改进

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

### Spread Operator

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

我们拿淘宝的前端团队的dva框架来举例说明一下。dva 的 effects 是通过 generator 组织的。Generator 返回的是迭代器，通过 `yield` 关键字实现暂停功能。

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

### Classnames

在React组件中，使用react官方推荐的classname模块来处理css类的条件式的合并。全局方法classnames接受的参数类型包括字符串，纯javascript对象，数组。

详见[github](https://github.com/JedWatson/classnames)。

## CSS语言

### SUIT命名法

SUIT命名法是著名的BEM命名法的一个变种或者说是改进。SUIT命名法包括六个概念，分别是`结构`（Utilities）,`组件`（Componnet），`修饰器`（Modifier），`后代/子组件`（Descendants）和`状态`（states）。

Component后面又可以追加修饰器，后台/子组件和状态。

SUIT使用 Pascal命名法（别名叫做大驼峰命名法） 、 驼峰命名法 和破折号。在BEM中，约定命名使用到的破折号和下划线的数量，常常给人带来困惑。例如，在BEM中的命名方式 .search-form__text-field 和SUIT的命名方式 .SearchForm-textField 。

#### Utilities

Utilities是用来处理结构和位置方面的样式，组件中也可以用这种方式来写。常常在驼峰命名前加一个 u- 前缀。例如 .u-clearFix 。

#### Components

SUIT中的Components就相当于BEM中的Block。组件的命名方式常常使用pascal命名，也更适合SUIT，使它们更容易识别。例如 .SearcForm 。

#### 组件命名空间

组件可以在命名前加一个 nmsp- 这样的命名空间，用来防止类名的冲突。比如 .mine-SearchForm 。

#### Descendants

SUIT中的Descendants相当于BEM中的Element。它使用破折号 - 和驼峰命名结合在一起来。例如 .SearchForm-heading ， .SearchForm-textField 和 .SearchForm-submitButto 。


#### Modifier

SUIT中的Modifier和BEM中的一样，但SUIT对他们的角色控制的更为严格。SUIT中的Modifier只用于组件(Components)上，不用于Dedicated上。它也不能用于表示状态(State)变化，就算要用于状态的变化，SUIT也有自己一套专用的命名约定。

Modifier都用两个破折号 -- 来连接。一般用形容词来传达语义。例如： SearchForm--advanced，person--tall 。

#### State

State是用来反映组件更改的状态。通过不同的修饰词，反映出组件修改后的基本外观。如果有必要，State也可以应用于Descendent中。

State一般都在驼峰命名前添加 is- 前缀。一般用is+形容词来传达语义。如： .SearchForm.is-invalid 。

注：这段落的知识收集和整理来自于[这个网址](http://www.tuicool.com/articles/aayEF3)。

### 样式预处理器

样式预处理器采用`sass`。`sass`有四大特性：`变量`,`mixin`,`extend`,`function`和模块导入`@import`。每一个项目对sass的应用一般情况下应该包含一下几个方面：

 - 变量。前端开发者工程师每接手一个新项目的时候，都应该站在样式的全局UI规范和组件化设计去引导UI设计师进行UI设计。然后，我们基于UI设计师的全局UI规范去定义一份全局样式的变量文件_variables.scss，通过此文件，我们对全局的样式进行集中式的管理。

 - mixin。样式的工具类都定义在_mixins.scss文件中。例如对行内元素排版的工具类`.text-＊`,清除浮动的`.clearfix`，图片的自适应类`.responsive-img`，在移动端渲染0.5px的线条的`.point5pxLine`等等都可以放在此文件中，以便做到开开发中开箱即用，同时也能方便地跨项目共享，大大提高了样式开发的生产效率。



### 布局方案

使用`flexbox`布局为主，传统的布局为辅的布局方案。`W3C`宣称，`flexbox`能够在99%的程度上代替上一代布局方案，所以，我们只有在确实无法利用flexbox完成的场景才去降级到传统的布局方案。

### 尺寸单位

为了实现对各种尺寸的屏幕和各种默认字体大小的浏览器的响应，提高用户体验，一律采用`rem`作为尺寸的单位。

## 图片资源

对于UI设计师所产生的小于2500B的图片一律实现为字体图标。




# React/JSX 编码规范

## 基本规范

- 每个文件只包含的一个 React 组件：
    - 联系紧密的组件可以使用「命名空间」的形式；
    - 每个文件中可包含多个纯函数组件。
- 始终使用 JSX 语法，不要使用 `React.createElement` 创建 ReactElement，以提高编写速度、可读性、可维护性（没有 JSX 转换的特殊场景例外，如在 `console` 中测试组件）。

## 组件创建方式

React 中可以通过三种方式创建组件：ES6 `class`、[`createReactClass`](https://facebook.github.io/react/docs/react-without-es6.html)、[函数式组件](https://facebook.github.io/react/docs/components-and-props.html#functional-and-class-components) (在React的15.5.0版本中，使用React.createClass方式已经建议废弃了)。
- 如果组件有内部状态，或者使用了生命周期方法，优先使用 `class extends React.Component` ：

    ```js
    // bad
    var createReactClass = require('create-react-class');
    var Greeting = createReactClass({
      /// ...
      render() {
        return <h1>Hello, {this.props.name}</h1>;
      }
    });
    
    // good
    class Greeting extends React.Component {
      // ...
      render() {
        return <h1>Hello, {this.props.name}</h1>;
      }
    }
    ```

    如果组件内部未使用状态或生命周期方法，优先使用普通函数（非箭头函数）创建组件：

    ```js
    // bad
    class Listing extends React.Component {
      render() {
        return <div>{this.props.hello}</div>;
      }
    }

    // bad (relying on function name inference is discouraged)
    const Listing = ({ hello }) => (
      <div>{hello}</div>
    );

    // good
    function Listing({ hello }) {
      return <div>{hello}</div>;
    }
    ```

参考链接：

- [React.createClass versus extends React.Component](https://toddmotto.com/react-create-class-versus-component/)


## Mixins

- [不要使用 mixins](https://facebook.github.io/react/blog/2016/07/13/mixins-considered-harmful.html)；
- 使用 ES6 class 语法的 React 组件不支持 mixins（参考[高阶组件](https://facebook.github.io/react/docs/higher-order-components.html)）。
- 


>   为什么呢？因为Mixins模糊了依赖的来处，引起命名冲突和滚雪球式地增加了代码的复杂性。在大部分场景，Mixins可以由组件，高阶组件和共用模块来代替。


## 命名规范

- **扩展名**：使用 `.jsx` 作为 React 组件的扩展名；
- **文件名**：使用**大驼峰命名法（PascalCase）**，如 `MyComponent.jsx`；
- **组件命名**：组件名称和文件名一致，如 `MyComponent.jsx` 里的组件名应该是 `MyComponent`；一个目录的根组件使用 `index.jsx` 命名，以目录名称作为组件名称；

    ```js
    // Use the filename as the component name
	
    // file contents
    class CheckBox extends React.Component {
      // ...
    }

    export default CheckBox;

    // in some other file
    // bad
    import CheckBox from './checkBox';

    // bad
    import CheckBox from './check_box';

    // good
    import CheckBox from './CheckBox';
    
    
    // for root components of a directory,
    // use index.jsx as the filename and use the directory name as the component name
      
    // bad
    import Footer from './Footer/Footer.jsx';
        
    // bad
    import Footer from './Footer/index.jsx';
        
    // good
    import Footer from './Footer';
    ```
- **引用命名**：React 组件使用**大驼峰命名法（PascalCase）**，组件实例使用**小驼峰命名法（camelCase）**；

    ```js
        // bad
    import reservationCard from './ReservationCard';
    
    // good
    import ReservationCard from './ReservationCard';
    
    // bad
    const ReservationItem = <ReservationCard />;
    
    // good
    const reservationItem = <ReservationCard />;
    
    // HTML tag
    const myDivElement = <div className="foo" />;
    ReactDOM.render(myDivElement, mountNode);
    ```
	
- **高阶组件命名**: `withFoo(Bar)`.高阶组件的名称（displayName属性）应该跟被组合的组件的名称关联起来。例如：有一个高阶组件`withFoo()`,当它要跟一个组件`Bar`组价关联起来的话，那么这个高阶组件所返回的组件的displayName属性的值应该为`withFoo(Bar)`。

    > 为什么？因为一个组件的display值很有可能用于开发者工具或者控制台打印的错误消息中。这对于开发者了解所发生的事情大有裨益。

    ```js
    // bad
    export default function withFoo(WrappedComponent) {
      return function WithFoo(props) {
        return <WrappedComponent {...props} foo />;
      }
    }

    // good
    export default function withFoo(WrappedComponent) {
      function WithFoo(props) {
        return <WrappedComponent {...props} foo />;
      }

      const wrappedComponentName = WrappedComponent.displayName
        || WrappedComponent.name
        || 'Component';

      WithFoo.displayName = `withFoo(${wrappedComponentName})`;
      return WithFoo;
    }
    ```

### 带命名空间的组件

- 如果一个组件有许多关联子组件，可以以该组件作为命名空间编写、调用子组件。

    ```js
    class Form extends React.Component {  
      // ...
    }
 
    class Row extends React.Component {}
    class Label extends React.Component {}
    class Input extends React.Component {}

    Form.Row = Row;
    Form.Label = Label;
    Form.Input = Input;
    
    export default Form;
    
    // refence Form component
    import Form from './Form';

    const App = (
      <Form>
        <Form.Row>
          <Form.Label />
          <Form.Input />
        </Form.Row>
      </Form>
    );
    ```

## 组件声明

- 不要使用 `displayName` 来命名组件，通过引用来命名。

	```js
	// bad
	export default React.createClass({
	  displayName: 'ReservationCard',
	  // stuff goes here
	});

	// good
  class ReservationCard extends React.Component {
  }

	export default ReservationCard;
	```
	
## 属性

### 属性命名

- React 组件的属性使用**小驼峰命名法**；
- 使用 `className` 代替 `class` 属性；
- 使用 `htmlFor` 代替 `for` 属性；
- 不要把 DOM 组件的属性用作其他用途。


    ```js
    // bad
    <MyComponent style="fancy" />

    // good
    <MyComponent variant="fancy" />
    ```

**传递给 HTML 的属性：**

- 传递给 HTML 元素的自定义属性，需要添加 `data-` 前缀，React 不会渲染非标准属性；
- [无障碍](http://www.w3.org/WAI/intro/aria)属性 `aria-` 可以正常使用。

### 属性设置

- 在组件行内设置属性（以便 `propTypes` 校验），不要在外部改变属性的值；
- 属性较多使用 `{...this.props}` 语法；
    
    ```js
    const component = <Component />;
    component.props.foo = x; // bad
    component.props.bar = y; // also bad
    
    // good
    const component = <Component foo={x} bar={y} />;
    
    // good
    const props = {};
    props.foo = x;
    props.bar = y;
    const component = <Component {...props} />;
    ```
- 属性值明确为 `true` 时，省略值。

    ```js
    // bad
    <Foo
      hidden={true}
    />

    // good
    <Foo
      hidden
    />
    ```

### 属性对齐方式

- 属性较少时可以行内排列；
- 属性较多时每行一个属性，闭合标签单独成行。

```js
// bad - too long
<input type="text" value={this.state.newDinosaurName} onChange={this.inputHandler.bind(this, 'newDinosaurName')} />  

// bad - aligning attributes after the tag
<input type="text"  
       value={this.state.newDinosaurName}
       onChange={this.inputHandler.bind(this, 'newDinosaurName')} /> 

// good
<input  
  type="text"
  value={this.state.newDinosaurName}
  onChange={this.inputHandler.bind(this, 'newDinosaurName')}
 />
 
 // if props fit in one line then keep it on the same line
<Foo bar="bar" />

// children get indented normally
<Foo
  superLongParam="bar"
  anotherSuperLongParam="baz"
>
  <Spazz />
</Foo>


// bad
<Foo
  bar="bar"
  baz="baz" />

// good
<Foo
  bar="bar"
  baz="baz"
/>
```

### 属性空格

- 属性 `=` 前后不要添加空格；
- JSX 中的花括号前后不要添加空格。

```js
// bad
<Foo bar={ baz } foo = "bar" />

// good
<Foo bar={baz} foo="bar" />

// good { left: '20px' } 为一个对象
<Foo style={{ left: '20px' }} />
```

### key

- 避免使用数组的索引作为 `key` 值，优先使用唯一 ID 作为 key 值。 （[参考文章](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318)）

```js
// bad
{todos.map((todo, index) =>
  <Todo
    {...todo}
    key={index}
  />
)}

// good
{todos.map(todo => (
  <Todo
    {...todo}
    key={todo.id}
  />
))}
```

同时满足以下条件时可以使用数组索引作为 `key` 值：

- 数组是静态的：不经过计算，也不会改变；
- 数组项没有 id；
- 数组不做排序或者过滤操作。

### `propTypes` 及默认值

- 组件属性都应该在 `propTypes` 中声明类型；
- 始终明确指定非必选属性的默认值。

> 为什么？`propTypes`作为一个组件的文档表格，是十分的重要的。同时，提供一个默认的defaultProps有助于消除源码阅读者的不必要疑惑。除此之外，它也具有了相当于propTypes的属性类型文档说明的功效。

```js
// bad
function SFC({ foo, bar, children }) {
  return <div>{foo}{bar}{children}</div>;
}

SFC.propTypes = {
  foo: PropTypes.number.isRequired,
  bar: PropTypes.string,
  children: PropTypes.node,
};

// good
function SFC({ foo, bar, children }) {
  return <div>{foo}{bar}{children}</div>;
}

SFC.propTypes = {
  foo: PropTypes.number.isRequired,
  bar: PropTypes.string,
  children: PropTypes.node,
};

SFC.defaultProps = {
  bar: '',
  children: null,
};
```


## 引号

- JSX 属性使用**双引号** `"`；
- JS 使用**单引号** `'`；

```js
// bad
<Foo bar='bar' />

// good
<Foo bar="bar" />

// bad
<Foo style={{ left: "20px" }} />

// good
<Foo style={{ left: '20px' }} />

// JavaScript Expression
const person = <Person name={window.isLoggedIn ? window.name : ''} />;

// HTML/JSX
const myDivElement = <div className="foo" />;
const app = <Nav color="blue" />;

const content = (
  <Container>
    {window.isLoggedIn ? <Nav /> : <Login />}
  </Container>
);
```

## 条件 JSX

- 简短的输出在行内直接三元运算符；

    ```js
    {this.state.show && 'This is Shown'}
    {this.state.on ? 'On' : 'Off'}
    ```
- 较复杂的结构可以在 `.render()` 方法内定义一个以 `Html` 结尾的变量（命名方式仅供参考）；

    ```js
    let dinosaurHtml = '';
    
    if (this.state.showDinosaurs) {  
      dinosaurHtml = (
        <section>
          <DinosaurTable />
          <DinosaurPager />
        </section>
      );
    }
  
    return (  
      <div>
        ...
        {dinosaurHtml}
        ...
      </div>
    );
    ```
- 运算逻辑简单的直接使用行内迭代。

    ```js
    return (
      <div>
        {this.props.data.map((data) => {
          return (<Component data={data} key={data.id} />);
        })}
      </div>
    );
    ```
	
## `()` 使用

- 多行的 JSX 使用 `()` 包裹，有组件嵌套时使用多行模式；

	```js
	// bad
	return (<div><ComponentOne /><ComponentTwo /></div>);
	
	// good
	var multilineJsx = (  
	  <header>
	    <Logo />
	    <Nav />
	  </header>
	);
	
	// good
	return (
    <div>
      <ComponentOne />
      <ComponentTwo />
    </div>
  );
	```
- 单行 JSX 省略 `()`。

	```js
	var singleLineJsx = <h1>Simple JSX</h1>;  
	
	// good, when single line
	render() {
	  const body = <div>hello</div>;
  
	  return <MyComponent>{body}</MyComponent>;
	}
	```
	
## 自闭合标签

- 自闭合所有没有子组件的标签；
- 自闭合标签 **`/` 前留一个空格**。

```js
// bad
<Logo></Logo>
<Logo/>

// very bad
<Foo                 />

// bad
<Foo
 />

// good
<Logo />
```

## Ref

- 始终使用 ref 回调。 eslint: [`react/no-string-refs`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md)

    ```js
    // bad
    <Foo
      ref="myRef"
    />
  
    // good
    <Foo
      ref={(ref) => { this.myRef = ref; }}
    />
    ```

## 方法

  - 使用箭头函数遮蔽本地变量。
  
    ```js
    function ItemList(props) {
      return (
        <ul>
          {props.items.map((item, index) => (
            <Item
              key={item.key}
              onClick={() => doSomethingWith(item.name, index)}
            />
          ))}
        </ul>
      );
    }
    ```

  - 在 `constructor` 中绑定 `this`，而不是引用的时候绑定。eslint: [`react/jsx-no-bind`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)

    > 为什么？因为对bind的每一个执行都会产生一个新函数引用，以至于每一次render的重新调用都会导致bind所在的组件的重新渲染，这很浪费性能。

    ```js
    // bad
    class extends React.Component {
      onClickDiv() {
        // do stuff
      }

      render() {
        return <div onClick={this.onClickDiv.bind(this)} />;
      }
    }

    // good
    class extends React.Component {
      constructor(props) {
        super(props);

        this.onClickDiv = this.onClickDiv.bind(this);
      }

      onClickDiv() {
        // do stuff
      }

      render() {
        return <div onClick={this.onClickDiv} />;
      }
    }
    ```


  - `render` 方法中应该始终返回值。eslint: [`react/require-render-return`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-render-return.md)

    ```js
    // bad
    render() {
      (<div />);
    }

    // good
    render() {
      return (<div />);
    }
    ```
- 事件处理方法以 `handle` 或者 `on` 开头，如 `handleClick() {}`。   
- 慎用 [Class Properties](https://babeljs.io/docs/plugins/transform-class-properties/) 语法（最终规范可能会跟提案有差异）。

    ```js
    class SayHello extends React.Component {
      constructor(props) {
        super(props);
        this.state = {message: 'Hello!'};
      }
      // WARNING: this syntax is experimental!
      // Using an arrow here binds the method:
      handleClick = () => {
        alert(this.state.message);
      }
    
      render() {
        return (
          <button onClick={this.handleClick}>
            Say hello
          </button>
        );
      }
    }
    ```

## 组件代码组织

- 按照生命周期顺序组织组件的属性、方法；
- 方法（属性）之间空一行；
- `render()` 方法始终放在最后；
- 自定义方法 React API 方法之后、`render()` 之前；
- `class extends React.Component` 顺序：

  1. `static` 属性
  1. `static` 方法
  1. `constructor`
  1. `getChildContext`
  1. `componentWillMount`
  1. `componentDidMount`
  1. `componentWillReceiveProps`
  1. `shouldComponentUpdate`
  1. `componentWillUpdate`
  1. `componentDidUpdate`
  1. `componentWillUnmount`
  1. *点击处理函数或者其他事件处理函数*，如 `onClickSubmit()` 或 `onChangeDescription()`
  1. *`render` 的 getter 方法*，如 `getSelectReason()` 或 `getFooterContent()`
  1. *可选的 render 方法*，如 `renderNavigation()` 或 `renderProfilePicture()`
  1. `render`

- 定义 `propTypes`, `defaultProps`, `contextTypes`：

    ```js
    import React from 'react';
    import PropTypes from 'prop-types';

    class Link extends React.Component {
      static methodsAreOk() {
        return true;
      }

      render() {
        return (
          <a href={this.props.url} data-id={this.props.id}>
            {this.props.text}
          </a>
        ); 
      }
    }

    Link.propTypes = {
      id: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired,
      text: PropTypes.string,
    };
  
    Link.defaultProps = {
      text: 'Hello World',
    };

    export default Link;
  
    
    // static
    import React from 'react';
    import PropTypes from 'prop-types';
    
    class Link extends React.Component {
      static propTypes = {
        id: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
        text: PropTypes.string,
      };
    
      static defaultProps = {
        text: 'Hello World',
      };
    
      static methodsAreOk() {
        return true;
      }

      render() {
        return (
          <a href={this.props.url} data-id={this.props.id}>
            {this.props.text}
          </a>
        );
      }
    }

    export default Link;
    ```

- `React.createClass` 顺序：eslint: [`react/sort-comp`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/sort-comp.md)

  1. `displayName`
  1. `propTypes`
  1. `contextTypes`
  1. `childContextTypes`
  1. `mixins`
  1. `statics`
  1. `defaultProps`
  1. `getDefaultProps`
  1. `getInitialState`
  1. `getChildContext`
  1. `componentWillMount`
  1. `componentDidMount`
  1. `componentWillReceiveProps`
  1. `shouldComponentUpdate`
  1. `componentWillUpdate`
  1. `componentDidUpdate`
  1. `componentWillUnmount`
  1. *点击处理函数或者其他事件处理函数*，如 `onClickSubmit()` 或 `onChangeDescription()`
  1. *`render` 的 getter 方法*，如 `getSelectReason()` 或 `getFooterContent()`
  1. *可选的 render 方法*，如 `renderNavigation()` 或 `renderProfilePicture()`
  1. `render`

## 注释

- 组件之间的注释需要用 `{}` 包裹。

    ```js
    var content = (
      <Nav>
        {/* child comment, put {} around */}
        <Person
          /* multi
             line
             comment */
          name={window.isLoggedIn ? window.name : ''} // end of line comment
        />
      </Nav>
    );
    ```
    
    

# 前端技术方案选型

  - 对于中小型规模的项目采用react + react-router + mobx。
  - 对于大型规模的项目采用react + react-router + redux。











