---
icon: pen-to-square
date: 2024-03-09
category:
  - 源码分析
  - 设计模式
  - robotframework
tag:
  - 源码分析
  - robotframework
  - 访问者模式
---



# robot源码分析——访问者模式

### 一、访问者模式

在看`robotframework`源码中总是发现有`visit`这个单词，而且在整个运行中都是反复出现，所以自己就看了下关于这个访问者的设计模式。其实这个设计模式是非常少见的，我们平时使用中也并不常见，但是既然robot中出现了这个我们就来看一下这个设计模式。因为懂了这个设计模式也会更加方便我们看源码。

**访问者模式（Visitor Pattern）是一种行为型设计模式**，它能够将**算法与对象结构分离，使得算法可以独立于对象结构而变化**。
该模式的核心概念是，定义一个访问者对象，它是对某个对象结构中各个元素的操作，这种操作可以改变元素的类或状态。
其工作原理是，访问者模式通过定义访问者接口和被访问者接口，将遍历和操作分离开来，从而提高代码的可维护性和可扩展性。

#### 应用场景：

1、需要对复杂的对象结构进行遍历，并对其中的元素进行不同的操作。
2、需要对对象结构中的不同元素进行不同的操作，例如对不同类型的节点进行不同的访问。

#### 主要步骤：

1、定义访问者接口，包含对不同类型元素的不同访问方法。
2、定义被访问者接口，包含接受访问者访问的方法，这个方法会调用访问者对当前对象进行访问。



### 二、定义访问者

```python
# 定义访问者接口
class SalaryVisitor():
    def visit_fullltime(self):  # 全职员工
        pass

    def visit_parttime(self):  # 兼职员工
        pass


# 定义被访问者接口
class Employee():
    def accept(self, visitor):  # 接受访问
        pass


class FulltimeEmployee(Employee):
    def __init__(self, base_salary, bonus):  # 全职员工：基本工资、奖金
        self.base_salary = base_salary
        self.bonus = bonus

    def accept(self, visitor):
        return visitor.visit_fullltime(self)


class ParttimeEmployee(Employee):
    def __init__(self, hourly_wage, total_hours):  # 兼职员工：时薪，小时
        self.hourly_wage = hourly_wage
        self.total_hours = total_hours

    def accept(self, visitor):
        return visitor.visit_parttime(self)


# 定义具体的访问者类
class TaxSalaryVisitor(SalaryVisitor):
    def visit_fullltime(self, fulltime_employee):
        tax = (fulltime_employee.base_salary + fulltime_employee.bonus) * 0.1
        return tax

    def visit_parttime(self, parttime_employee):
        tax = parttime_employee.hourly_wage * parttime_employee.total_hours * 0.1
        return tax


class BonusSalaryVisitor(SalaryVisitor):
    def visit_fullltime(self, fulltime_employee):
        bonus = fulltime_employee.bonus
        return bonus

    def visit_parttime(self, parttime_employee):
        return 0


# 创建实例
fulltime_employee = FulltimeEmployee(10000, 5000)
parttime_employee = ParttimeEmployee(50, 160)

tax_visitor = TaxSalaryVisitor()
bonus_visitor = BonusSalaryVisitor()

full_tax = fulltime_employee.accept(tax_visitor)
full_bonus = fulltime_employee.accept(bonus_visitor)

part_tax = parttime_employee.accept(tax_visitor)
part_bonus = parttime_employee.accept(bonus_visitor)

print(f"全职员工：税：{full_tax},  奖金：{full_bonus}")
print(f"兼职员工：税：{part_tax},  奖金：{part_bonus}")

```

返回值

```
# 全职员工：税：1500.0,  奖金：5000
# 兼职员工：税：800.0,  奖金：0
```

这个就是一个简单的访问者的示例。



### 三、robot如何使用访问者模式



#### 访问者

```python
class SuiteVisitor:
    def visit_suite(self, suite: 'TestSuite'):
        if self.start_suite(suite) is not False:
            if suite.has_setup:
                suite.setup.visit(self)
            suite.suites.visit(self)
            suite.tests.visit(self)
            if suite.has_teardown:
                suite.teardown.visit(self)
            self.end_suite(suite)
            
    def visit_keyword(self, keyword: 'Keyword'):
        if self.start_keyword(keyword) is not False:
            self._possible_setup(keyword)
            self._possible_body(keyword)
            self._possible_teardown(keyword)
            self.end_keyword(keyword)
    
    def visit_return(self, return_: 'Return'):
        if self.start_return(return_) is not False:
            self._possible_body(return_)
            self.end_return(return_)
```

#### 被访问者

```python
class TestSuite(ModelObject, Generic[KW, TC]):
    def visit(self, visitor: SuiteVisitor):
        """:mod:`Visitor interface <robot.model.visitor>` entry-point."""
        visitor.visit_suite(self)

class Keyword(BodyItem):
    def visit(self, visitor: 'SuiteVisitor'):
        """:mod:`Visitor interface <robot.model.visitor>` entry-point."""
        if self:
            visitor.visit_keyword(self)
            
class Return(BodyItem):
    def visit(self, visitor: SuiteVisitor):
        visitor.visit_return(self)
```