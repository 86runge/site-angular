# angular相关问题

### 1.  请解释Angular 2应用程序的生命周期hooks是什么？
```
Angular 2组件/指令具有生命周期事件，是由@angular/core管理的。@angular/core会创建组件，渲染它，创建并呈现它的后代。当@angular/core的数据绑定属性更改时，处理就会更改，在从DOM中删除其模板之前，就会销毁掉它。Angular提供了一组生命周期hooks（特殊事件），可以被分接到生命周期中，并在需要时执行操作。构造函数会在所有生命周期事件之前执行。每个接口都有一个前缀为ng的hook方法。例如，ngOnint界面的OnInit方法，这个方法必须在组件中实现。 

一部分事件适用于组件/指令，而少数事件只适用于组件。

ngOnChanges：当Angular设置其接收当前和上一个对象值的数据绑定属性时响应。
ngOnInit：在第一个ngOnChange触发器之后，初始化组件/指令。这是最常用的方法，用于从后端服务检索模板的数据。
ngDoCheck：检测并在Angular上下文发生变化时执行。每次更改检测运行时，会被调用。
ngOnDestroy：在Angular销毁指令/组件之前清除。取消订阅可观察的对象并脱离事件处理程序，以避免内存泄漏。
组件特定hooks：

ngAfterContentInit：组件内容已初始化完成
ngAfterContentChecked：在Angular检查投影到其视图中的绑定的外部内容之后。
ngAfterViewInit：Angular创建组件的视图后。
ngAfterViewChecked：在Angular检查组件视图的绑定之后。
```

### 2.  使用Angular 2，和使用Angular 1相比，有什么优势？
```
1. Angular 2是一个平台，不仅是一种语言
2. 更好的速度和性能
3. 更简单的依赖注入
4. 模块化，跨平台
5. 具备ES6和Typescript的好处。
6. 灵活的路由，具备延迟加载功能
7. 更容易学习
```

### 3.  Angular 2中的路由工作原理是什么？
```
路由是能够让用户在视图/组件之间导航的机制。Angular 2简化了路由，并提供了在模块级（延迟加载）下配置和定义的灵活性。 

Angular应用程序具有路由器服务的单个实例，并且每当URL改变时，相应的路由就与路由配置数组进行匹配。在成功匹配时，它会应用重定向，此时路由器会构建ActivatedRoute对象的树，同时包含路由器的当前状态。在重定向之前，路由器将通过运行保护（CanActivate）来检查是否允许新的状态。Route Guard只是路由器运行来检查路由授权的接口方法。保护运行后，它将解析路由数据并通过将所需的组件实例化到<router-outlet> </ router-outlet>中来激活路由器状态。

```

### 4.  什么是事件发射器？它是如何在Angular 2中工作的？
```
Angular 2不具有双向digest cycle，这是与Angular 1不同的。在Angular2中，组件中发生的任何改变总是从当前组件传播到其所有子组件中。如果一个子组件的更改需要反映到其父组件的层次结构中，我们可以通过使用事件发射器api来发出事件。

简而言之，EventEmitter是在@ angular/core模块中定义的类，由组件和指令使用，用来发出自定义事件。

@output() somethingChanged = new EventEmitter();
我们使用somethingChanged.emit（value）方法来发出事件。这通常用在setter中，当类中的值被更改完成时。

可以通过模块的任何一个组件，使用订阅方法来实现事件发射的订阅。

myObj.somethingChanged.subscribe(val) => this.myLocalMethod(val));
```

### 5.  如何在Angular 2应用程序中使用codelyzer？
```
所有企业应用程序都会遵循一组编码惯例和准则，以更好的方式维护代码。Codelyzer是一个开源工具，用于运行和检查是否遵循了预定义的编码准则。Codelyzer仅对Angular和TypeScript项目进行静态代码分析。

Codelyzer运行在tslint的顶部，其编码约定通常在tslint.json文件中定义。Codelyzer可以直接通过Angularcli或npm运行。像Visual Studio Code和Atom这样的编辑器也支持codelyzer，只需要通过做一个基本的设置就能实现。

要在Visual Studio代码中设置codelyzer，我们可以在文件 - >选项 - >用户设置中添加tslint规则的路径。

{

    "tslint.rulesDirectory": "./node_modules/codelyzer",

    "typescript.tsdk": "node_modules/typescript/lib"

}
从cli中运行的代码：ng lint

从npm中运行的代码： npm run lint
```

### 6.  什么是延迟加载？如何在Angular 2中启用延迟加载？
```
大多数企业应用程序包含用各式各样的用于特定业务案例的模块。捆绑整个应用程序代码并完成加载，会在初始调用时，产生巨大的性能开销。延迟加载使我们只加载用户正在交互的模块，而其余的模块会在运行时按需加载。

延迟加载通过将代码拆分成多个包并以按需加载的方式，来加速应用程序初始加载过程。

每个Angular应用程序必须有一个叫AppModule的主模块。代码应该根据应用程序业务案例分为不同的子模块（NgModule）。

启用延迟加载的Plunkr示例： 

1. 我们不需要在根模块中导入或声明延迟加载模块。
2. 将路由添加到顶层路由（app.routing.ts）并设置loadChildren。loadChildren会从根文件夹中获取绝对路径。RouterModule.forRoot（）会获取routes数组并配置路由器。
3. 在子模块中导入模块特定路由。
4. 在子模块路由中，将路径指定为空字符串''，也就是空路径。RouterModule.forChild会再次采用路由数组为子模块组件加载并配置路由器。
5. 然后，导出const路由：ModuleWithProviders = RouterModule.forChild（routes）;
```

### 7.  在Angular 2应用中，我们应该注意哪些安全威胁？
```
就像任何其他客户端或Web应用程序一样，Angular 2应用程序也应该遵循一些基本准则来减轻安全风险。其中一些是：

1. 避免为你的组件使用/注入动态HTML内容。
2. 如果使用外部HTML，也就是来自数据库或应用程序之外的地方，那么就需要清理它。
3. 不要将外部网址放在应用程序中，除非它是受信任的。避免网址重定向，除非它是可信的。
4. 考虑使用AOT编译或离线编译。
5. 通过限制api，选择使用已知或安全环境/浏览器的app来防止XSRF攻击。
```

### 8.  如何优化Angular 2应用程序来获得更好的性能？
```
优化取决于应用程序的类型和大小以及许多其他因素。但一般来说，在优化Angular 2应用程序时，我会考虑以下几点：

1. 考虑AOT编译。
2. 确保应用程序已经经过了捆绑，uglify和tree shaking。
3. 确保应用程序不存在不必要的import语句。
4. 确保应用中已经移除了不使用的第三方库。
5. 所有dependencies 和dev-dependencies都是明确分离的。
6. 如果应用程序较大时，我会考虑延迟加载而不是完全捆绑的应用程序。
```

### 9.  如何实现不出现编辑器警告的自定义类型？
```
在大多数的情况下，第三方库都带有它的.d.ts 文件，用于类型定义。在某些情况下，我们需要通过向现有类型提供一些更多的属性来扩展现有类型，或者如果我们需要定义其它类型以避免TypeScript警告。

如果我们需要扩展外部库的类型定义，一个好的做法是，我们并非对node_modules或现有的typings文件夹进行改动，而是创建一个命名为“自定义类型”的新文件夹，来存储所有的自定义类型。

要定义应用程序（JavaScript / Typescript）对象的类型，我们应该在应用程序相应模块的models文件夹中，定义接口和实体类。

对于这些情况，我们可以通过创建我们自己的".d.ts"文件来实现定义或扩展类型。
```

### 10. 什么是Shadow DOM？它如何帮助Angular 2更好地执行？
```
Shadow DOM是HTML规范的一部分，它允许开发人员封装自己的HTML标记，CSS样式和JavaScript。Shadow DOM以及其它一些技术，使开发人员能够像<audio>标签一样构建自己的一级标签，Web组件和API。总的来说，这些新的标签和API被称为Web组件。Shadow DOM通过提供了更好的关注分离，通过其它的HTML DOM元素实现了更少的样式与脚本的冲突。

因为shadow DOM本质上是静态的，同时也是开发人员无法访问的，所以它是一个很好的候选对象。因为它缓存的DOM将在浏览器中呈现得更快，并提供更好的性能。此外，还可以相对很好地管理shadow DOM，同时检测Angular 2应用的改变，并且可以有效地管理视图的重新绘制。
```

### 11. 什么是AOT编译？它有什么优缺点？
```
AOT编译代表的是Ahead Of Time编译，其中Angular编译器在构建时，会将Angular组件和模板编译为本机JavaScript和HTML。编译好的HTML和JavaScript将会部署到Web服务器，以便浏览器可以节省编译和渲染时间。

优点：

1. 更快的下载：由于应用程序已经编译，许多Angular编译器相关库就不再需要捆绑，应用程序包变得更小，所以该应用程序可以更快地下载。
2. 更少的Http请求数：如果应用程序没有捆绑来支持延迟加载（或任何原因），对于每个关联的HTML和CSS，都会有一个单独的服务器请求。但是预编译的应用程序会将所有模板和样式与组件对齐，因此到服务器的Http请求数量会更少。
3. 更快的渲染：如果应用程序不是AOT编译，那么应用程序完全加载时，编译过程会发生在浏览器中。这需要等待下载所有必需的组件，然后等待编译器花费时间来编译应用程序。使用AOT编译，就能实现优化。
4. 在构建时检测错误：由于预先编译，可以检测到许多编译时错误，能够为应用程序提供更好的稳定性。

缺点：

1. 仅适用于HTML和CSS，其它文件类型需要前面的构建步骤
2. 没有watch模式，必须手动完成（bin / ngc-watch.js）并编译所有文件
3. 需要维护AOT版本的bootstrap文件（使用cli等工具时不需要）
4. 在编译之前，需要清理步骤
```

### 12. Observables和Promises的核心区别是什么？
```
从堆栈溢出就是一个区别： 

当异步操作完成或失败时，Promise会处理一个单个事件。

Observable类似于（在许多语言中的）Stream，当每个事件调用回调函数时，允许传递零个或多个事件。通常Observable比Promise更受欢迎，因为它不但提供了Promise特性，还提供了其它特性。使用Observable可以处理0,1或多个事件。你可以在每种情况下使用相同的API。Observable是可取消的，这相比于Promise也具有优势。如果服务器的HTTP请求结果或其它一些异步操作不再需要，则Observable的订阅者可以取消订阅，而Promise将最终调用成功或失败的回调，即使你不需要通知或其提供的结果。Observable提供像map，forEach，reduce之类的类似于数组的运算符，还有强大的运算符，如retry（）或replay（）等，使用起来是相当方便的。

Promises vs Observables

Promises：
1. 返回单个值
2. 不可取消

Observables：
1. 可以使用多个值
2. 可取消
3. 支持map，filter，reduce和类似的操作符
4. ES 2016提议的功能
5. 使用反应式扩展（RxJS）
6. 根据时间的变化，数组成员可以异步获取
```
