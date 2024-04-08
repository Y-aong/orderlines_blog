---
icon: pen-to-square
date: 2024-03-09
category:
  - 源码分析
  - robotframework
tag:
  - 源码分析
  - robotframework
---



# robot源码分析——关键字驱动的思路



`robotframework`是一个以关键字驱动的测试框架，我也在编写一个工作流的框架，其中也会用到动态生成关键字方面的需求。我觉得robot中关键字比较好用，是值得我来借鉴的地方，所以我想学习下robot 关键字相关的实现方式。


### 一、获取关键字

- KeywordCreator使用library和name创建所用的关键字，并保存到keywords列表中
  - 具体实现需要KeywordCreator调用create方法，这里返回的是关键字library,关键字名称,参数，文档和tag的集合
    - create方法又是使用LibraryKeyword来进行创建的
    - DynamicKeyword作为LibraryKeyword的子类其中一个重要的属性method，这个method实际上就是一个可执行的对象
    - 这个method就是KeywordCreator调用create的返回值

```python
class KeywordCreator:
    def __init__(self, library: TestLibrary, getting_method_failed_level='INFO'):
        self.library = library
        self.getting_method_failed_level = getting_method_failed_level

    def create_keywords(self, names: 'list[str]|None' = None):
        library = self.library
        library.keyword_finder.invalidate_cache()
        instance = library.instance
        keywords = library.keywords = []
        if names is None:
            names = self.get_keyword_names()
        seen = NormalizedDict(ignore='_')
        for name in names:
            try:
                # 这里调用的就是KeywordCreator的create方法，生成关键字
                kw = self._create_keyword(instance, name)
            except DataError as err:
                self._adding_keyword_failed(name, err, self.getting_method_failed_level)
            else:
                if not kw:
                    continue
                try:
                    if kw.embedded:
                        self._validate_embedded(kw)
                    else:
                        self._handle_duplicates(kw, seen)
                except DataError as err:
                    self._adding_keyword_failed(kw.name, err)
                else:
                    keywords.append(kw)
                    library._logger.debug(f"Created keyword '{kw.name}'.")
                    
K = TypeVar('K', bound='LibraryKeyword')

class KeywordCreator(Generic[K]):
    keyword_class: 'type[K]'

    def __init__(self, name: str, library: 'TestLibrary|None' = None):
        self.name = name
        self.library = library
        self.extra = {}
        if library and RUN_KW_REGISTER.is_run_keyword(library.real_name, name):
            resolve_until = RUN_KW_REGISTER.get_args_to_process(library.real_name, name)
            self.extra['resolve_args_until'] = resolve_until

    @property
    def instance(self) -> Any:
        return self.library.instance

    def create(self, **extra) -> K:
        tags = self.get_tags()
        doc, doc_tags = split_tags_from_doc(self.get_doc())
        kw = self.keyword_class(
            owner=self.library,
            name=self.get_name(),
            args=self.get_args(),
            doc=doc,
            tags=tags + doc_tags,
            **self.extra,
            **extra
        )
        kw.args.name = lambda: kw.full_name
        return kw


```


### 二、运行关键字
- DynamicMethod：
  - 通过传入library, 关键字名称，参数动态生成可执行的关键字
  - 其中有个重要的属性method，就是我们要运行的关键字
- RunKeyword：
  - `__call__`通过关键字名称获取可执行对象。
  - 返回的self.method也是父类的_get_method(self, instance)的返回值，是个可执行函数
  - 原理：使用getattr反射方式获取的callable对象
  
    
```python
class DynamicMethod:
    _underscore_name = NotImplemented

    def __init__(self, instance):
        self.instance = instance
        self.method = self._get_method(instance)

    def _get_method(self, instance):
        for name in self._underscore_name, self._camelCaseName:
            method = getattr(instance, name, None)
            if callable(method):
                return method
        return no_dynamic_method


class RunKeyword(DynamicMethod):
    _underscore_name = 'run_keyword'

    def __init__(self, instance, keyword_name: 'str|None' = None, supports_named_args: 'bool|None' = None):
        super().__init__(instance)
        self.keyword_name = keyword_name
        self._supports_named_args = supports_named_args

    @property
    def supports_named_args(self) -> bool:
        if self._supports_named_args is None:
            spec = PythonArgumentParser().parse(self.method)
            self._supports_named_args = len(spec.positional) == 3
        return self._supports_named_args

    def __call__(self, *positional, **named):
        if self.supports_named_args:
            args = (self.keyword_name, positional, named)
        elif named:
            # This should never happen.
            raise ValueError(f"'named' should not be used when named-argument " f"support is not enabled, got {named}.")
        else:
            args = (self.keyword_name, positional)
        # 这里的self.method是它父类的_get_method(self, instance)的返回值，是个可执行函数
        return self.method(*args)


class DynamicKeyword(LibraryKeyword):
    """Represents a keyword in a dynamic library."""
    owner: 'DynamicLibrary'
    __slots__ = ['run_keyword', '_orig_name', '__source_info']

    def __init__(self, owner: 'DynamicLibrary',
                 name: str = '',
                 args: 'ArgumentSpec|None' = None,
                 doc: str = '',
                 tags: 'Tags|Sequence[str]' = (),
                 resolve_args_until: 'int|None' = None,
                 parent: 'BodyItemParent|None' = None,
                 error: 'str|None' = None):
        super().__init__(owner, printable_name(name, code_style=True), args, doc, tags, resolve_args_until, parent,
                         error)
        self._orig_name = name
        self.__source_info = None

    @property
    def method(self) -> Callable[..., Any]:
        """Dynamic ``run_keyword`` method."""
        return RunKeyword(self.owner.instance, self._orig_name, self.owner.supports_named_args)
```

总结
其实robot的运行关键字思路也是比较简单的
- 获取关键字
  - robot先获取所用的关键字放在一个list中，这些关键字对象包括library、关键字名称，可执行对象，参数，文档。也是相当于导包的作用
  
- 运行关键字
  - 运行关键字是通过关键字名称，library获取可执行对象，把参数放进来就是执行关键字了
```python
def __call__(self, *positional, **named):
        if self.supports_named_args:
            args = (self.keyword_name, positional, named)
        elif named:
            # This should never happen.
            raise ValueError(f"'named' should not be used when named-argument " f"support is not enabled, got {named}.")
        else:
            args = (self.keyword_name, positional)
        # 这里的self.method是它父类的_get_method(self, instance)的返回值，是个可执行函数
        return self.method(*args)
```

### 三、个人实现

我自己也实现了个类似的功能，我实现的代码比较简单，但是原理和robot类似都是使用反射的机制来运行关键字，
不过有一点不同，我不是一开始就把所有的内置组件类全部实例化一遍，把他们存起来等待使用。我是使用的时候在进行实例化对应的组件库，进行了一个懒加载。
我这样做有个好处就是有些不用的组件库可以在这次运行中不加载，减少机器内存消耗，但是也有点不好就是运行到一半发现对应的组件库没有，可能发现问题的
时机会延后。不过我是通过UI来生成流程的所有上面说的这个问题可以大概率避免。

```python
import importlib
import inspect
from typing import List

def dynamic_import(module_name: str, class_names: List[str]) -> dict:
    """
    动态导入组件库，这里类名必须要和模块名一致
    Import component libraries dynamically, where the class name must match the module name
    :param module_name: 模块名，参考配置文件中的标准库.Module name, refer to the standard library in the configuration file
    :param class_names: 类名数组.Class names
    :return:
    """
    modules = dict()
    for _class in class_names:
        module_str = f'{module_name}.{_class}'
        module = importlib.import_module(module_str)
        for name, sub in inspect.getmembers(module, inspect.isclass):
            if modules.get(name):
                raise ValueError(f'class name {name} already exists')
            if sub.__base__.__name__ == 'BaseTask':
                modules[name] = sub
    return modules
print(dynamic_import('orderlines.libraries', ['BuiltIn']))
# {'BuiltIn': <class 'orderlines.libraries.BuiltIn.BuiltIn'>}
```

`dynamic_import('orderlines.libraries', ['BuiltIn']`这个代码相当于**from module_name import class_name**把组件类放到modules中
当我们传过来一个关键字的时候，通过library和method_name可以通过反射`getattr`获取可执行对象，通过传过来的参数运行函数
我们传来的参数格式大概如下

```python
data = {
  "module_name": "BuiltIn",
  "method_name": "start"
}
modules = dynamic_import('orderlines.libraries', ['BuiltIn'])
module = modules.get(data.get('module_name'))
getattr(module, data.get('method_name'))()
```

