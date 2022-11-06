# Java细节汇总

### 1.java 中if（）中只能是boolean值

### 2.Java  null instanceof class  会返回false

### 3.Java中三元运算符是一个整体：

- ```java
  Object obj = true ? new Integer(1):new Double(2.0);
  System.out.println(obj);
  //输出结果为1.0，因为后面有double，类型会自动提升
  
  ```
  

### 4.涉及基本数据类型的'==' 都是值相等

- ```java
  Integer m =new Integer(1);
          int i=1;
          double d =1;
          char s =1;
          if(i==s)
              System.out.println("涉及基本数据类型的'==' 都是值相等");
          if(i==d)
              System.out.println("涉及基本数据类型的'==' 都是值相等");
          if (i==m)
          System.out.println("涉及基本数据类型的'==' 都是值相等");
  ```

