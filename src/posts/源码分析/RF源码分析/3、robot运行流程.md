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



# robot源码分析——robot运行流程



### 一、`RobotFrameWork`类构造

```python
class Application:

    def __init__(self, usage, name=None, version=None, arg_limits=None, env_options=None, logger=None, **auto_options):
        self._ap = ArgumentParser(usage, name, version, arg_limits, self.validate, env_options, **auto_options)
        self._logger = logger or DefaultLogger()


class RobotFramework(Application):
    def __init__(self):
        super().__init__(USAGE, arg_limits=(1,), env_options='ROBOT_OPTIONS', logger=LOGGER)

```

这里类的实例化比较简单。只是初始化了参数解析器和日志打印工具。



### 二、运行逻辑



```python
def run_cli(arguments=None, exit=True):
    if arguments is None:
        arguments = sys.argv[1:]
    # 1、入口函数
    return RobotFramework().execute_cli(arguments, exit=exit)
```



```python
class App:
    
    def _execute(self, arguments, options):
        
        try:
            # 3、主体运行逻辑
            rc = self.main(arguments, **options)
        except DataError as err:
            return self._report_error(err.message, help=True)
        except (KeyboardInterrupt, SystemExit):
            return self._report_error('Execution stopped by user.', rc=STOPPED_BY_USER)
        except:
            error, details = get_error_details(exclude_robot_traces=False)
            return self._report_error('Unexpected error: %s' % error, details, rc=FRAMEWORK_ERROR)
        else:
            return rc or 0
        
        
class RobotFramework(APP):

 	def execute_cli(self, cli_arguments, exit=True):
        with self._logger:
            self._logger.info('%s %s' % (self._ap.name, self._ap.version))
            # 2、解析参数
            options, arguments = self._parse_arguments(cli_arguments)
            rc = self._execute(arguments, options)
        if exit:
            self._exit(rc)
        return rc

    def main(self, datasources, **options):

        try:
            settings = RobotSettings(options)
        except:
            LOGGER.register_console_logger(stdout=options.get('stdout'), stderr=options.get('stderr'))
            raise
        LOGGER.register_console_logger(**settings.console_output_config)
        LOGGER.info(f'Settings:\n{settings}')
        # 3.1、获取配置信息
        if settings.pythonpath:
            sys.path = settings.pythonpath + sys.path
        builder = TestSuiteBuilder(
            included_extensions=settings.extension, included_files=settings.parse_include,
            custom_parsers=settings.parsers, rpa=settings.rpa,
            lang=settings.languages, allow_empty_suite=settings.run_empty_suite)
        suite = builder.build(*datasources)
        if settings.pre_run_modifiers:
            suite.visit(ModelModifier(settings.pre_run_modifiers, settings.run_empty_suite, LOGGER))
        suite.configure(**settings.suite_config)
        settings.rpa = suite.validate_execution_mode()
        # 3.2、在当前上下文中运行
        with pyloggingconf.robot_handler_enabled(settings.log_level):
            old_max_error_lines = text.MAX_ERROR_LINES
            old_max_assign_length = text.MAX_ASSIGN_LENGTH
            text.MAX_ERROR_LINES = settings.max_error_lines
            text.MAX_ASSIGN_LENGTH = settings.max_assign_length
            try:
                # 3.3、运行suite
                result = suite.run(settings)
            finally:
                text.MAX_ERROR_LINES = old_max_error_lines
                text.MAX_ASSIGN_LENGTH = old_max_assign_length
            LOGGER.info("Tests execution ended. Statistics:\n%s" % result.suite.stat_message)
            if settings.log or settings.report or settings.xunit:
                # 4、处理返回值，生成报告信息
                writer = ResultWriter(settings.output if settings.log else result)
                writer.write_results(settings.get_rebot_settings())
        return result.return_code
    
class TestSuite(model.TestSuite[Keyword, TestCase]):
    
    def visit(self, visitor: SuiteVisitor):
        """:mod:`Visitor interface <robot.model.visitor>` entry-point."""
        visitor.visit_suite(self)
        
    def run(self, settings=None, **options):
        from .namespace import IMPORTER
        from .signalhandler import STOP_SIGNAL_MONITOR
        from .suiterunner import SuiteRunner

        with LOGGER:
            if not settings:
                settings = RobotSettings(options)
                LOGGER.register_console_logger(**settings.console_output_config)
            with pyloggingconf.robot_handler_enabled(settings.log_level):
                with STOP_SIGNAL_MONITOR:
                    IMPORTER.reset()
                    output = Output(settings)
                    runner = SuiteRunner(output, settings)
                    # 3.4、真正的运行逻辑
                    self.visit(runner)
                output.close(runner.result)
        return runner.result

class SuiteVisitor:
    def visit_suite(self, suite: 'TestSuite'):
        # 3.5、这里也就是访问者的意义所在。对象和算法进行分离，被访问者提供接口改变被访问者状态和信息
        if self.start_suite(suite) is not False:
            if suite.has_setup:
                suite.setup.visit(self)
            suite.suites.visit(self)
            suite.tests.visit(self)
            if suite.has_teardown:
                suite.teardown.visit(self)
            self.end_suite(suite)
```



我们总结下来robot的运行流程如下

- 解析参数
- 获取配置信息
- 运行suite
  - 运行`setup`：初始化函数
  - 运行`tests`：测试用例
  - 运行`teardown`：运行结束函数
- 获取运行状态，生成报告

这里`self.visit(runner)`在robot中多处源码都有出现，这里实际上使用了访问者模式，将测试suite,和suite运行分离，好处就是对对象结构中的不同元素suite, test, keyword, 也包括if、for、try-except可以进行不同的操作。