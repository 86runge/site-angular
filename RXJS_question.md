#RXJS

##rxjs简介

    RxJS中的流以Observable对象呈现，获取数据需要订阅Observable，形式如下：
    
    const ob = http$.getSomeList(); //getSomeList()返回某个由`Observable`包装后的http请求
    ob.subscribe((data) => console.log(data));
    //在变量末尾加$表示Observable类型的对象。
    以上与Promise类似：
    
    const promise = http.getSomeList(); // 返回由`Promise`包装的http请求
    promise.then((data) => console.log(data));
    实际上Observable可以认为是加强版的Promise，它们之间是可以通过RxJS的API互相转换的：
    
    const ob = Observable.fromPromise(somePromise); // Promise转为Observable
    const promise = someObservable.toPromise(); // Observable转为Promise
    因此可以在Promise方案的项目中安全使用RxJS，并能够随时升级到完整的RxJS方案。

##rxjs操作符

###Marble diagrams
    图片描述
    
    ![avatar](./src/assets/img/marbe.png)
    
    我们把描绘 Observable 的图称为 Marble diagrams，我们用 - 来表示一小段时间，这些 - 串起来就表示一个 Observable 对象。
    
    ----------------
    X 表示有错误发生
    
    ---------------X
    | 表示 Observable 结束
    
    ----------------|
    在时间序列中，我们可能会持续发出值，如果值是数字则直接用阿拉伯数字表示，其它数据类型使用相近的英文符号表示，接下来我们看一下 interval 操作符对应的 marble 图：
    
    var source = Rx.Observable.interval(1000);
    source 对应的 marble 图：
    
    -----0-----1-----2-----3--...
    当 observable 同步发送值时，如使用 of 操作符创建如下 Observable 对象：
    
    var source = Rx.Observable.of(1,2,3,4);
    source 对应的 marble 图：
    
    (1234)|
    小括号表示同步发生。
    
    另外 marble 图也能够表示 operator 的前后转换关系，例如：
    
    var source = Rx.Observable.interval(1000);
    var newest = source.map(x => x + 1); 
    对应的 marble 图如下：
    
    source: -----0-----1-----2-----3--...
                map(x => x + 1)
    newest: -----1-----2-----3-----4--...
    通过 marble 图，可以帮助我们更好地理解 operator。
    
    详细的信息可以参考 - RxMarbles
    
###    Creation Operators
###    repeat
    repeat 操作符签名：
    
    public repeat(count: number): Observable
    repeat 操作符作用：
    
    重复 count 次，源 Observable 发出的值。
    
    repeat 操作符示例：
    
    var source = Rx.Observable.from(['a','b','c'])
                   .zip(Rx.Observable.interval(500), (x,y) => x);
    
    var example = source.repeat(2);
    
    example.subscribe({
        next: (value) => { console.log(value); },
        error: (err) => { console.log('Error: ' + err); },
        complete: () => { console.log('complete'); }
    });
    示例 marble 图：
    
    source : ----a----b----c|
                repeat(2)
    example: ----a----b----c----a----b----c|
    以上代码运行后，控制台的输出结果：
    
    a
    b
    c
    a
    b
    c
    complete
    JSBin - repeat
    
###Transformation Operators
###map
    map 操作符签名：
    
    public map(project: function(value: T, index: number): R, thisArg: any): Observable<R>
    map 操作符作用：
    
    对 Observable 对象发出的每个值，使用指定的 project 函数，进行映射处理。
    
    map 操作符示例：
    
    var source = Rx.Observable.interval(1000);
    var newest = source.map(x => x + 2); 
    
    newest.subscribe(console.log);
    示例 marble 图：
    
    source: -----0-----1-----2-----3--...
                map(x => x + 2)
    newest: -----2-----3-----4-----5--...
    以上代码运行后，控制台的输出结果：
    
    2
    3
    4
    ...
    
###mapTo
    mapTo 操作符签名：
    
    public mapTo(value: any): Observable
    mapTo 操作符作用：
    
    对 Observable 对象发出的每个值，映射成固定的值。
    
    mapTo 操作符示例：
    
    var source = Rx.Observable.interval(1000);
    var newest = source.mapTo(2); 
    
    newest.subscribe(console.log);
    示例 marble 图：
    
    source: -----0-----1-----2-----3--...
                    mapTo(2)
    newest: -----2-----2-----2-----2--...
    以上代码运行后，控制台的输出结果：
    
    2
    2
    2
    ...
    
###scan
    scan 操作符签名：
    
    public scan(accumulator: function(acc: R, value: T, index: number): R,
        seed: T | R): Observable<R>
    scan 操作符作用：
    
    对 Observable 发出值，执行 accumulator 指定的运算，可以简单地认为是 Observable 版本的 Array.prototype.reduce 。
    
    scan 操作符示例：
    
    var source = Rx.Observable.from('hello')
                 .zip(Rx.Observable.interval(600), (x, y) => x);
    
    var example = source.scan((origin, next) => origin + next, '');
    
    example.subscribe({
        next: (value) => { console.log(value); },
        error: (err) => { console.log('Error: ' + err); },
        complete: () => { console.log('complete'); }
    });
    示例 marble 图：
    
    source : ----h----e----l----l----o|
        scan((origin, next) => origin + next, '')
    example: ----h----(he)----(hel)----(hell)----(hello)|
    以上代码运行后，控制台的输出结果：
    
    h
    he
    hel
    hell
    hello
    complete
    (备注：scan 与 reduce 最大的差别就是 scan 最终返回的一定是一个 Observable 对象，而 reduce 的返回类型不是固定的)
    
    JSBin - scan
    
####buffer
    buffer 操作符签名：
    
    public buffer(closingNotifier: Observable<any>): Observable<T[]>
    buffer 操作符作用：
    
    缓冲源 Observable 对象已发出的值，直到 closingNotifier 触发后，才统一输出缓存的元素。
    
    buffer 操作符示例：
    
    var source = Rx.Observable.interval(300);
    var source2 = Rx.Observable.interval(1000);
    var example = source.buffer(source2);
    
    example.subscribe({
        next: (value) => { console.log(value); },
        error: (err) => { console.log('Error: ' + err); },
        complete: () => { console.log('complete'); }
    });
    示例 marble 图：
    
    source : --0--1--2--3--4--5--6--7..
    source2: ---------0---------1--------...
                buffer(source2)
    example: ---------([0,1,2])---------([3,4,5]) 
    以上代码运行后，控制台的输出结果：
    
    [0,1,2]
    [3,4,5]
    [6,7,8]
    ....
    
###bufferTime
    bufferTime 操作符签名：
    
    public bufferTime(bufferTimeSpan: number, bufferCreationInterval: number, 
           maxBufferSize: number, scheduler: Scheduler): Observable<T[]>
    bufferTime 操作符作用：
    
    设定源 Observable 对象已发出的值的缓冲时间。
    
    bufferTime 操作符示例：
    
    var source = Rx.Observable.interval(300);
    var example = source.bufferTime(1000);
    
    example.subscribe({
        next: (value) => { console.log(value); },
        error: (err) => { console.log('Error: ' + err); },
        complete: () => { console.log('complete'); }
    });
    示例 marble 图：
    
    source : --0--1--2--3--4--5--6--7..
                bufferTime(1000)
    example: ---------([0,1,2])---------([3,4,5]) 
    以上代码运行后，控制台的输出结果：
    
    [0,1,2]
    [3,4,5]
    [6,7,8]
    ....
    JSBin - bufferTime
    
###bufferCount
    bufferCount 操作符签名：
    
    public bufferCount(bufferSize: number, startBufferEvery: number):     
            Observable<T[]>
    bufferCount 操作符作用：
    
    缓冲源 Observable对象已发出的值，直到大小达到给定的最大 bufferSize 。
    
    bufferCount 操作符示例：
    
    var source = Rx.Observable.interval(300);
    var example = source.bufferCount(3);
    
    example.subscribe({
        next: (value) => { console.log(value); },
        error: (err) => { console.log('Error: ' + err); },
        complete: () => { console.log('complete'); }
    });
    示例 marble 图：
    
    source : --0--1--2--3--4--5--6--7..
                bufferCount(3)
    example: ---------([0,1,2])---------([3,4,5]) 
    以上代码运行后，控制台的输出结果：
    
    [0,1,2]
    [3,4,5]
    [6,7,8]
    ....
    
###concatMap
    concatMap 操作符签名：
    
    public concatMap(project: function(value: T, ?index: number): ObservableInput, 
        resultSelector: function(outerValue: T, innerValue: I, outerIndex: number, 
        innerIndex: number): any): Observable
    concatMap 操作符作用：
    
    对每个 Observable 对象发出的值，进行映射处理，并进行合并。该操作符也会先处理前一个 Observable 对象，在处理下一个 Observable 对象。
    
    concatMap 操作符示例：
    
    var source = Rx.Observable.fromEvent(document.body, 'click');
    
    var example = source.concatMap(
                    e => Rx.Observable.interval(100).take(3));
                    
    example.subscribe({
        next: (value) => { console.log(value); },
        error: (err) => { console.log('Error: ' + err); },
        complete: () => { console.log('complete'); }
    });
    示例 marble 图：
    
    source : -----------c--c------------------...
            concatMap(c => Rx.Observable.interval(100).take(3))
    example: -------------0-1-2-0-1-2---------...
    以上代码运行后，控制台的输出结果：
    
    0
    1
    2
    0
    1
    2
    concatMap 其实就是 map 加上 concatAll 的简化写法。
    
    JSBin - concatMap
    
###switchMap
    switchMap 操作符签名：
    
    public switchMap(project: function(value: T, ?index: number): ObservableInput, 
      resultSelector: function(outerValue: T, innerValue: I, outerIndex: number, 
      innerIndex: number): any): Observable
    switchMap 操作符作用：
    
    对源 Observable 对象发出的值，做映射处理。若有新的 Observable 对象出现，会在新的 Observable 对象发出新值后，退订前一个未处理完的 Observable 对象。
    
    switchMap 操作符示例：
    
    var source = Rx.Observable.fromEvent(document.body, 'click');
    var example = source.switchMap(
                        e => Rx.Observable.interval(100).take(3));
                    
    example.subscribe({
        next: (value) => { console.log(value); },
        error: (err) => { console.log('Error: ' + err); },
        complete: () => { console.log('complete'); }
    });
    示例 marble 图：
    
    source : -----------c--c-----------------...
            concatMap(c => Rx.Observable.interval(100).take(3))
    example: -------------0--0-1-2-----------...
    以上代码运行后，控制台的输出结果：
   
    0
    0
    1
    2
    JSBin - switchMap
    
###Filtering Operators
###filter
    filter 操作符签名：
    
    public filter(predicate: function(value: T, index: number): boolean, 
        thisArg: any): Observable
    filter 操作符作用：
    
    对 Observable 对象发出的每个值，作为参数调用指定的 predicate 函数，若该函数的返回值为 true，则表示保留该项，若返回值为 false，则舍弃该值。
    
    filter 操作符示例：
    
    var source = Rx.Observable.interval(1000);
    var newest = source.filter(x => x % 2 === 0); 
    
    newest.subscribe(console.log);
    示例 marble 图：
    
    source: -----0-----1-----2-----3-----4-...
                filter(x => x % 2 === 0)
    newest: -----0-----------2-----------4-...
    以上代码运行后，控制台的输出结果：
    
    0 
    2
    4
    ...
    JSBin - filter
    
###take
    take 操作符签名：
    
    public take(count: number): Observable<T>
    take 操作符作用：
    
    用于获取 Observable 对象发出的前 n 项值，取完后就结束。
    
    take 操作符示例：
    
    var source = Rx.Observable.interval(1000);
    var example = source.take(3);
    
    example.subscribe({
        next: (value) => { console.log(value); },
        error: (err) => { console.log('Error: ' + err); },
        complete: () => { console.log('complete'); }
    });
    示例 marble 图：
    
    source : -----0-----1-----2-----3--..
                    take(3)
    example: -----0-----1-----2|
    以上代码运行后，控制台的输出结果：
    
    0
    1
    2
    complete
    
###first
    first 操作符签名：
    
    public first(predicate: function(value: T, index: number, source: Observable<T>): boolean,      resultSelector: function(value: T, index: number): R, 
      defaultValue: R): Observable<T | R>
    first 操作符作用：
    
    用于获取 Observable 对象发出的第一个元素，取完后就结束。
    
    first 操作符示例：
    
    var source = Rx.Observable.interval(1000);
    var example = source.first();
    
    example.subscribe({
        next: (value) => { console.log(value); },
        error: (err) => { console.log('Error: ' + err); },
        complete: () => { console.log('complete'); }
    });
    示例 marble 图：
    
    source : -----0-----1-----2-----3--..
                    first()
    example: -----0|
    以上代码运行后，控制台的输出结果：
    
    0
    complete
    
###takeUntil
    takeUntil 操作符签名：
    
    public takeUntil(notifier: Observable): Observable<T>
    takeUntil 操作符作用：
    
    当 takeUntil 传入的 notifier 发出值时，源 Observable 对象就会直接进入完成状态。
    
    takeUntil 操作符示例：
    
    var source = Rx.Observable.interval(1000);
    var click = Rx.Observable.fromEvent(document.body, 'click');
    var example = source.takeUntil(click);  
    
    example.subscribe({
        next: (value) => { console.log(value); },
        error: (err) => { console.log('Error: ' + err); },
        complete: () => { console.log('complete'); }
    });
    示例 marble 图：
    
    source : -----0-----1-----2------3--
    click  : ----------------------c----
                    takeUntil(click)
    example: -----0-----1-----2----|
    以上代码运行后，控制台的输出结果：
    
    0
    1
    2
    complete
    JSBin - takeUntil
    
###skip
    skip 操作符签名：
    
    public skip(count: Number): Observable
    skip 操作符作用：
    
    跳过源 Observable 对象前 count 项，并返回新的 Observable 对象。
    
    skip 操作符示例：
    
    var source = Rx.Observable.interval(1000);
    var example = source.skip(3);
    
    example.subscribe({
        next: (value) => { console.log(value); },
        error: (err) => { console.log('Error: ' + err); },
        complete: () => { console.log('complete'); }
    });
    示例 marble 图：
    
    source : ----0----1----2----3----4----5--....
                        skip(3)
    example: -------------------3----4----5--...
    以上代码运行后，控制台的输出结果：
    
    3
    4
    5
    ...
    
###takeLast
    takeLast 操作符签名：
    
    public takeLast(count: number): Observable<T>
    takeLast 操作符作用：
    
    获取源 Observable 对象发出的，后面 count 项的值。
    
    takeLast 操作符示例：
    
    var source = Rx.Observable.interval(1000).take(6);
    var example = source.takeLast(2);
    
    example.subscribe({
        next: (value) => { console.log(value); },
        error: (err) => { console.log('Error: ' + err); },
        complete: () => { console.log('complete'); }
    });
    示例 marble 图：
    
    source : ----0----1----2----3----4----5|
                    takeLast(2)
    example: ------------------------------(45)|
    以上代码运行后，控制台的输出结果：
    
    4
    5
    complete
    
###last
    last 操作符签名：
    
    public last(predicate: function): Observable
    last 操作符作用：
    
    获取源 Observable 对象发出的最后一项的值。
    
    last 操作符示例：
    
    var source = Rx.Observable.interval(1000).take(6);
    var example = source.last();
    
    example.subscribe({
        next: (value) => { console.log(value); },
        error: (err) => { console.log('Error: ' + err); },
        complete: () => { console.log('complete'); }
    });
    示例 marble 图：
    
    source : ----0----1----2----3----4----5|
                        last()
    example: ------------------------------(5)|
    以上代码运行后，控制台的输出结果：
    
    5
    complete

###debounceTime
    debounceTime 操作符签名：
    
    public debounceTime(dueTime: number, scheduler: Scheduler): Observable
    debounceTime 操作符作用：
    
    在设定的时间跨度内，若源 Observable 对象没有再发出新值，则返回最近一次发出的值。
    
    debounceTime 操作符示例：
    
    var source = Rx.Observable.interval(300).take(5);
    var example = source.debounceTime(1000);
    
    example.subscribe({
        next: (value) => { console.log(value); },
        error: (err) => { console.log('Error: ' + err); },
        complete: () => { console.log('complete'); }
    });
    示例 marble 图：
    
    source : --0--1--2--3--4|
            debounceTime(1000)
    example: --------------4|  
    以上代码运行后，控制台的输出结果：
    
    4
    complete
    debounceTime 的工作方式是每次收到元素时，它会先把元素缓存住并等待给定的时间，如果等待时间内没有收到新的元素，则返回最新的缓存值。如果等待时间内，又收到新的元素，则会替换之前缓存的元素，并重新开始计时。
    
    JSBin - debounceTime
    
###throttleTime
    throttleTime 操作符签名：
    
    public throttleTime(duration: number, scheduler: Scheduler): Observable<T>
    throttleTime 操作符作用：
    
    从源 Observable 对象发出第一个值开始，忽略等待时间内发出的值，等待时间过后再发出新值。与 debounceTime 不同的是，throttleTime 一开始就会发出值，在等待时间内不会发出任何值，等待时间过后又会发出新的值。
    
    throttleTime 示例：
    
    var source = Rx.Observable.interval(300).take(5);
    var example = source.throttleTime(1000);
    
    example.subscribe({
        next: (value) => { console.log(value); },
        error: (err) => { console.log('Error: ' + err); },
        complete: () => { console.log('complete'); }
    });
    示例 marble 图：
    
    source : --0--1--2--3--4|
            throttleTime(1000)
    example: --0------------4|  
    以上代码运行后，控制台的输出结果：
    
    0
    4
    complete
    throttle 比较像是控制行为的最高频率，也就是说如果我们设定 1000 ms，那么该事件最大频率就是每秒触发一次而不会过快。debounce 则比较像是必须等待的时间，要等一定的时间过了才会收到元素。
    
    JSBin - throttleTime
    
###distinct
    distinct 操作符签名：
    
    public distinct(keySelector: function, flushes: Observable): Observable
    distinct 操作符的作用：
    
    过滤源 Observable 发出的值，确保不会发出重复出现的值。
    
    distinct 操作符示例：
    
    var source = Rx.Observable.from(['a', 'b', 'c', 'a', 'b'])
                    .zip(Rx.Observable.interval(300), (x, y) => x);
    var example = source.distinct()
    
    example.subscribe({
        next: (value) => { console.log(value); },
        error: (err) => { console.log('Error: ' + err); },
        complete: () => { console.log('complete'); }
    });
    示例 marble 图：
    
    source : --a--b--c--a--b|
                distinct()
    example: --a--b--c------|
    以上代码运行后，控制台的输出结果：
    
    a
    b
    c
    complete
    distinct 内部会创建一个 Set 集合，当接收到元素时，会判断 Set 集合中，是否已存在相同的值，如果已存在的话，就不会发出值。若不存在的话，会把值存入到 Set 集合中并发出该值。所以尽量不要直接把 distinct 操作符应用在无限的 Observable 对象中，这样会导致 Set 集合越来越大。针对这种场景，大家可以设置 distinct 的第二个参数 (清除已保存的数据)，或使用 distinctUntilChanged。
    
    JSBin - distinct
    
###distinctUntilChanged
    distinctUntilChanged 操作符签名：
    
    public distinctUntilChanged(compare: function): Observable
    distinctUntilChanged 操作符作用：
    
    过滤源 Observable 发出的值，若当前发出的值与前一次值不一致，则发出该值。
    
    distinctUntilChanged 操作符示例：
    
    var source = Rx.Observable.from(['a', 'b', 'c', 'c', 'b'])
                   .zip(Rx.Observable.interval(300), (x, y) => x);
    var example = source.distinctUntilChanged()
    
    example.subscribe({
        next: (value) => { console.log(value); },
        error: (err) => { console.log('Error: ' + err); },
        complete: () => { console.log('complete'); }
    });
    示例 marble 图：
    
    source : --a--b--c--c--b|
                distinctUntilChanged()
    example: --a--b--c-----b|
    以上代码运行后，控制台的输出结果：
    
    a
    b
    c
    b
    complete
    distinctUntilChanged 跟 distinct 一样会把相同的元素过滤掉，但 distinctUntilChanged 只会跟最后一次送出的元素比较，不会每个比较。
    
    JSBin - distinctUntilChanged
    
###Combination Operators
###concat
    concat 操作符签名：
    
    public concat(other: ObservableInput, scheduler: Scheduler): Observable
    concat 操作符作用：
    
    把多个 Observable 对象合并为一个 Observable 对象，Observable 对象会依次执行，即需等前一个 Observable 对象完成后，才会继续订阅下一个。
    
    concat 操作符示例：
    
    var source = Rx.Observable.interval(1000).take(3);
    var source2 = Rx.Observable.of(3)
    var source3 = Rx.Observable.of(4,5,6)
    var example = source.concat(source2, source3);
    
    example.subscribe({
        next: (value) => { console.log(value); },
        error: (err) => { console.log('Error: ' + err); },
        complete: () => { console.log('complete'); }
    });
    示例 marble 图：
    
    source : ----0----1----2|
    source2: (3)|
    source3: (456)|
                concat()
    example: ----0----1----2(3456)|
    以上代码运行后，控制台的输出结果：
    
    0 # source
    1 # source
    2 # source
    3 # source2
    4 # source3
    5 # source3
    6 # source3
    complete # example
    JSBin - concat
    
###concatAll
    concatAll 操作符签名：
    
    public concatAll(): Observable
    concatAll 操作符作用：
    
    合并多个 Observable 对象，并在上一个 Observable 对象完成后订阅下一个 Observable 对象。
    
    concatAll 操作符示例：
    
    var obs1 = Rx.Observable.interval(1000).take(5);
    var obs2 = Rx.Observable.interval(500).take(2);
    var obs3 = Rx.Observable.interval(2000).take(1);
    
    var source = Rx.Observable.of(obs1, obs2, obs3);
    
    var example = source.concatAll();
    
    example.subscribe({
        next: (value) => { console.log(value); },
        error: (err) => { console.log('Error: ' + err); },
        complete: () => { console.log('complete'); }
    });
    示例 marble 图：
    
    source : (o1                 o2      o3)|
               \                  \       \
                --0--1--2--3--4|   -0-1|   ----0|
                    
                    concatAll()        
    
    example: --0--1--2--3--4-0-1----0|
    以上代码运行后，控制台的输出结果：
    
    0 # o1
    1 # o1
    2 # o1
    3 # o1
    4 # o1
    0 # o2
    1 # o2
    0 # o3
    complete # o3
    JSBin - concatAll
    
###startWith
    startWith 操作符签名：
    
    public startWith(values: ...T, scheduler: Scheduler): Observable
    startWith 操作符作用：
    
    在开始发出源 Observable 数据之前发出已设置的参数值，并返回新的 Observable 对象。
    
    startWith 操作符示例：
    
    var source = Rx.Observable.interval(1000);
    var example = source.startWith(0);
    
    example.subscribe({
        next: (value) => { console.log(value); },
        error: (err) => { console.log('Error: ' + err); },
        complete: () => { console.log('complete'); }
    });
    示例 marble 图：
    
    source : ----0----1----2----3--...
                    startWith(0)
    example: (0)----0----1----2----3--...
    以上代码运行后，控制台的输出结果：
    
    0
    0
    1
    2
    ...
    (备注：startWith 的值一开始是同步发出的，该操作符常用于保存程序的初始状态)
    
###merge
    merge 操作符签名：
    
    public merge(other: ObservableInput, concurrent: number, scheduler: Scheduler): Observable
    merge 操作符作用：
    
    合并 Observable 对象，并按给定的时序发出对应值。
    
    merge 操作符示例：
    
    var source = Rx.Observable.interval(500).take(3);
    var source2 = Rx.Observable.interval(300).take(6);
    var example = source.merge(source2);
    
    example.subscribe({
        next: (value) => { console.log(value); },
        error: (err) => { console.log('Error: ' + err); },
        complete: () => { console.log('complete'); }
    });
    示例 marble 图：
    
    source : ----0----1----2|
    source2: --0--1--2--3--4--5|
                merge()
    example: --0-01--21-3--(24)--5|
    以上代码运行后，控制台的输出结果：
    
    0 # source2
    0 # source
    1 # source2
    2 # source2
    1 # source
    3 # source2
    2 # source
    4 # source2
    5 # source2
    complete
    (备注：注意与 concat 操作符的区别，concat 会在前一个 Observable 对象执行完后，再订阅下一个 Observable 对象)
    
    JSBin - merge
    
###mergeAll
    mergeAll 操作符签名：
    
    public mergeAll(concurrent: number): Observable
    mergeAll 操作符作用：
    
    将高阶 Observable 对象转换为一阶Observable 对象，并同时处理所有的 Observable 对象。
    
    mergeAll 操作符示例：
    
    var click = Rx.Observable.fromEvent(document.body, 'click');
    var source = click.map(e => Rx.Observable.interval(1000));
    
    var example = source.mergeAll();
    example.subscribe({
        next: (value) => { console.log(value); },
        error: (err) => { console.log('Error: ' + err); },
        complete: () => { console.log('complete'); }
    });
    示例 marble 图：
    
    click  : ---------c-c------------------c--.. 
            map(e => Rx.Observable.interval(1000))
    source : ---------o-o------------------o--..
                       \ \                  \----0----1--...
                        \ ----0----1----2----3----4--...
                         ----0----1----2----3----4--...
                         mergeAll()
    example: ----------------00---11---22---33---(04)4--...
    以上代码运行后，控制台的输出结果：
    
    00
    11
    22
    33
    04
    4
    mergeAll 不会像 switch 那样退订原有的 Observable 对象，而是会并行处理多个 Observable 对象。
    
    JSBin - mergeAll
    
###combineLatest
    combineLatest 操作符签名：
    
    public combineLatest(other: ObservableInput, project: function): Observable
    combineLatest 操作符作用：
    
    用于合并输入的 Observable 对象，当源 Observable 对象和 other Observable 对象都发出值后，才会调用 project 函数。
    
    combineLatest 操作符示例：
    
    var source = Rx.Observable.interval(500).take(3);
    var newest = Rx.Observable.interval(300).take(6);
    
    var example = source.combineLatest(newest, (x, y) => x + y);
    
    example.subscribe({
        next: (value) => { console.log(value); },
        error: (err) => { console.log('Error: ' + err); },
        complete: () => { console.log('complete'); }
    });
    示例 marble 图：
    
    source : ----0----1----2|
    newest : --0--1--2--3--4--5|
    
        combineLatest(newest, (x, y) => x + y);
    
    example: ----01--23-4--(56)--7|
    以上代码运行后，控制台的输出结果：
    
    0
    1
    2
    3
    4
    5
    6
    7
    complete
    combineLatest 示例执行过程 (project -> (x, y) => x + y)：
    
    newest 发出 0 ，但此时 source 并未发出任何值，所以不会调用 project 函数
    
    source 发出 0 ，此时 newest 最后一次发出的值为 0 ，调用 project 函数，返回值为 0
    
    newest 发出 1 ，此时 source 最后一次发出的值为 0，调用 project 函数，返回值为 1
    
    newest 发出 2 ，此时 source 最后一次发出的值为 0，调用 project 函数，返回值为 2
    
    source 发出 1 ，此时 newest 最后一次发出的值为 2 ，调用 project 函数，返回值为 3
    
    newest 发出 3 ，此时 source 最后一次发出的值为 1，调用 project 函数，返回值为 4
    
    source 发出 2 ，此时 newest 最后一次发出的值为 3 ，调用 project 函数，返回值为 5
    
    newest 发出 4 ，此时 source 最后一次发出的值为 2，调用 project 函数，返回值为 6
    
    newest 发出 5 ，此时 source 最后一次发出的值为 2，调用 project 函数，返回值为 7
    
    newest 和 source 都结束了，所以 example 也结束了。
    
    JSBin - combineLatest
    
###zip
    zip 操作符签名：
    
    public static zip(observables: *，project: Function): Observable<R>
    zip 操作符作用：
    
    根据每个输入 Observable 对象的输出顺序，产生一个新的 Observable 对象。
    
    zip 操作符示例：
    
    var source = Rx.Observable.interval(500).take(3);
    var newest = Rx.Observable.interval(300).take(6);
    
    var example = source.zip(newest, (x, y) => x + y);
    
    example.subscribe({
        next: (value) => { console.log(value); },
        error: (err) => { console.log('Error: ' + err); },
        complete: () => { console.log('complete'); }
    });
    示例 marble 图：
    
    source : ----0----1----2|
    newest : --0--1--2--3--4--5|
        zip(newest, (x, y) => x + y)
    example: ----0----2----4|
    以上代码运行后，控制台的输出结果：
    
    0
    2
    4
    complete
    zip 示例执行过程 (project -> (x, y) => x + y)：
    
    newest 发出第一个值 0 ，此时 source 并未发出任何值，所以不会调用 project 函数
    
    source 发出第一个值 0 ，此时 newest 之前发出的第一个值为 0，调用 project 函数，返回值为 0
    
    newest 发出第二个值 1 ，此时 source 并未发出第二个值，所以不会调用 project 函数
    
    newest 发出第三个值 2 ，此时 source 并未发出第三个值，所以不会调用 project 函数
    
    source 发出第二个值 1 ，此时 newest 之前发出的第二个值为 1，调用 project 函数，返回值为 2
    
    newest 发出第四个值 3 ，此时 source 并未发出第四个值，所以不会调用 project 函数
    
    source 发出第三个值 2 ，此时 newest 之前发出的第三个值为 2，调用 project 函数，返回值为 4
    
    source 对象结束，example 对象也同时结束，因为 source 对象与 newest 对象不会再有相同次序的值
    
    JSBin - zip
    
###withLatestFrom
    withLatestFrom 操作符签名：
    
    public withLatestFrom(other: ObservableInput, project: Function): Observable
    withLatestFrom 操作符作用：
    
    当源 Observable 发出新值的时候，根据 project 函数，合并 other Observable 对象此前发出的最新值。
    
    withLatestFrom 操作符示例：
    
    var main = Rx.Observable.from('hello').zip(Rx.Observable.interval(500), 
        (x, y) => x);
    var some = Rx.Observable.from([0,1,0,0,0,1]).zip(Rx.Observable.interval(300), 
        (x, y) => x);
    
    var example = main.withLatestFrom(some, (x, y) => {
        return y === 1 ? x.toUpperCase() : x;
    });
    
    example.subscribe({
        next: (value) => { console.log(value); },
        error: (err) => { console.log('Error: ' + err); },
        complete: () => { console.log('complete'); }
    });
    示例 marble 图：
    
    main   : ----h----e----l----l----o|
    some   : --0--1--0--0--0--1|
    
    withLatestFrom(some, (x, y) =>  y === 1 ? x.toUpperCase() : x);
    
    example: ----h----e----l----L----O|
    以上代码运行后，控制台的输出结果：
    
    h
    e
    l
    L
    O
    complete
    withLatestFrom 示例执行过程 (project -> (x, y) => y === 1 ? x.toUpperCase() : x) )：
    
    main 发出 h ，此时 some 上一次发出的值为 0，调用 project 函数，返回值为 h
    
    main 发出 e ，此时 some 上一次发出的值为 0，调用 project 函数，返回值为 e
    
    main 发出 l ，此时 some 上一次发出的值为 0，调用 project 函数，返回值为 l
    
    main 发出 l，此时 some 上一次发出的值为 1，调用 project 函数，返回值为 L
    
    main 发出 o，此时 some 上一次发出的值为 1，调用 project 函数，返回值为 O
    
    JSBin - withLatestFrom
    
###switch
    switch 操作符签名：
    
    public switch(): Observable<T>
    switch 操作符作用：
    
    切换为最新的 Observable 数据源，并退订前一个 Observable 数据源。
    
    switch 操作符示例：
    
    var click = Rx.Observable.fromEvent(document.body, 'click');
    var source = click.map(e => Rx.Observable.interval(1000));
    
    var example = source.switch();
    example.subscribe({
        next: (value) => { console.log(value); },
        error: (err) => { console.log('Error: ' + err); },
        complete: () => { console.log('complete'); }
    });
    示例 marble 图：
    
    click  : ---------c-c------------------c--.. 
            map(e => Rx.Observable.interval(1000))
    source : ---------o-o------------------o--..
                       \ \                  \----0----1--...
                        \ ----0----1----2----3----4--...
                         ----0----1----2----3----4--...
                         switch()
    example: -----------------0----1----2--------0----1--...
    以上代码运行后，控制台的输出结果：
    
    0
    1
    2
    0
    1
    ...
    从 switch 操作符示例的 marble 图，可以看得出来第一次点击事件与第二次点击事件时间点太靠近了，导致第一个 Observable 还来不及发出值就直接被退订了，当每次点击后创建新的 Observable 对象，就会自动退订前一次创建的 Observable 对象。
    
    switch 操作符会在新的 Observable 对象创建完后，直接使用新的 Observable 对象，并会自动退订之前旧的 Observable 对象。
    
    JSBin - switch
    
    Utility Operators
    
###delay
    delay 操作符签名：
    
    public delay(delay: number | Date, scheduler: Scheduler): Observable
    delay 操作符作用：
    
    延迟源 Observable 对象，发出第一个元素的时间点。
    
    delay 操作符使用示例：
    
    var source = Rx.Observable.interval(300).take(5);
    var example = source.delay(500);
    
    example.subscribe({
        next: (value) => { console.log(value); },
        error: (err) => { console.log('Error: ' + err); },
        complete: () => { console.log('complete'); }
    });
    示例 marble 图：
    
    source : --0--1--2--3--4|
            delay(500)
    example: -------0--1--2--3--4|
    以上代码运行后，控制台的输出结果：
    
    0 # 500ms后发出
    1
    2
    3
    4
    complete
    JSBin - delay
    
###delayWhen
    delayWhen 操作符签名：
    
    public delayWhen(delayDurationSelector: function(value: T): Observable, 
                subscriptionDelay: Observable): Observable
    delayWhen 操作符作用：
    
    delayWhen 的作用跟 delay 操作符类似，最大的区别是 delayWhen 会影响每个元素，而且调用的时候需要设置 delayDurationSelector 函数，该函数的返回值是 Observable 对象。
    
    delayWhen 操作符示例：
    
    var source = Rx.Observable.interval(300).take(5);
    var example = source
                  .delayWhen( x => Rx.Observable.interval(100 * x).take(1));
    
    example.subscribe({
        next: (value) => { console.log(value); },
        error: (err) => { console.log('Error: ' + err); },
        complete: () => { console.log('complete'); }
    });
    示例 marble 图：
    
    source : --0--1--2--3--4|
        .delayWhen(x => Rx.Observable.interval(100 * x).take(1));
    example: --0---1----2-----3------4|
    以上代码运行后，控制台的输出结果：
    
    0
    1
    2
    3
    4
    complete

###Multicasting Operators
###multicast
    multicast 操作符签名：
    
    public multicast(subjectOrSubjectFactory: Function | Subject, 
        selector: Function): Observable
    multicast 操作符作用：
    
    用于挂载 Subject 对象，并返回一个可链接 (connectable) 的 Observable 对象。
    
    multicast 操作符示例：
    
    var source = Rx.Observable.interval(1000)
                 .take(3)
                 .multicast(new Rx.Subject());
    
    var observerA = {
        next: value => console.log('A next: ' + value),
        error: error => console.log('A error: ' + error),
        complete: () => console.log('A complete!')
    };
    
    var observerB = {
        next: value => console.log('B next: ' + value),
        error: error => console.log('B error: ' + error),
        complete: () => console.log('B complete!')
    };
    
    source.subscribe(observerA); // subject.subscribe(observerA)
    
    source.connect(); // source.subscribe(subject)
    
    setTimeout(() => {
        source.subscribe(observerB); // subject.subscribe(observerA)
    }, 1000);
    以上代码运行后，控制台的输出结果：
    
    A next: 0
    A next: 1
    B next: 1
    A next: 2
    B next: 2
    A complete!
    B complete!
    JSBin - multicast
    
    上面示例中，我们通过 multicast 挂载 Subject 对象之后返回了 source 对象，该对象通过 subscribe 添加的观察者，都是添加到 Subject 对象内部的观察者列表中。此外当调用 source 对象的 connect() 方法后才会真正的订阅 source 对象，如果没有执行 connect() ，source 不会真正执行。如果要真正退订观察者，应该使用以下方式：
    
    var realSubscription = source.connect();
    ...
    realSubscription.unsubscribe();

###refCount
    refCount 必须搭配 multicast 一起使用，在调用 multicast 操作符后，接着调用 refCount() 。这样只要有订阅就会自动进行 connect (链接) 操作。具体示例如下：
    
    var source = Rx.Observable.interval(1000)
                 .do(x => console.log('send: ' + x))
                 .multicast(new Rx.Subject())
                 .refCount();
    
    var observerA = {
        next: value => console.log('A next: ' + value),
        error: error => console.log('A error: ' + error),
        complete: () => console.log('A complete!')
    };
    
    var observerB = {
        next: value => console.log('B next: ' + value),
        error: error => console.log('B error: ' + error),
        complete: () => console.log('B complete!')
    };
    
    var subscriptionA = source.subscribe(observerA); // 订阅数 0 => 1
    
    var subscriptionB;
    setTimeout(() => {
        subscriptionB = source.subscribe(observerB);  // 订阅数 1 => 2
    }, 1000);
    上面示例中，当 source 对象被观察者 A 订阅时，就会立即执行并发送值，我们就不需要再额外执行 connect 操作。同样只要订阅数变成 0，就会自动停止发送。具体示例如下：
    
    var source = Rx.Observable.interval(1000)
                 .do(x => console.log('send: ' + x))
                 .multicast(new Rx.Subject())
                 .refCount();
    
    var observerA = {
        next: value => console.log('A next: ' + value),
        error: error => console.log('A error: ' + error),
        complete: () => console.log('A complete!')
    };
    
    var observerB = {
        next: value => console.log('B next: ' + value),
        error: error => console.log('B error: ' + error),
        complete: () => console.log('B complete!')
    }
    
    var subscriptionA = source.subscribe(observerA);
    // 订阅数 0 => 1
    
    var subscriptionB;
    setTimeout(() => {
        subscriptionB = source.subscribe(observerB);
        // 订阅数 1 => 2
    }, 1000);
    
    setTimeout(() => {
        subscriptionA.unsubscribe(); // 订阅数 2 => 1
        subscriptionB.unsubscribe(); // 订阅数 1 => 0，source 停止发送元素
    }, 5000);
    以上代码运行后，控制台的输出结果：
    
    send: 0
    A next: 0
    send: 1
    A next: 1
    B next: 1
    send: 2
    A next: 2
    B next: 2
    send: 3
    A next: 3
    B next: 3
    send: 4
    A next: 4
    B next: 4
    JSBin - refCount
    
###publish
    publish 操作符签名：
    
    public publish(selector: Function): *
    publish 操作符作用：
    
    用于挂载 Subject 对象，并返回一个可链接 (connectable) 的 Observable 对象。即 publish 操作符与 multicast(new Rx.Subject()) 是等价的。
    
    var source = Rx.Observable.interval(1000)
                 .publish() 
                 .refCount();
                 
    var source = Rx.Observable.interval(1000)
                 .multicast(new Rx.Subject()) 
                 .refCount();
    publishReplay
    var source = Rx.Observable.interval(1000)
                 .publishReplay(1) 
                 .refCount();
                 
    var source = Rx.Observable.interval(1000)
                .multicast(new Rx.ReplaySubject(1)) 
                .refCount();
    publishBehavior
    var source = Rx.Observable.interval(1000)
                 .publishBehavior(0) 
                 .refCount();
                 
    var source = Rx.Observable.interval(1000)
                 .multicast(new Rx.BehaviorSubject(0)) 
                 .refCount();
    publishLast
    var source = Rx.Observable.interval(1000)
                 .publishLast() 
                 .refCount();
                 
    var source = Rx.Observable.interval(1000)
                 .multicast(new Rx.AsyncSubject(1)) 
                 .refCount();

###share
    share 操作符签名：
    
    public share(): Observable<T>
    share 操作符作用：
    
    share 操作符是 publish + refCount 的简写。
    
    share 操作符示例：
    
    var source = Rx.Observable.interval(1000)
                 .share();
                 
    var source = Rx.Observable.interval(1000)
                 .publish()
                 .refCount();
    
    var source = Rx.Observable.interval(1000)
                 .multicast(new Rx.Subject()) 
                 .refCount();
    Error Handling Operators

###catch
    catch 操作符签名：
    
    public catch(selector: function): Observable
    catch 操作符作用：
    
    用于捕获异常，同时可以返回一个 Observable 对象，用于发出新的值。
    
    catch 操作符示例：
    
    var source = Rx.Observable.from(['a','b','c','d',2])
                   .zip(Rx.Observable.interval(500), (x,y) => x);
    
    var example = source.map(x => x.toUpperCase())
                        .catch(error => Rx.Observable.of('h'));
    
    example.subscribe({
        next: (value) => { console.log(value); },
        error: (err) => { console.log('Error: ' + err); },
        complete: () => { console.log('complete'); }
    }); 
    示例 marble 图：
    
    source : ----a----b----c----d----2|
            map(x => x.toUpperCase())
             ----a----b----c----d----X|
            catch(error => Rx.Observable.of('h'))
    example: ----A----B----C----D----h| 
    以上代码运行后，控制台的输出结果：
    
    A
    B
    C
    D
    h
    complete
    当错误发生时，我们可以返回一个 empty 的 Observable 对象来直接结束源 Observable 对象。
    
###retry
    retry 操作符签名：
    
    public retry(count: number): Observable
    retry 操作符作用：
    
    发生错误后，重试 count 次数
    
    retry 操作符示例：
    
    var source = Rx.Observable.from(['a','b','c','d',2])
                   .zip(Rx.Observable.interval(500), (x,y) => x);
    
    var example = source.map(x => x.toUpperCase())
                        .retry(1);
    
    example.subscribe({
        next: (value) => { console.log(value); },
        error: (err) => { console.log('Error: ' + err); },
        complete: () => { console.log('complete'); }
    }); 
    示例 marble 图：
    
    source : ----a----b----c----d----2|
            map(x => x.toUpperCase())
             ----a----b----c----d----X|
                    retry(1)
    example: ----A----B----C----D--------A----B----C----D----X|
    以上代码运行后，控制台的输出结果：
    
    A
    B
    C
    D
    A
    B
    C
    D
    Error: TypeError: x.toUpperCase is not a function

###retryWhen
    retryWhen 操作符签名：
    
    public retryWhen(notifier: function(errors: Observable): Observable): Observable
    retryWhen 操作符作用：
    
    捕获异常 Observable 对象，进行异常处理后，可重新订阅源 Observable 对象。
    
    retryWhen 操作符示例：
    
    var source = Rx.Observable.from(['a','b','c','d',2])
                   .zip(Rx.Observable.interval(500), (x,y) => x);
    
    var example = source.map(x => x.toUpperCase())
                        .retryWhen(errorObs => errorObs.delay(1000));
    
    example.subscribe({
        next: (value) => { console.log(value); },
        error: (err) => { console.log('Error: ' + err); },
        complete: () => { console.log('complete'); }
    }); 
    示例 marble 图：
    
    source : ----a----b----c----d----2|
            map(x => x.toUpperCase())
             ----a----b----c----d----X|
            retryWhen(errorObs => errorObs.delay(1000))
    example: ----A----B----C----D-------------------A----B----C----D----...
    以上代码运行后，控制台的输出结果：
    
    A
    B
    C
    D
    ...
